import { captureAndStore } from './captureLogic.js';
import { compareCaptures } from './comparisonLogic.js';
import { displayScreenshots, downloadImage } from './uiElements.js';
import { showHomePage } from './matcherChecker.js';

function showScenario1UI() {
    // Clear existing content
    document.body.innerHTML = '';
    // Create the main container
    const container = document.createElement('div');
    container.id = 'scenario1-container'; // Add ID for the container
    container.className = 'main-container'; // Add class for the main container

    // Create the title
    const title = document.createElement('h3');
    title.textContent = 'Scenario 1 - Payment';
    title.className = 'page-title'; // Add class for the title
    container.appendChild(title);

    // Create the paragraph
    const paragraph = document.createElement('p');
    paragraph.textContent = "Capture DESNA, TNA_TOOL, AUSPAYNET documents";
    paragraph.className = 'description'; // Add class for the description
    container.appendChild(paragraph);

    // Create the Home button
    const homeButton = document.createElement('button');
    homeButton.id = 'home-btn';
    homeButton.className = 'nav-button'; // Add class for the button
    homeButton.addEventListener('click', () => {
        console.log("Home button clicked");
        chrome.storage.local.remove(["uiState", "captures"], () => {
            console.log("UI State and Captures cleared");
            showHomePage();
        });
    });

    // Add home icon
    const homeIcon = document.createElement('span');
    homeIcon.className = 'home-icon';
    homeIcon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-house" viewBox="0 0 16 16"> <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z"/></svg>'; // Home icon Unicode
    homeButton.prepend(homeIcon);

    container.appendChild(homeButton);

    // Create the buttons container
    const buttonsContainer = document.createElement('div');
    buttonsContainer.className = 'buttons-container';

    // Create the Capture button
    const captureButton = document.createElement('button');
    captureButton.id = 'capture-btn';
    captureButton.textContent = 'Capture';
    captureButton.className = 'nav-button'; // Add class for the button
    captureButton.addEventListener('click', async () => {
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        captureAndStore(tab);
    });
    buttonsContainer.appendChild(captureButton);

    // Create the Compare button
    const compareButton = document.createElement('button');
    compareButton.id = 'compare-btn';
    compareButton.textContent = 'Compare';
    compareButton.className = 'nav-button'; // Add class for the button
    compareButton.disabled = true; // Initially disabled
    compareButton.addEventListener('click', compareCaptures);
    buttonsContainer.appendChild(compareButton);

    container.appendChild(buttonsContainer);

    // Create the Clear Captures button
    const clearCapturesButton = document.createElement('button');
    clearCapturesButton.id = 'clear-captures-btn';
    clearCapturesButton.textContent = 'Clear Captures';
    clearCapturesButton.className = 'nav-button'; // Add class for the button
    clearCapturesButton.addEventListener('click', () => {
        chrome.storage.local.remove("captures", () => {
            console.log("Captures cleared");
            const container = document.getElementById("screenshots-container");
            container.innerHTML = "";
            compareButton.disabled = true; // Disable compare button after clearing
        });
    });
    container.appendChild(clearCapturesButton);
    
    // Create the loading spinner
    const loadingSpinner = document.createElement('div');
    loadingSpinner.id = 'loading';
    loadingSpinner.className = 'hidden'; // Add class for hidden state

    const spinner = document.createElement('div');
    spinner.className = 'spinner'; // Add class for the spinner

    loadingSpinner.appendChild(spinner);
    document.body.appendChild(loadingSpinner); // Append to body to ensure visibility

    // Create the result container
    const resultContainer = document.createElement('div');
    resultContainer.id = 'result';
    container.appendChild(resultContainer);

    // Create the screenshots container
    const screenshotsContainer = document.createElement('div');
    screenshotsContainer.id = 'screenshots-container';
    container.appendChild(screenshotsContainer);

    // Load existing captures from storage
    chrome.storage.local.get("captures", (data) => {
        const captures = data.captures || [];
        if (captures.length > 0) {
            displayScreenshots(captures);
            if (captures.length >= 3) {
                compareButton.disabled = false;
            }
        }
    });

    // Append the container to the body
    document.body.appendChild(container);
}



export { showScenario1UI };


// scenario selection change