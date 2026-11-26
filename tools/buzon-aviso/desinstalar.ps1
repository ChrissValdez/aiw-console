# desinstalar.ps1 — apaga el aviso del buzón en este aparato: borra la tarea y apaga «atender».
# Deja la lista de avisados y las carpetas de inicio de sesión (~\.claude-cuentapato, ~\.claude-cuentachris).
Unregister-ScheduledTask -TaskName 'Buzon aviso' -Confirm:$false -ErrorAction SilentlyContinue
Remove-Item -Path (Join-Path $env:LOCALAPPDATA 'buzon-aviso\config.json') -ErrorAction SilentlyContinue
Write-Host 'Listo: el aviso del buzón quedó apagado en este aparato.'
