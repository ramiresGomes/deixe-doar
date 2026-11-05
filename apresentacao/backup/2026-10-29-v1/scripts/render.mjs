import { writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { launch } from './chrome.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SOURCE = pathToFileURL(join(ROOT, 'apresentacao.html')).href;
const OUTPUT = process.env.PDF_OUT ?? join(ROOT, 'Deixe-Doar-Proposta-de-Reformulacao.pdf');
const PAGE_RANGES = process.env.PDF_PAGES ?? '';

// Sombras com blur saem como retângulos sólidos no Preview/Quick Look do macOS.
// Essas áreas são fotografadas já compostas e entram no PDF como imagem opaca.
const SHADOWED = ['.overview', '.phones', '.direction__body > .browser', '.detail__stack', '.detail .phone'];
const SHADOW_PAD_PX = 34;
const BAKE_SCALE = 3;

const browser = await launch();
await browser.send('Emulation.setDeviceMetricsOverride', { width: 1123, height: 794, deviceScaleFactor: BAKE_SCALE, mobile: false });
await browser.goto(SOURCE);
await browser.evaluate(`Promise.all([...document.images].map((img) => img.decode().catch(() => null))).then(() => true)`);

const broken = await browser.evaluate(`[...document.images].filter((img) => !img.naturalWidth).map((img) => img.getAttribute('src'))`);
if (broken.length) {
    console.error('Imagens não carregadas:', broken);
}

const height = await browser.evaluate('document.documentElement.scrollHeight');
await browser.send('Emulation.setDeviceMetricsOverride', { width: 1123, height, deviceScaleFactor: BAKE_SCALE, mobile: false });
await browser.sleep(300);

const regions = await browser.evaluate(`(() => {
    const selectors = ${JSON.stringify(SHADOWED)};
    const pad = ${SHADOW_PAD_PX};
    return [...document.querySelectorAll('.slide')].map((slide, index) => {
        const nodes = selectors.flatMap((selector) => [...slide.querySelectorAll(selector)]);
        if (!nodes.length) return null;
        const frame = slide.getBoundingClientRect();
        const boxes = nodes.map((node) => node.getBoundingClientRect());
        const left = Math.max(frame.left, Math.min(...boxes.map((b) => b.left)) - pad);
        const top = Math.max(frame.top, Math.min(...boxes.map((b) => b.top)) - pad);
        const right = Math.min(frame.right, Math.max(...boxes.map((b) => b.right)) + pad);
        const bottom = Math.min(frame.bottom, Math.max(...boxes.map((b) => b.bottom)) + pad);
        return {
            index,
            clip: { x: left + scrollX, y: top + scrollY, width: right - left, height: bottom - top },
            local: { left: left - frame.left, top: top - frame.top, width: right - left, height: bottom - top },
        };
    }).filter(Boolean);
})()`);

for (const region of regions) {
    const { data } = await browser.send('Page.captureScreenshot', {
        format: 'jpeg',
        quality: 92,
        captureBeyondViewport: true,
        clip: { ...region.clip, scale: 1 },
    });
    region.src = `data:image/jpeg;base64,${data}`;
}

await browser.evaluate(`(() => {
    const regions = ${JSON.stringify(regions)};
    const selectors = ${JSON.stringify(SHADOWED)};
    const slides = document.querySelectorAll('.slide');
    for (const region of regions) {
        const slide = slides[region.index];
        slide.querySelectorAll(selectors.join(',')).forEach((node) => {
            node.style.boxShadow = 'none';
            node.querySelectorAll('*').forEach((child) => (child.style.boxShadow = 'none'));
        });
        const img = document.createElement('img');
        img.src = region.src;
        img.alt = '';
        Object.assign(img.style, {
            position: 'absolute',
            left: region.local.left + 'px',
            top: region.local.top + 'px',
            width: region.local.width + 'px',
            height: region.local.height + 'px',
            zIndex: 10,
        });
        slide.append(img);
    }
    return Promise.all([...document.images].map((img) => img.decode().catch(() => null))).then(() => true);
})()`);

const { data } = await browser.send('Page.printToPDF', {
    printBackground: true,
    preferCSSPageSize: true,
    pageRanges: PAGE_RANGES,
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0,
});

writeFileSync(OUTPUT, Buffer.from(data, 'base64'));
await browser.close();
console.log(`${OUTPUT} (${regions.length} áreas com sombra convertidas em imagem)`);
