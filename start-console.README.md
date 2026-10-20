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

## What the server writes

This console's server is not read-only. It serves every path with GET and HEAD, and it also has
write routes: POST endpoints under `/projects/<key>/__project-console/` that the console's own
buttons call. Starting the console writes nothing. A file changes only when a local request
reaches one of those routes, and only inside the root of a project registered in
`project-console/projects.json`; on any other path, every method other than GET and HEAD is
refused. Which write routes exist, and what each one writes, is documented in the header of
`project-console/serve.mjs`.

## Notes

- Foreground by design. The window belongs to the server: closing it stops the server. Open a
  second terminal for other work.
- Sibling repositories are not required. A project listed in `project-console/projects.json`
  whose root is absent degrades in the console's own menu; the launcher does not check for them
  and never fails because one is missing.
- node on PATH is the only requirement. No install, no dependencies, no npm script.
- Windows PowerShell 5.1. ASCII only.
- This file documents how to start the console. It says nothing about the state of the project.
