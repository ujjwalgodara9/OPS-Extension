import { displayScreenshots, downloadImage } from './uiElements.js';

async function captureScreenshots() {
    try {
        const tabs = await chrome.tabs.query({});
        const desnaTab = tabs.find(tab => tab.url && tab.url.includes('desna'));
        console.log(desnaTab);
        if (desnaTab) {
            await processTab(desnaTab);
        } else {
            console.error("No tab with 'desna' in URL found.");
        }
    } catch (error) {
        console.error('Error capturing screenshots:', error);
    }
}

async function processTab(tab) {
    let debuggerAttached = false;
    try {
        // Attach debugger to capture full-page screenshot
        await attachDebugger(tab.id);
        debuggerAttached = true;
        // Capture full-page screenshot
        const screenshot = await captureScreenshot(tab.id);
        console.log("Screenshot taken");
        displayScreenshots([screenshot]);
        const imageData = `data:image/png;base64,${screenshot.data}`;
        // Send to backend API
        const response = await sendToBackend(imageData);
        console.log('API Response for tab', tab.id, response);
        // Fill the form in another tab (the one with 'form' in the URL)
        await fillFormFromJson(response);
    } catch (error) {
        console.error('Error processing tab:', tab.id, error);
    } finally {
        if (debuggerAttached) {
            await detachDebugger(tab.id);
        }
    }
}

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

async function sendToBackend(imageData) {
    return fetch('http://127.0.0.1:8000/extract-form', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image: imageData }),
    }).then(response => response.json());
}

async function detachDebugger(tabId) {
    return new Promise((resolve) => {
        chrome.debugger.detach({ tabId }, () => {
            resolve();
        });
    });
}

async function fillFormFromJson(jsonData) {
    // Get selected fields from the checkboxes
    const selectedFields = [];
    const checkboxes = document.querySelectorAll('#field-selector-container input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            console.log(checkbox.id)
            selectedFields.push(checkbox.id);
        }
    });

    if (selectedFields.length === 0) {
        console.error("No fields selected. Please select at least one field to fill.");
        return;  // or alert the user
    }

    // Build an object with only the selected fields from the jsonData
    const filteredData = {};
    selectedFields.forEach(field => {
        filteredData[field] = jsonData[field] || '';
    });

    // Query for the tab that has the 'form' in its URL
    const tabs = await chrome.tabs.query({});
    const formTab = tabs.find(tab => tab.url && tab.url.includes('form'));
    if (formTab) {
        // Execute a script on the form tab to fill only the selected fields
        await chrome.scripting.executeScript({
            target: { tabId: formTab.id },
            func: (data) => {
                // For each field in the data object, fill the corresponding form field
                for (const key in data) {
                    const inputField = document.querySelector(`#${key}`);
                    if (inputField) {
                        inputField.value = data[key];
                    }
                }
            },
            args: [filteredData]
        });
    } else {
        console.error("No tab with 'form' in URL found.");
    }
}

export { captureScreenshots, processTab, attachDebugger, captureScreenshot, sendToBackend, detachDebugger, fillFormFromJson };