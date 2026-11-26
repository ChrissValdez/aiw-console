<#
  instalar.ps1 — enciende el aviso del buzón en este aparato.
  Crea la tarea «Buzon aviso» en el Programador de tareas de Windows: corre cada minuto mientras la
  sesión de Windows está abierta. Muestra al final una notificación de prueba.

  Uso (desde una ventana de PowerShell):
    powershell -ExecutionPolicy Bypass -File .\instalar.ps1               # avisa de las dos cuentas
    powershell -ExecutionPolicy Bypass -File .\instalar.ps1 -Para cuentapato
    powershell -ExecutionPolicy Bypass -File .\instalar.ps1 -Atender     # además, Claude atiende cada aviso al momento

  -Atender necesita antes iniciar-sesion.ps1 con cada cuenta (ver README.md).
#>
param(
  [ValidateSet('ambas', 'cuentapato', 'cuentachris')]
  [string]$Para = 'ambas',
  [switch]$Atender,
  [int]$MaxPorHora = 6,
  [int]$MinutosMax = 30
)
$ErrorActionPreference = 'Stop'
$Nombre = 'Buzon aviso'
$vbs = Join-Path $PSScriptRoot 'ejecutar-oculto.vbs'

if (-not (Get-Command git -ErrorAction SilentlyContinue)) { throw 'No encuentro git en este aparato.' }

$Estado = Join-Path $env:LOCALAPPDATA 'buzon-aviso'
New-Item -ItemType Directory -Force -Path $Estado | Out-Null
$rutaConfig = Join-Path $Estado 'config.json'
if ($Atender) {
  $claude = (Get-Command claude -ErrorAction SilentlyContinue).Source
  if (-not $claude) { throw 'No encuentro Claude Code (claude). Instálalo primero: irm https://claude.ai/install.ps1 | iex' }
  $cuentas = [ordered]@{}
  foreach ($c in @('cuentapato', 'cuentachris')) {
    if ($Para -ne 'ambas' -and $c -ne $Para) { continue }
    $dir = Join-Path $env:USERPROFILE ('.claude-' + $c)
    if (-not (Test-Path $dir)) { throw "Falta iniciar sesión con $c : corre .\iniciar-sesion.ps1 -Cuenta $c" }
    $cuentas[$c] = $dir
  }
  $remoto = (& git -C (Resolve-Path (Join-Path $PSScriptRoot '..\..')).Path remote get-url origin)
  [ordered]@{
    atender      = $true
    claude       = $claude
    remoto       = $remoto
    maxPorHora   = $MaxPorHora
    minutosMax   = $MinutosMax
    cuentas      = $cuentas
    herramientas = @('Read', 'Edit', 'Write', 'Glob', 'Grep', 'Bash(git *)', 'Bash(date *)', 'Bash(node *)', 'Bash(npm *)')
  } | ConvertTo-Json -Depth 4 | Set-Content -Path $rutaConfig -Encoding UTF8
} elseif (Test-Path $rutaConfig) {
  Remove-Item $rutaConfig
}

$accion   = New-ScheduledTaskAction -Execute 'wscript.exe' -Argument ('"' + $vbs + '" ' + $Para)
$disparo  = New-ScheduledTaskTrigger -Once -At (Get-Date).AddMinutes(1) `
              -RepetitionInterval (New-TimeSpan -Minutes 1) -RepetitionDuration (New-TimeSpan -Days 3650)
$inicio   = New-ScheduledTaskTrigger -AtLogOn -User $env:USERNAME
$ajustes  = New-ScheduledTaskSettingsSet -AllowStartIfOnBatteries -DontStopIfGoingOnBatteries `
              -StartWhenAvailable -MultipleInstances IgnoreNew -ExecutionTimeLimit (New-TimeSpan -Minutes 2)
$quien    = New-ScheduledTaskPrincipal -UserId $env:USERNAME -LogonType Interactive -RunLevel Limited

Register-ScheduledTask -TaskName $Nombre -Action $accion -Trigger @($disparo, $inicio) -Settings $ajustes `
  -Principal $quien -Description 'Avisa cuando llega un aviso nuevo al buzón de aiw-console. Cero tokens.' -Force | Out-Null

& powershell.exe -NoProfile -ExecutionPolicy Bypass -File (Join-Path $PSScriptRoot 'buzon-aviso.ps1') -Prueba
$modo = 'solo avisa'
if ($Atender) { $modo = 'avisa y Claude atiende cada aviso al momento' }
Write-Host "Listo: la tarea «$Nombre» corre cada minuto (cuentas: $Para; $modo). Debiste ver una notificación de prueba."
