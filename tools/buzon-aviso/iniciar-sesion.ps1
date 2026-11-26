<#
  iniciar-sesion.ps1 — inicia sesión UNA vez en Claude Code con una cuenta, en su propia carpeta.
  Así, en la misma PC, el aviso del buzón puede abrir Claude Code como Cuenta Pato o como Cuenta Chris sin mezclar.

  Uso:
    powershell -ExecutionPolicy Bypass -File .\iniciar-sesion.ps1 -Cuenta cuentapato
    powershell -ExecutionPolicy Bypass -File .\iniciar-sesion.ps1 -Cuenta cuentachris

  Se abre Claude Code. Escribe /login, elige «Claude account» e inicia sesión EN EL NAVEGADOR con la cuenta que toca
  (para cuentapato, el Chrome donde está la Cuenta Pato). Cuando diga que entraste, escribe /exit.
#>
param(
  [Parameter(Mandatory = $true)]
  [ValidateSet('cuentapato', 'cuentachris')]
  [string]$Cuenta
)
$ErrorActionPreference = 'Stop'
$dir = Join-Path $env:USERPROFILE ('.claude-' + $Cuenta)
New-Item -ItemType Directory -Force -Path $dir | Out-Null
$claude = (Get-Command claude -ErrorAction SilentlyContinue).Source
if (-not $claude) { throw 'No encuentro Claude Code (claude). Instálalo primero: irm https://claude.ai/install.ps1 | iex' }
$env:CLAUDE_CONFIG_DIR = $dir
Write-Host "Carpeta de $Cuenta : $dir"
Write-Host 'Escribe /login, inicia sesión con la cuenta que toca, y luego /exit.'
& $claude
