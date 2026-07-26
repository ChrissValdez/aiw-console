# start-console (.cmd / .ps1)

Double-clickable launcher for this repository's multi-project console. Double click
`start-console.cmd` in Explorer, or run either file from any directory.

It starts, in the foreground:

    node project-console/serve.mjs

and opens <http://127.0.0.1:8788/project-console/index.html>.

## What it does before starting

- Derives the repo root from the launcher's own location and verifies it, by checking that
  `project-console/serve.mjs` and `project-console/projects.json` are there. If they are not, it
  prints the resolved path and exits without starting anything. No absolute path, machine name
  or user name is baked in: it works in any checkout, from any current directory.
- Stops any node process listening on the port, then verifies the port is free. This is the
  failure it exists for: an older server holding the port and serving previous code while you
  believe you are looking at the current one. A non-node process holding the port is reported
  and left alone, and the launcher refuses to start rather than fight over it.
- Prints the exact URL and opens the default browser on it once the port answers.

## Port

Default 8788, which is the server's own default. `PC_PORT` overrides it, and the launcher then
operates on that port: it is the one cleared, verified, printed and opened. A `PC_PORT` that is
not a port number is refused, not silently replaced by the default.

From a PowerShell prompt:

    $env:PC_PORT = 8790; .\start-console.ps1

## Read-only

This console's server is read-only: GET and HEAD only, 405 for every other method, no edit
endpoint, and no code path that opens a file for writing. Starting the console cannot change
this repository or any project it reads.

## Notes

- Foreground by design. The window belongs to the server: closing it stops the server. Open a
  second terminal for other work.
- Sibling repositories are not required. A project listed in `project-console/projects.json`
  whose root is absent degrades in the console's own menu; the launcher does not check for them
  and never fails because one is missing.
- node on PATH is the only requirement. No install, no dependencies, no npm script.
- Windows PowerShell 5.1. ASCII only.
- This file documents how to start the console. It says nothing about the state of the project.
