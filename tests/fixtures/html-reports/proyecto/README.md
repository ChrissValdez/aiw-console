# HTML reports QA fixture (#70)

A project whose thread writes its own HTML report and declares it in the run (`report_html`,
CONTRATO §10.a; docs/CONTRATO-REPORTE-HTML-DE-CADA-HILO-v1.md). It has no `reports/` folder, so
the frozen `report.json` surface must say nothing here.

- `RUN-HTMLQA-TWO-PAGES-001` declares two pages: one on disk, one never generated.
- `RUN-HTMLQA-SAME-PAGE-001` declares the same page as the first run: two runs may point at one page.
- `RUN-HTMLQA-NOTHING-001` declares nothing, and must show nothing.

The page carries a copy button whose first line names the run, a download button for a long
verdict, and a counter kept in browser storage, so the isolation is visible: the counter does not
survive a reload when the page is opened from the console.

Serve it: `PC_REGISTRY=tests/fixtures/html-reports/projects.json PC_PORT=8790 node project-console/serve.mjs`
and open `/project-console/index.html`.
