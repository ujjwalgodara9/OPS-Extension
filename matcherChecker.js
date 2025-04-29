import { showScenario1UI } from './scenario1UI.js';
import { defaultScenarioUI } from './defaultScenarioUI.js';
import { showFormFillingUI } from './formFillingUI.js';

async function restoreState() {
    chrome.storage.local.get("uiState", (data) => {
        const uiState = data.uiState || "home";
        switch (uiState) {
            case "scenario1":
                showScenario1UI();
                break;
            case "formFilling":
                showFormFillingUI();
                break;
            default:
                showHomePage();
        }
    });
}

function showHomePage() {
    // Clear existing content
    document.body.innerHTML = '';
    // Create the main container
    const container = document.createElement('div');
    container.id = 'home-container'; // Add ID for the container
    container.className = 'main-container'; // Add class for the main container

    // Create the title
    const title = document.createElement('h3');
    title.textContent = 'Co-Ops';
    title.className = 'page-title'; // Add class for the title
    container.appendChild(title);

    // Create the Validation and Verification button
    const matcherCheckerButton = document.createElement('button');
    matcherCheckerButton.textContent = 'Validation and Verification';
    matcherCheckerButton.className = 'nav-button'; // Add class for the button
    matcherCheckerButton.addEventListener('click', () => {
        chrome.storage.local.set({ uiState: "home" }, () => {
            showMatcherCheckerUI();
        });
    });
    container.appendChild(matcherCheckerButton);

    // Create the Form Filling button
    const formFillingButton = document.createElement('button');
    formFillingButton.textContent = 'Form Filling';
    formFillingButton.className = 'nav-button'; // Add class for the button
    formFillingButton.addEventListener('click', () => {
        chrome.storage.local.set({ uiState: "formFilling" }, () => {
            showFormFillingUI();
        });
    });
    container.appendChild(formFillingButton);

    // Append the container to the body
    document.body.appendChild(container);
}

function showMatcherCheckerUI() {
    // Clear existing content
    document.body.innerHTML = '';
    // Create the main container
    const container = document.createElement('div');
    container.id = 'matcher-checker-container'; // Add ID for the container
    container.className = 'main-container'; // Add class for the main container

    // Create the title
    const title = document.createElement('h3');
    title.textContent = 'Validation and Verification';
    title.className = 'page-title'; // Add class for the title
    container.appendChild(title);

    // Create the Scenarios dropdown
    const scenariosDropdown = document.createElement('select');
    scenariosDropdown.id = 'scenariosDropdown'; // Add ID for the dropdown

    // Add default option
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = 'Scenarios';
    defaultOption.disabled = true;
    defaultOption.selected = true;
    scenariosDropdown.appendChild(defaultOption);

    // Static scenarios list
    const scenarios = ["Scenario 1 - Payment", "Scenario 2 - KYC", "Scenario 3 - Loan Processing"];
    scenarios.forEach(scenario => {
        const option = document.createElement('option');
        option.value = scenario;
        option.textContent = scenario;
        scenariosDropdown.appendChild(option);
    });

    // Add event listener for dropdown change
    scenariosDropdown.addEventListener('change', (event) => {
        const selectedScenario = event.target.value;
        switch (selectedScenario) {
            case "Scenario 1 - Payment":
                chrome.storage.local.set({ uiState: "scenario1" }, () => {
                    showScenario1UI();
                });
                break;
            default:
                chrome.storage.local.set({ uiState: "home" }, () => {
                    defaultScenarioUI(selectedScenario); // Pass the selected scenario
                });
        }
    });

    container.appendChild(scenariosDropdown);

    // Append the container to the body
    document.body.appendChild(container);
}



export { showMatcherCheckerUI, restoreState, showHomePage };


// validation verification change