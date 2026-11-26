# desinstalar.ps1 — apaga el aviso del buzón en este aparato (borra la tarea; deja la lista de avisados).
Unregister-ScheduledTask -TaskName 'Buzon aviso' -Confirm:$false -ErrorAction SilentlyContinue
Write-Host 'Listo: el aviso del buzón quedó apagado en este aparato.'
