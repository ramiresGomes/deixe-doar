import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { launch } from './chrome.mjs';

const BASE_URL = process.env.SITE_URL ?? 'http://127.0.0.1:8000/';
const OUT_DIR = join(dirname(fileURLToPath(import.meta.url)), '..', 'capturas');

const DIRECTIONS = {
    institucional: { hero: '.inst-hero', first: '.inst-fronts', second: '.inst-impact' },
    fiscal: { hero: '.fisc-hero', first: '.fisc-steps', second: '.fisc-portfolio' },
    editorial: { hero: '.edit-cover', first: '.edit-index', second: '.edit-quote-band' },
};

const CAPTURE_CSS = `
    .ds-bar { display: none !important; }
    *, *::before, *::after { animation: none !important; transition: none !important; }
`;

mkdirSync(OUT_DIR, { recursive: true });
const browser = await launch();

async function open(id, width, scale, mobile) {
    await browser.send('Emulation.setDeviceMetricsOverride', { width, height: 900, deviceScaleFactor: scale, mobile });
    await browser.goto('about:blank');
    await browser.goto(`${BASE_URL}#${id}`);
    await browser.evaluate(`(() => {
        const style = document.createElement('style');
        style.textContent = ${JSON.stringify(CAPTURE_CSS)};
        document.head.append(style);
        return true;
    })()`);
    await browser.sleep(400);
    const height = await browser.evaluate('document.documentElement.scrollHeight');
    await browser.send('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor: scale, mobile });
    await browser.sleep(600);
}

async function rect(selector, { fromTop = false, pad = 0 } = {}) {
    return browser.evaluate(`(() => {
        const node = document.querySelector(${JSON.stringify(selector)});
        if (!node) throw new Error('Seletor não encontrado: ${selector}');
        const box = node.getBoundingClientRect();
        const top = ${fromTop} ? 0 : Math.max(0, box.top + scrollY - ${pad});
        return { x: 0, y: top, width: innerWidth, height: box.bottom + scrollY + ${pad} - top };
    })()`);
}

async function shoot(name, clip, scale = 1) {
    const { data } = await browser.send('Page.captureScreenshot', {
        format: 'jpeg',
        quality: 90,
        captureBeyondViewport: true,
        clip: { ...clip, scale },
    });
    const file = join(OUT_DIR, `${name}.jpg`);
    writeFileSync(file, Buffer.from(data, 'base64'));
    console.log(`  ${name}.jpg ${Math.round(clip.width)}x${Math.round(clip.height)}`);
}

for (const [id, sections] of Object.entries(DIRECTIONS)) {
    console.log(id);
    await open(id, 1440, 1.5, false);
    await shoot(`${id}-hero`, await rect(sections.hero, { fromTop: true }));
    await shoot(`${id}-secao-1`, await rect(sections.first));
    await shoot(`${id}-secao-2`, await rect(sections.second));
    await shoot(`${id}-rodape`, await rect('.ds-footer'));
    await shoot(`${id}-sistema`, await rect('.ds-spec'));

    const footer = await rect('.ds-footer');
    await shoot(`${id}-pagina`, { x: 0, y: 0, width: 1440, height: footer.y + footer.height }, 0.5);

    await open(id, 390, 2, true);
    await shoot(`${id}-mobile`, { x: 0, y: 0, width: 390, height: 844 });
    await shoot(`${id}-mobile-simulador`, await rect('.sim', { pad: 20 }));
}

await browser.close();
