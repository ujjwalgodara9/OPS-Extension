import { showHomePage } from './matcherChecker.js';
import { captureScreenshots, processTab, attachDebugger, captureScreenshot, sendToBackend, detachDebugger, fillFormFromJson } from './formFillingLogic.js';
import { displayScreenshots, downloadImage } from './uiElements.js';

function showDesnaUI() {
    // Clear existing content
    document.body.innerHTML = '';
    // Create the main container
    const container = document.createElement('div');
    container.id = 'desna-ui-container'; // Add ID for the container
    container.className = 'main-container'; // Add class for the main container

    // Create the main title
    const mainTitle = document.createElement('h3');
    mainTitle.textContent = 'Scenario 1 - Payment';
    mainTitle.className = 'page-title'; // Add class for the title
    container.appendChild(mainTitle);

    // Create the sub-title for selected doc
    const subTitle = document.createElement('h4');
    subTitle.textContent = 'Docs Selected: DESNA';
    container.appendChild(subTitle);

    // Create the Home button
    const homeButton = document.createElement('button');
    homeButton.id = 'home-btn';
    homeButton.className = 'nav-button'; // Add class for the button
    homeButton.addEventListener('click', () => {
        console.log("Home button clicked");
        chrome.storage.local.remove(["uiState"], () => {
            console.log("UI State cleared");
            showHomePage();
        });
    });

    // Add home icon
    const homeIcon = document.createElement('span');
    homeIcon.className = 'home-icon';
    homeIcon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-house" viewBox="0 0 16 16"><path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z"/></svg>'; // Home icon Unicode
    homeButton.prepend(homeIcon);

    container.appendChild(homeButton);

    // Create the field selector container
    const fieldSelectorContainer = document.createElement('div');
    fieldSelectorContainer.id = 'field-selector-container';

    // Field options
    const fields = [
        { value: "user_name", text: "User Name" },
        { value: "user_id", text: "User ID" },
        { value: "bureau_name", text: "Bureau Name" },
        { value: "amt_limit_in_figures", text: "Amount Limit (Figures)" },
        { value: "amt_limit_in_words", text: "Amount Limit (Words)" },
        { value: "limit_frequency", text: "Limit Frequency" },
        { value: "drawing_account_name", text: "Drawing Account Name" },
        { value: "bsb", text: "BSB" },
        { value: "account_number", text: "Account Number" },
        { value: "temporary_processing_limit_override", text: "Temporary Limit Override" }
    ];

    fields.forEach(field => {
        const label = document.createElement('label');
        label.style.display = 'block';
        label.style.marginBottom = '10px';
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = field.value;
        checkbox.name = field.value;
        const span = document.createElement('span');
        span.textContent = field.text;
        label.appendChild(checkbox);
        label.appendChild(span);
        fieldSelectorContainer.appendChild(label);
    });

    container.appendChild(fieldSelectorContainer);

    // Create the Form Fill button
    const formFillButton = document.createElement('button');
    formFillButton.id = 'form-fill-btn';
    formFillButton.textContent = 'Form Fill';
    formFillButton.className = 'nav-button'; // Add class for the button

    const screenshotContainer = document.createElement('div');
    screenshotContainer.id = 'screenshots-container';

    // Create the loading spinner
    const loadingSpinner = document.createElement('div');
    loadingSpinner.id = 'loading';
    loadingSpinner.className = 'hidden'; // Add class for hidden state

    const spinner = document.createElement('div');
    spinner.className = 'spinner'; // Add class for the spinner

    loadingSpinner.appendChild(spinner);
    document.body.appendChild(loadingSpinner); // Append to body to ensure visibility

    formFillButton.addEventListener('click', async () => {
        document.getElementById("loading").classList.remove("hidden");
        formFillButton.disabled = true; // Disable the button to prevent multiple clicks
        try {
            clearCaptures();
            await captureScreenshots();
        } catch (error) {
            console.error("Error during form fill:", error);
            document.getElementById("result").innerText = "Error: " + error.message;
        } finally {
            document.getElementById("loading").classList.add("hidden");
            formFillButton.disabled = false; // Re-enable the button
            // Clear the checkbox selections
            fields.forEach(field => {
                document.getElementById(field.value).checked = false;
            });
        }
    });

    container.appendChild(formFillButton);
    container.appendChild(screenshotContainer);

    // Append the container to the body
    document.body.appendChild(container);
}

function showDefaultDocUI(selectedScenario) {
    // Clear existing content
    document.body.innerHTML = '';
    // Create the main container
    const container = document.createElement('div');
    container.id = 'default-doc-ui-container'; // Add ID for the container
    container.className = 'main-container'; // Add class for the main container

    // Create the main title
    const mainTitle = document.createElement('h3');
    mainTitle.textContent = selectedScenario; // Use the selected scenario as the title
    mainTitle.className = 'page-title'; // Add class for the title
    container.appendChild(mainTitle);

    
    // Create the paragraph
    const paragraph = document.createElement('p');
    paragraph.className = 'description';
    
    // Create the text node
    const textNode = document.createTextNode("Not yet configured ");
    paragraph.appendChild(textNode);
    
    // Create the image element
    const image = document.createElement('img');
    image.src = 'icons/work-in-progress.png'; // Path to your image
    image.alt = 'Work in progress'; // Alt text for accessibility
    image.style.verticalAlign = 'middle'; // Align image vertically with text
    image.style.width = '50px'; // Set the width of the image
    image.style.height = '50px'; // Set the height of the image
    paragraph.appendChild(image);
    
    container.appendChild(paragraph);

    // Create the Home button
    const homeButton = document.createElement('button');
    homeButton.id = 'home-btn';
    homeButton.className = 'nav-button'; // Add class for the button
    homeButton.addEventListener('click', () => {
        console.log("Home button clicked");
        chrome.storage.local.remove(["uiState"], () => {
            console.log("UI State cleared");
            showHomePage();
        });
    });

    // Add home icon
    const homeIcon = document.createElement('span');
    homeIcon.className = 'home-icon';
    homeIcon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-house" viewBox="0 0 16 16"><path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z"/></svg>'; // Home icon Unicode
    homeButton.prepend(homeIcon);

    container.appendChild(homeButton);

    // Append the container to the body
    document.body.appendChild(container);
}

function clearCaptures() {
    // Clear existing captures
    chrome.storage.local.remove("captures", () => {
        console.log("Captures cleared");
    });
}

export { showDesnaUI, showDefaultDocUI };


// change it to payment