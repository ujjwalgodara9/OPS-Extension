import { displayScreenshots, downloadImage } from './uiElements.js';

async function attachDebugger(tabId) {
    return new Promise((resolve, reject) => {
        chrome.debugger.attach({ tabId }, '1.3', () => {
            if (chrome.runtime.lastError) {
                reject(chrome.runtime.lastError);
            } else {
                resolve();
            }
        });
    });
}

async function captureScreenshot(tabId) {
    return new Promise((resolve, reject) => {
        chrome.debugger.sendCommand(
            { tabId },
            'Page.captureScreenshot',
            {
                format: 'png',
                captureBeyondViewport: true,
                fromSurface: true
            },
            (result) => {
                if (chrome.runtime.lastError) {
                    reject(chrome.runtime.lastError);
                } else {
                    resolve(result);
                }
            }
        );
    });
}

async function detachDebugger(tabId) {
    return new Promise((resolve) => {
        chrome.debugger.detach({ tabId }, () => {
            resolve();
        });
    });
}

async function captureAndStore(tab) {
    let debuggerAttached = false;
    try {
        await attachDebugger(tab.id);
        debuggerAttached = true;
        await new Promise(resolve => setTimeout(resolve, 250));
        const result = await captureScreenshot(tab.id);

        chrome.storage.local.get("captures", (data) => {
            const captures = data.captures || [];
            console.log("Current captures:", captures);
            // captures.push(result.data);

            // Store both image data and URL
            captures.push({
                data: result.data,
                url: tab.url
            });

            chrome.storage.local.set({ captures }, () => {
                if (captures.length >= 3) {
                    enableCompareButton();
                }
                console.log("Full-page capture saved:", result.data);
                displayScreenshots(captures);
            });
        });
    } catch (error) {
        console.error("Failed to capture full page:", error);
    } finally {
        if (debuggerAttached) {
            await detachDebugger(tab.id);
        }
    }
}

function enableCompareButton() {
    const compareButton = document.getElementById("compare-btn");
    if (compareButton) {
        compareButton.disabled = false;
    }
}

export { captureAndStore };