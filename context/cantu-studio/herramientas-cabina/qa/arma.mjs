import fs from 'node:fs'; import path from 'node:path'; import { pathToFileURL } from 'node:url';
const ROOT = process.env.HOME + '/mnt/AIW_Workspace/projects/cantu-studio';
const API = path.join(ROOT, 'tools/studio/compiler-api');
const base = JSON.parse(fs.readFileSync(path.join(ROOT, 'QA/temp/RUN-CANTU-PREVIEW-PAGE-TRYOUT-CONTROLS-001/_leccion-de-medida.json'), 'utf8'));
const card = JSON.parse(fs.readFileSync(path.join(ROOT, 'QA/temp/RUN-CANTU-CARD-INNER-BOX-CONTRACT-001/5-QA-2-seccion-L01-con-recuadro.json'), 'utf8'));
const H1 = (t) => ({ kind: 'header', level: 1, variant: 'ctx', title: t, subtitle: '' });
const P = (t) => ({ kind: 'narrative', mode: 'clean', title: '', text: t });
const single = { kind: 'card', cardType: 'normal', variant: 'ctx', mode: 'side', icon: 'none', title: 'Números pares', badge: '\\(2n\\)', badgeStyle: 'outline', content: 'Todo entero divisible exactamente entre 2.\nSu residuo es <strong>cero</strong>.' };
const plain = { ...single, title: 'Insignia escrita sin marcas de fórmula', badge: '2n', content: 'Esta insignia está escrita 2n, sin \\( \\). Sale 2N A PROPÓSITO: solo la fórmula se libra de las mayúsculas.' };
const draft = {
  lesson: { course: 'QA cabina', topic: 'QA 2026 10 07', title: 'Tarjeta y aire', titleBadge: 'Aritmética', subtitle: 'Borrador de QA de la cabina: la Tarjeta (#228) y el control del aire (#225). Ábrelo y mira; no hace falta insertar nada.' },
  webBlocks: [
    H1('A · La Tarjeta con recuadro (#228)'),
    P('Primero una tarjeta sola: la insignia tiene que decir 2n en minúscula, y «cero» va en negrita.'),
    single,
    P('Debajo, la insignia escrita sin marcas de fórmula: esta sí sale 2N, y es lo esperado.'),
    plain,
    P('Y la sección de L01 entera: cada tarjeta con su definición, su recuadro «Forma general» en su color, y luego Terminación y Ejemplos en negrita.'),
    ...card,
    H1('B · Página para probar el aire (#225)'),
    P('Lo que sigue es la página de medida del taller del control: títulos de sección, una subsección, notas y «Dos columnas». Abre «Aire de la página» y mueve las cifras aquí.'),
    ...base.webBlocks,
  ],
  slideBlocks: [],
};
const sch = await import(pathToFileURL(path.join(API, 'schemas/draftSchema.js')).href);
sch.WebDraftSchema.parse(draft); sch.WebPreviewDraftSchema.parse(draft);
const { renderWebDraftPreviewHtml } = await import(pathToFileURL(path.join(API, 'services/previewRenderer.js')).href);
const html = renderWebDraftPreviewHtml(draft, ROOT, {});
console.log('esquemas OK · html', html.length, '· recuadros', (html.match(/Forma general/g) || []).length, '· titulos nivel1', draft.webBlocks.filter(b => b.kind === 'header' && b.level === 1).length);
const out = path.join(ROOT, 'src/content/studio/drafts/web/qa_cabina/qa_2026_10_07/tarjeta_y_aire.web.draft.json');
if (fs.existsSync(out)) { console.log('YA EXISTE, no piso'); process.exit(3); }
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, JSON.stringify(draft, null, 2) + '\n');
console.log('escrito', out.replace(ROOT + '/', ''));
