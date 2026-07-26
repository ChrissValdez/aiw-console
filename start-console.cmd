@echo off
rem Double-clickable entry point for the read-only multi-project console of this repository.
rem It only hands over to start-console.ps1, which lives beside it: -NoProfile keeps the
rem operator's PowerShell profile out of the way, and %~dp0 makes the current directory
rem irrelevant. All behaviour, and all documentation, is in the .ps1.
title AIW project console
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0start-console.ps1" %*
if %ERRORLEVEL% neq 0 (
  echo.
  echo Launcher failed. Read the message above.
  pause
)
