' Lanza buzon-aviso.ps1 sin que se asome una ventana cada minuto.
' El Programador de tareas corre: wscript.exe "<esta ruta>" [cuentapato|cuentachris|ambas]
Dim fso, carpeta, para, comando
Set fso = CreateObject("Scripting.FileSystemObject")
carpeta = fso.GetParentFolderName(WScript.ScriptFullName)
para = "ambas"
If WScript.Arguments.Count > 0 Then para = WScript.Arguments(0)
comando = "powershell.exe -NoProfile -NonInteractive -ExecutionPolicy Bypass -WindowStyle Hidden -File """ & _
          carpeta & "\buzon-aviso.ps1"" -Para " & para
CreateObject("WScript.Shell").Run comando, 0, False
