<#
  buzon-aviso.ps1 — avisa en Windows cuando llega un aviso nuevo al buzón entre cuentas.

  Cero tokens: no llama a Claude. Cada vez que corre (el Programador de tareas lo corre cada minuto):
    1. trae `main` de aiw-console a una referencia propia (refs/buzon-aviso/main), sin tocar
       la carpeta de trabajo, ni origin/main, ni ninguna rama de las cabinas;
    2. lista context/metodo-cantu/mensajes/*.md (lo que está ahí es lo que falta leer);
    3. por cada aviso que no haya avisado antes en este aparato, muestra una notificación de Windows
       que dice para qué cuenta es y su tema. Al hacer clic se abre el aviso en GitHub.

  Este script no mueve avisos a leidos/ ni escribe nada en el repo. Si se instaló con -Atender, además pone el aviso
  en una cola y lanza buzon-atender.ps1, que abre Claude Code con la cuenta que lo recibe para que lo atienda
  (y esa sesión sí lo mueve a leidos/, como dice mensajes/README.md).
  Lo ya avisado se guarda en %LOCALAPPDATA%\buzon-aviso\avisados.txt; así cada aviso se avisa y se atiende una sola vez.

  Debe correr con Windows PowerShell 5.1 (powershell.exe), no con pwsh 7: las notificaciones usan WinRT.
#>
param(
  # Para qué cuenta avisar: cuentapato, cuentachris o ambas.
  [ValidateSet('ambas', 'cuentapato', 'cuentachris')]
  [string]$Para = 'ambas',
  # Solo para probar: muestra una notificación de ejemplo y sale.
  [switch]$Prueba
)

$ErrorActionPreference = 'Stop'
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$Repo      = (Resolve-Path (Join-Path $PSScriptRoot '..\..')).Path
$Carpeta   = 'context/metodo-cantu/mensajes'
$Ref       = 'refs/buzon-aviso/main'
$Web       = 'https://github.com/ChrissValdez/aiw-console/blob/main/' + $Carpeta + '/'
$Estado    = Join-Path $env:LOCALAPPDATA 'buzon-aviso'
$Avisados  = Join-Path $Estado 'avisados.txt'
$Bitacora  = Join-Path $Estado 'bitacora.txt'
$Nombres   = @{ cuentapato = 'Cuenta Pato'; cuentachris = 'Cuenta Chris' }
$AppId     = '{1AC14E77-02E7-4E5D-B744-2EB1AE5198B7}\WindowsPowerShell\v1.0\powershell.exe'
$Cola      = Join-Path $Estado 'cola.txt'
$Candado   = Join-Path $Estado 'atender.lock'
$Config    = $null
$rutaConfig = Join-Path $Estado 'config.json'
if (Test-Path $rutaConfig) { $Config = Get-Content -Path $rutaConfig -Raw -Encoding UTF8 | ConvertFrom-Json }

New-Item -ItemType Directory -Force -Path $Estado | Out-Null

function Anotar([string]$texto) {
  $linea = (Get-Date -Format 'yyyy-MM-dd HH:mm:ss') + '  ' + $texto
  Add-Content -Path $Bitacora -Value $linea -Encoding UTF8
  # La bitácora no crece sin fin: se queda con las últimas 500 líneas.
  $todo = @(Get-Content -Path $Bitacora -Encoding UTF8)
  if ($todo.Count -gt 600) { $todo[-500..-1] | Set-Content -Path $Bitacora -Encoding UTF8 }
}

function Escapar([string]$s) { [System.Security.SecurityElement]::Escape($s) }

function Notificar([string]$titulo, [string]$texto, [string]$enlace) {
  [Windows.UI.Notifications.ToastNotificationManager, Windows.UI.Notifications, ContentType = WindowsRuntime] | Out-Null
  [Windows.Data.Xml.Dom.XmlDocument, Windows.Data.Xml.Dom.XmlDocument, ContentType = WindowsRuntime] | Out-Null
  $lanzar = ''
  if ($enlace) { $lanzar = ' activationType="protocol" launch="' + (Escapar $enlace) + '"' }
  $plantilla = '<toast' + $lanzar + ' scenario="reminder"><visual><binding template="ToastGeneric">' +
               '<text>' + (Escapar $titulo) + '</text><text>' + (Escapar $texto) + '</text>' +
               '</binding></visual><actions><action content="Cerrar" arguments="cerrar" activationType="system"/></actions>' +
               '<audio src="ms-winsoundevent:Notification.Reminder"/></toast>'
  $xml = New-Object Windows.Data.Xml.Dom.XmlDocument
  $xml.LoadXml($plantilla)
  $toast = [Windows.UI.Notifications.ToastNotification]::new($xml)
  [Windows.UI.Notifications.ToastNotificationManager]::CreateToastNotifier($AppId).Show($toast)
}

if ($Prueba) {
  Notificar 'Buzón: mensaje para Cuenta Pato' 'Esto es una prueba del aviso del buzón.' ($Web)
  return
}

try {
  # 1. Traer main a una referencia propia. --no-write-fetch-head: no pisa FETCH_HEAD de las cabinas.
  & git -C $Repo fetch --quiet --no-write-fetch-head origin "+refs/heads/main:$Ref" 2>&1 | Out-Null
  if ($LASTEXITCODE -ne 0) { Anotar 'git fetch falló (¿sin red?). Se reintenta en un minuto.'; return }

  # 2. Los avisos sin leer: ficheros .md directos de mensajes/ (no README.md, no leidos/).
  $lista = & git -C $Repo ls-tree --name-only "${Ref}:$Carpeta" 2>$null
  if ($LASTEXITCODE -ne 0) { Anotar 'No encontré la carpeta del buzón en main.'; return }
  $avisos = @($lista | Where-Object { $_ -match '^\d{4}-\d{2}-\d{2}-\d{4}-(cuentapato|cuentachris)-(cuentapato|cuentachris)-.+\.md$' })

  $primeraVez = -not (Test-Path $Avisados)
  $ya = @{}
  if (-not $primeraVez) { Get-Content -Path $Avisados -Encoding UTF8 | ForEach-Object { $ya[$_] = $true } }

  $nuevos = @()
  foreach ($f in $avisos) {
    if ($ya.ContainsKey($f)) { continue }
    $null = $f -match '^\d{4}-\d{2}-\d{2}-\d{4}-(?<de>cuentapato|cuentachris)-(?<a>cuentapato|cuentachris)-'
    $a = $Matches['a']; $de = $Matches['de']
    Add-Content -Path $Avisados -Value $f -Encoding UTF8
    if ($Para -ne 'ambas' -and $a -ne $Para) { continue }
    $nuevos += [pscustomobject]@{ Fichero = $f; De = $de; A = $a }
  }
  if (-not (Test-Path $Avisados)) { New-Item -ItemType File -Path $Avisados | Out-Null }

  if ($primeraVez) {
    # La primera vez no se lanza una notificación por cada aviso viejo: una sola con la cuenta.
    if ($nuevos.Count -gt 0) {
      $porCuenta = $nuevos | Group-Object A | ForEach-Object { "$($_.Count) para $($Nombres[$_.Name])" }
      Notificar 'Buzón: el aviso ya está encendido' ("Hay avisos sin leer: " + ($porCuenta -join ', ') + '.') ($Web)
    } else {
      Notificar 'Buzón: el aviso ya está encendido' 'No hay avisos sin leer. Te aviso cuando llegue uno.' ''
    }
    Anotar "Primera vez: $($avisos.Count) avisos sin leer registrados."
    return
  }

  # 3. Una notificación por aviso nuevo.
  foreach ($n in $nuevos) {
    $tema = $n.Fichero -replace '^\d{4}-\d{2}-\d{2}-\d{4}-[a-z]+-[a-z]+-', '' -replace '\.md$', '' -replace '-', ' '
    $primera = & git -C $Repo show "${Ref}:$Carpeta/$($n.Fichero)" 2>$null | Select-Object -First 1
    if ($primera -match '^#\s+(.+)$') { $tema = $Matches[1] }
    $atiende = $Config -and $Config.atender -and $Config.cuentas.PSObject.Properties.Name -contains $n.A
    $sufijo = ''
    if ($atiende) { $sufijo = ' Claude de esa cuenta ya lo está atendiendo.' }
    Notificar ("Buzón: mensaje para " + $Nombres[$n.A]) ("De " + $Nombres[$n.De] + ": " + $tema + '.' + $sufijo) ($Web + $n.Fichero)
    Anotar "Avisado: $($n.Fichero)"
    if ($atiende) {
      Add-Content -Path $Cola -Value ($n.Fichero + '|' + $n.A) -Encoding UTF8
      Anotar "En cola para atender: $($n.Fichero)"
    }
  }

  # 4. Si hay avisos en cola y no hay quien los atienda ya, se lanza el que atiende (buzon-atender.ps1), aparte,
  #    para que esta revisión de cada minuto no se quede esperando.
  if ((Test-Path $Cola) -and (Get-Content -Path $Cola -Encoding UTF8 | Where-Object { $_ })) {
    $vivo = $false
    if (Test-Path $Candado) {
      $pidViejo = (Get-Content -Path $Candado -Encoding UTF8 | Select-Object -First 1)
      if ($pidViejo -and (Get-Process -Id ([int]$pidViejo) -ErrorAction SilentlyContinue)) { $vivo = $true }
    }
    if (-not $vivo) {
      Start-Process -FilePath 'powershell.exe' -WindowStyle Hidden -ArgumentList @(
        '-NoProfile', '-NonInteractive', '-ExecutionPolicy', 'Bypass', '-WindowStyle', 'Hidden',
        '-File', ('"' + (Join-Path $PSScriptRoot 'buzon-atender.ps1') + '"'))
      Anotar 'Lancé al que atiende la cola.'
    }
  }
} catch {
  Anotar ('Error: ' + $_.Exception.Message)
}
