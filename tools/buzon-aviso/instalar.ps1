<#
  instalar.ps1 — enciende el aviso del buzón en este aparato.
  Crea la tarea «Buzon aviso» en el Programador de tareas de Windows: corre cada minuto mientras la
  sesión de Windows está abierta. Muestra al final una notificación de prueba.

  Uso (desde una ventana de PowerShell):
    powershell -ExecutionPolicy Bypass -File .\instalar.ps1               # avisa de las dos cuentas
    powershell -ExecutionPolicy Bypass -File .\instalar.ps1 -Para cuentapato
#>
param(
  [ValidateSet('ambas', 'cuentapato', 'cuentachris')]
  [string]$Para = 'ambas'
)
$ErrorActionPreference = 'Stop'
$Nombre = 'Buzon aviso'
$vbs = Join-Path $PSScriptRoot 'ejecutar-oculto.vbs'

if (-not (Get-Command git -ErrorAction SilentlyContinue)) { throw 'No encuentro git en este aparato.' }

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
Write-Host "Listo: la tarea «$Nombre» corre cada minuto (avisa de: $Para). Debiste ver una notificación de prueba."
