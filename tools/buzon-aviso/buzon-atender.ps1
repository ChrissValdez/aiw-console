<#
  buzon-atender.ps1 — atiende al momento los avisos del buzón con Claude Code de la cuenta que los recibe.

  Lo lanza buzon-aviso.ps1 cuando hay avisos en la cola (%LOCALAPPDATA%\buzon-aviso\cola.txt). Corre uno a la vez
  (candado atender.lock) y atiende la cola en orden. Por cada aviso:
    1. pone al día un clon PROPIO de aiw-console (%LOCALAPPDATA%\buzon-aviso\clon\aiw-console), para no tocar el
       checkout compartido de las cabinas;
    2. si el aviso ya no está en mensajes/ (alguien lo leyó antes), no hace nada: no se atiende dos veces;
    3. abre Claude Code sin ventana (`claude -p`) con la carpeta de inicio de sesión de esa cuenta
       (CLAUDE_CONFIG_DIR), que lee PROYECTO.md, atiende el aviso y lo mueve a leidos/;
    4. muestra una notificación con lo que hizo (su línea RESUMEN:).

  Frenos: como mucho `maxPorHora` avisos atendidos por cuenta en una hora (para que dos cuentas no se contesten sin
  fin), y `minutosMax` minutos por aviso. Todo queda en bitacora.txt y en atendidos\<aviso>.log.
  Se configura con instalar.ps1 -Atender (config.json).
#>
$ErrorActionPreference = 'Stop'
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$Estado    = Join-Path $env:LOCALAPPDATA 'buzon-aviso'
$Cola      = Join-Path $Estado 'cola.txt'
$Candado   = Join-Path $Estado 'atender.lock'
$Bitacora  = Join-Path $Estado 'bitacora.txt'
$Historial = Join-Path $Estado 'atendidos.txt'
$Registros = Join-Path $Estado 'atendidos'
$Clon      = Join-Path $Estado 'clon\aiw-console'
$Carpeta   = 'context/metodo-cantu/mensajes'
$Web       = 'https://github.com/ChrissValdez/aiw-console/blob/main/' + $Carpeta + '/'
$Nombres   = @{ cuentapato = 'Cuenta Pato'; cuentachris = 'Cuenta Chris' }
$AppId     = '{1AC14E77-02E7-4E5D-B744-2EB1AE5198B7}\WindowsPowerShell\v1.0\powershell.exe'

New-Item -ItemType Directory -Force -Path $Estado, $Registros | Out-Null

function Anotar([string]$texto) {
  Add-Content -Path $Bitacora -Value ((Get-Date -Format 'yyyy-MM-dd HH:mm:ss') + '  [atender] ' + $texto) -Encoding UTF8
}
function Escapar([string]$s) { [System.Security.SecurityElement]::Escape($s) }
function Notificar([string]$titulo, [string]$texto, [string]$enlace) {
  [Windows.UI.Notifications.ToastNotificationManager, Windows.UI.Notifications, ContentType = WindowsRuntime] | Out-Null
  [Windows.Data.Xml.Dom.XmlDocument, Windows.Data.Xml.Dom.XmlDocument, ContentType = WindowsRuntime] | Out-Null
  $lanzar = ''
  if ($enlace) { $lanzar = ' activationType="protocol" launch="' + (Escapar $enlace) + '"' }
  $xml = New-Object Windows.Data.Xml.Dom.XmlDocument
  $xml.LoadXml('<toast' + $lanzar + '><visual><binding template="ToastGeneric"><text>' + (Escapar $titulo) +
               '</text><text>' + (Escapar $texto) + '</text></binding></visual></toast>')
  [Windows.UI.Notifications.ToastNotificationManager]::CreateToastNotifier($AppId).Show(
    [Windows.UI.Notifications.ToastNotification]::new($xml))
}

# Uno a la vez.
if (Test-Path $Candado) {
  $pidViejo = Get-Content -Path $Candado -Encoding UTF8 | Select-Object -First 1
  if ($pidViejo -and (Get-Process -Id ([int]$pidViejo) -ErrorAction SilentlyContinue)) { return }
}
Set-Content -Path $Candado -Value $PID -Encoding UTF8

try {
  $Config = Get-Content -Path (Join-Path $Estado 'config.json') -Raw -Encoding UTF8 | ConvertFrom-Json
  $maxPorHora = [int]$Config.maxPorHora; if ($maxPorHora -le 0) { $maxPorHora = 6 }
  $minutosMax = [int]$Config.minutosMax; if ($minutosMax -le 0) { $minutosMax = 30 }

  while ($true) {
    # Saca el primero de la cola.
    $lineas = @()
    if (Test-Path $Cola) { $lineas = @(Get-Content -Path $Cola -Encoding UTF8 | Where-Object { $_ }) }
    if ($lineas.Count -eq 0) { break }
    $actual = $lineas[0]
    if ($lineas.Count -gt 1) { $lineas[1..($lineas.Count - 1)] | Set-Content -Path $Cola -Encoding UTF8 }
    else { Clear-Content -Path $Cola }
    $fichero, $cuenta = $actual -split '\|', 2
    $nombre = $Nombres[$cuenta]
    $dirCuenta = $Config.cuentas.$cuenta
    if (-not $dirCuenta) { Anotar "Sin carpeta de inicio de sesión para $cuenta; no atiendo $fichero."; continue }

    # Freno: cuántos atendió esa cuenta en la última hora.
    $haceUnaHora = (Get-Date).AddHours(-1)
    $recientes = 0
    if (Test-Path $Historial) {
      $recientes = @(Get-Content -Path $Historial -Encoding UTF8 | Where-Object {
        $p = $_ -split '\|'; $p.Count -ge 3 -and $p[1] -eq $cuenta -and ([datetime]$p[0]) -gt $haceUnaHora }).Count
    }
    if ($recientes -ge $maxPorHora) {
      Anotar "Tope de $maxPorHora por hora para $cuenta; $fichero queda para leerse a mano."
      Notificar "Buzón: $nombre llegó a su tope" "Ya atendió $maxPorHora avisos en una hora. Este queda para leerse a mano." ($Web + $fichero)
      continue
    }

    # Clon propio, al día con main. Nunca reset --hard ni push forzado: si no avanza limpio, se para.
    if (-not (Test-Path (Join-Path $Clon '.git'))) {
      New-Item -ItemType Directory -Force -Path (Split-Path $Clon) | Out-Null
      & git clone --quiet $Config.remoto $Clon 2>&1 | Out-Null
      if ($LASTEXITCODE -ne 0) { Anotar 'No pude clonar aiw-console.'; break }
    }
    & git -C $Clon checkout --quiet main 2>&1 | Out-Null
    & git -C $Clon pull --quiet --ff-only origin main 2>&1 | Out-Null
    if ($LASTEXITCODE -ne 0) {
      Anotar "El clon propio no avanza limpio con main; paro. Revisa $Clon."
      Notificar 'Buzón: no pude atender' "El clon propio de aiw-console no está limpio. Revisa la bitácora." ''
      Add-Content -Path $Cola -Value $actual -Encoding UTF8
      break
    }

    # ¿Sigue sin leer?
    if (-not (Test-Path (Join-Path $Clon ($Carpeta + '/' + $fichero)))) {
      Anotar "$fichero ya no está en mensajes/: alguien lo leyó antes. No lo atiendo."
      continue
    }

    $instruccion = @"
Eres la sesión automática de $nombre ($cuenta) en la PC donde corre el aviso del buzón. Nadie te está mirando: no preguntes nada, decide con las reglas.
Acaba de llegar al buzón el aviso $Carpeta/$fichero. Estás en un clon propio de aiw-console, ya al día con main.

1. Lee context/metodo-cantu/PROYECTO.md, context/metodo-cantu/ASIGNACIONES.md y $Carpeta/README.md, y luego el aviso.
2. Atiéndelo con esas reglas. Si pide algo chico, que se puede deshacer y que es de tu área, hazlo ya (rama y PR; directo a main solo lo que PROYECTO.md permite; fusiona si lo recomiendas, regla del 26-nov). Si necesitas otro repo, clónalo dentro de $Estado\clones\ y trabaja ahí, nunca en los checkouts compartidos. Si es grande, necesita al operador, cuesta mucho o es de la otra cuenta, no lo hagas: deja la tarea anotada en tu respuesta.
3. Si el aviso pide respuesta, contesta con un aviso nuevo en $Carpeta/ (formato del README, hora con date -u), y pon «¿Necesita respuesta? no» salvo que de verdad necesites algo. No contestes avisos que solo confirman o informan.
4. Mueve el aviso a leidos/ con git mv, haz commit dirigido por ruta (nunca -A) y push a main, como dice el README. Si el push choca, git pull --rebase y vuelve a empujar; nunca push forzado ni reset --hard.
5. Termina con una sola línea que empiece con RESUMEN: y diga en una frase qué hiciste.
"@

    $registro = Join-Path $Registros ($fichero -replace '\.md$', '.log')
    Anotar "Atiendo $fichero con $nombre."
    $trabajo = Start-Job -ArgumentList $Config.claude, $dirCuenta, $Clon, $instruccion, $registro, $Config.herramientas -ScriptBlock {
      param($claude, $dirCuenta, $clon, $instruccion, $registro, $herramientas)
      $env:CLAUDE_CONFIG_DIR = $dirCuenta
      $OutputEncoding = New-Object System.Text.UTF8Encoding $false
      [Console]::OutputEncoding = [System.Text.Encoding]::UTF8
      Set-Location $clon
      $argumentos = @('-p', '--permission-mode', 'acceptEdits', '--allowedTools') + @($herramientas)
      $instruccion | & $claude @argumentos 2>&1 | Out-File -FilePath $registro -Encoding UTF8
    }
    if (-not (Wait-Job $trabajo -Timeout ($minutosMax * 60))) {
      Stop-Job $trabajo
      Anotar "$fichero pasó de $minutosMax minutos; lo corté."
    }
    Remove-Job $trabajo -Force
    Add-Content -Path $Historial -Value ((Get-Date -Format 's') + '|' + $cuenta + '|' + $fichero) -Encoding UTF8

    $resumen = 'Terminó; el detalle está en la bitácora.'
    if (Test-Path $registro) {
      $linea = Get-Content -Path $registro -Encoding UTF8 | Where-Object { $_ -match '^\s*RESUMEN:' } | Select-Object -Last 1
      if ($linea) { $resumen = ($linea -replace '^\s*RESUMEN:\s*', '') }
    }
    if ($resumen.Length -gt 220) { $resumen = $resumen.Substring(0, 217) + '...' }
    Notificar "Buzón: $nombre atendió el aviso" $resumen ($Web.Replace('/mensajes/', '/mensajes/leidos/') + $fichero)
    Anotar "Atendido $fichero : $resumen"
  }
} catch {
  Anotar ('Error: ' + $_.Exception.Message)
} finally {
  Remove-Item -Path $Candado -ErrorAction SilentlyContinue
}
