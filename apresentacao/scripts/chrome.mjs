import { spawn } from 'node:child_process';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const CHROME = process.env.CHROME_BIN ?? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export async function launch() {
    const port = 9300 + Math.floor(Math.random() * 500);
    const profile = mkdtempSync(join(tmpdir(), 'deixedoar-chrome-'));
    const child = spawn(
        CHROME,
        [
            '--headless=new',
            `--remote-debugging-port=${port}`,
            `--user-data-dir=${profile}`,
            '--no-first-run',
            '--no-default-browser-check',
            '--hide-scrollbars',
            '--force-color-profile=srgb',
            'about:blank',
        ],
        { stdio: 'ignore' },
    );

    let target;
    for (let attempt = 0; attempt < 50 && !target; attempt++) {
        await sleep(200);
        try {
            const list = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json();
            target = list.find((entry) => entry.type === 'page');
        } catch {
            // Chrome ainda está subindo.
        }
    }
    if (!target) {
        child.kill();
        throw new Error('Chrome não abriu a porta de depuração.');
    }

    const socket = new WebSocket(target.webSocketDebuggerUrl);
    await new Promise((resolve, reject) => {
        socket.onopen = resolve;
        socket.onerror = reject;
    });

    let nextId = 0;
    const pending = new Map();
    const listeners = new Map();
    socket.onmessage = ({ data }) => {
        const message = JSON.parse(data);
        if (message.id && pending.has(message.id)) {
            const { resolve, reject } = pending.get(message.id);
            pending.delete(message.id);
            message.error ? reject(new Error(message.error.message)) : resolve(message.result);
        } else if (message.method && listeners.has(message.method)) {
            listeners.get(message.method).forEach((fn) => fn(message.params));
            listeners.delete(message.method);
        }
    };

    const send = (method, params = {}) =>
        new Promise((resolve, reject) => {
            const id = ++nextId;
            pending.set(id, { resolve, reject });
            socket.send(JSON.stringify({ id, method, params }));
        });

    const once = (method) =>
        new Promise((resolve) => {
            listeners.set(method, [...(listeners.get(method) ?? []), resolve]);
        });

    const evaluate = async (expression) => {
        const { result, exceptionDetails } = await send('Runtime.evaluate', {
            expression,
            awaitPromise: true,
            returnByValue: true,
        });
        if (exceptionDetails) {
            throw new Error(exceptionDetails.exception?.description ?? exceptionDetails.text);
        }
        return result.value;
    };

    const goto = async (url) => {
        const loaded = once('Page.loadEventFired');
        await send('Page.navigate', { url });
        await loaded;
        await evaluate('document.fonts.ready.then(() => true)');
    };

    await send('Page.enable');
    await send('Runtime.enable');

    const close = async () => {
        socket.close();
        child.kill();
        await sleep(300);
        rmSync(profile, { recursive: true, force: true });
    };

    return { send, evaluate, goto, sleep, close };
}
