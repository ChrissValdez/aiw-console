Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

# Start the multi-project console of this repository:
#
#     node project-console/serve.mjs
#
# Serves: http://127.0.0.1:8788/project-console/index.html   (PC_PORT overrides the port)
#
# That server is strictly READ-ONLY. It answers GET and HEAD, replies 405 to every other
# method, has no edit endpoint, and opens no file for writing. Starting it cannot modify this
# repository or any project it reads.
#
# This launcher exists to make two failures impossible, because both have happened:
#   1. Being started from the wrong directory. The repo root is derived from this file's own
#      location and then verified. Nothing here depends on the current directory, and no
#      absolute path, machine name or user name is baked in.
#   2. An older server still holding the port and serving stale code while the operator
#      believes they are looking at the current one. Any node process listening on the
#      effective port is stopped first, and the port is then verified free.
#
# The port comes from PC_PORT when it is set, read the same way the server reads it, so the
# port that is cleared, verified and opened is always the port the server will bind.
#
# Blocks this terminal while the server runs: closing the window stops the server.
# Windows PowerShell 5.1. ASCII only. No dependencies; nothing is installed.

# The server's own default (project-console/serve.mjs) and its only entry point.
$DEFAULT_PORT = 8788
$ENTRY_PATH = "/project-console/index.html"
$HOST_ADDRESS = "127.0.0.1"
# The two files that prove a directory is this repo's root, both required by the console.
$SERVER_RELATIVE = "project-console\serve.mjs"
$REGISTRY_RELATIVE = "project-console\projects.json"

function Get-RepoRoot {
    # This launcher lives AT the repo root, so the root is its own directory: resolved from the
    # caller's $PSScriptRoot, never from the current directory, so a double click in Explorer
    # and a call from any other cwd behave identically. The result is then PROVEN by asserting
    # the two files the console cannot run without. If they are missing, print the resolved
    # path and stop rather than guess.
    param(
        [Parameter(Mandatory = $true)]
        [string]$ScriptRoot
    )

    $repoRoot = (Resolve-Path -LiteralPath $ScriptRoot).ProviderPath
    $serveScript = Join-Path $repoRoot $SERVER_RELATIVE
    $registryFile = Join-Path $repoRoot $REGISTRY_RELATIVE

    if (-not (Test-Path -LiteralPath $serveScript) -or -not (Test-Path -LiteralPath $registryFile)) {
        Write-Host "Could not confirm the repo root."
        Write-Host "Resolved path: $repoRoot"
        Write-Host "Expected to find both of these under it:"
        Write-Host "  $SERVER_RELATIVE"
        Write-Host "  $REGISTRY_RELATIVE"
        Write-Host "start-console.cmd and start-console.ps1 must stay in the root of the"
        Write-Host "aiw-console repository; they read their own location to find the console."
        exit 1
    }

    return $repoRoot
}

function Resolve-ConsolePort {
    # The server takes its port from PC_PORT, so the launcher must operate on that same port
    # instead of a fixed 8788: clearing one port and serving on another is the confusion this
    # launcher exists to prevent. Unset or empty means the server's own default. A PC_PORT that
    # is not a port number is refused, not silently replaced by the default.
    $raw = $env:PC_PORT
    if ($null -eq $raw -or $raw.Trim().Length -eq 0) {
        return $DEFAULT_PORT
    }

    $parsed = 0
    if (-not [int]::TryParse($raw.Trim(), [ref]$parsed) -or $parsed -lt 1 -or $parsed -gt 65535) {
        Write-Host "PC_PORT is set to '$raw', which is not a port number between 1 and 65535."
        Write-Host "Set it to a valid port, or clear it to use the default $DEFAULT_PORT, then retry."
        exit 1
    }

    return $parsed
}

function Stop-NodeListeners {
    # Stop node processes listening on the port. A no-op when the port is already free. A
    # non-node process is reported and left alone: it is not ours to kill, and the free check
    # that follows will refuse to start rather than fight over the port.
    param(
        [Parameter(Mandatory = $true)]
        [int]$Port
    )

    $stopped = @()
    $connections = Get-NetTCPConnection -LocalPort $Port -State Listen -ErrorAction SilentlyContinue
    $processIds = @($connections | Select-Object -ExpandProperty OwningProcess -Unique)

    foreach ($processId in $processIds) {
        if (-not $processId) {
            continue
        }
        $process = Get-Process -Id $processId -ErrorAction SilentlyContinue
        if (-not $process) {
            continue
        }
        if ($process.ProcessName -ne "node") {
            Write-Host "Port $Port is held by PID $processId ($($process.ProcessName)), not node. Leaving it running."
            continue
        }
        Write-Host "Stopping the node process already listening on port ${Port}: PID $processId"
        Stop-Process -Id $processId -Force -ErrorAction SilentlyContinue
        $stopped += $processId
    }

    return $stopped
}

function Assert-PortFree {
    # Verify the port is actually free before starting, and say so out loud. A process that was
    # just stopped needs a moment to release its socket, so poll briefly when something was
    # stopped; when nothing was, one look is the whole truth.
    param(
        [Parameter(Mandatory = $true)]
        [int]$Port,

        [int]$Attempts = 1
    )

    for ($attempt = 1; $attempt -le $Attempts; $attempt++) {
        $holders = Get-NetTCPConnection -LocalPort $Port -State Listen -ErrorAction SilentlyContinue
        if (-not $holders) {
            Write-Host "Port ${Port}: free"
            return
        }
        if ($attempt -lt $Attempts) {
            Start-Sleep -Milliseconds 250
        }
    }

    Write-Host "Port ${Port}: IN USE"
    $processIds = @($holders | Select-Object -ExpandProperty OwningProcess -Unique)
    foreach ($processId in $processIds) {
        $process = Get-Process -Id $processId -ErrorAction SilentlyContinue
        $name = if ($process) { $process.ProcessName } else { "unknown process" }
        Write-Host "  held by PID ${processId} ($name)"
    }
    Write-Host "Close whatever is holding port $Port and retry, or set PC_PORT to a free port."
    exit 1
}

function Start-BrowserWhenServing {
    # Open the browser only once the port answers. Opening it first lands the operator on a
    # connection error and makes them reload by hand. This process is about to block on node in
    # the foreground, so the wait happens in a background job. The URL is printed either way:
    # if this convenience fails, the console still starts and the URL is still on screen.
    param(
        [Parameter(Mandatory = $true)]
        [int]$Port,

        [Parameter(Mandatory = $true)]
        [string]$Url
    )

    try {
        $null = Start-Job -ScriptBlock {
            param([int]$JobPort, [string]$JobUrl)

            for ($attempt = 1; $attempt -le 80; $attempt++) {
                $listening = Get-NetTCPConnection -LocalPort $JobPort -State Listen -ErrorAction SilentlyContinue
                if ($listening) {
                    Start-Process $JobUrl
                    return
                }
                Start-Sleep -Milliseconds 250
            }
        } -ArgumentList $Port, $Url
    } catch {
        Write-Host "Could not schedule the browser to open. Open the URL above by hand."
    }
}

$repoRoot = Get-RepoRoot -ScriptRoot $PSScriptRoot
Write-Host "Repo root: $repoRoot"

$port = Resolve-ConsolePort
$url = "http://${HOST_ADDRESS}:${port}$ENTRY_PATH"
if ($port -eq $DEFAULT_PORT) {
    Write-Host "Port: $port"
} else {
    Write-Host "Port: $port (from PC_PORT)"
}

# node is required and is the only requirement. Say so plainly instead of letting the operator
# read a raw command-not-found error.
if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Host "node was not found on PATH."
    Write-Host "Install Node.js, or open a shell where 'node --version' works, then retry."
    exit 1
}

$stopped = @(Stop-NodeListeners -Port $port)
if ($stopped.Count -gt 0) {
    Assert-PortFree -Port $port -Attempts 20
} else {
    Assert-PortFree -Port $port
}

Write-Host ""
Write-Host "Console URL: $url"
Write-Host "Read-only console: the server answers GET and HEAD only and writes nothing."
Write-Host "Leave this window open while you use the console; closing it stops the server."
Write-Host ""

Start-BrowserWhenServing -Port $port -Url $url

# Absolute script path, so the server is found regardless of where this was called from. The
# server derives its own repo root from its file location, so the working directory below is
# for predictability, not correctness.
$serveScript = Join-Path $repoRoot $SERVER_RELATIVE
Set-Location -LiteralPath $repoRoot
& node $serveScript

# Surface the server's exit code: a server that failed to boot must not look like a clean stop.
exit $LASTEXITCODE
