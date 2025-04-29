import { showHomePage } from './matcherChecker.js';
import { showDesnaUI, showDefaultDocUI } from './desnaUI.js';

function showFormFillingUI() {
    // Clear existing content
    document.body.innerHTML = '';
    // Create the main container
    const container = document.createElement('div');
    container.id = 'form-filling-container'; // Add ID for the container
    container.className = 'main-container'; // Add class for the main container

    // Create the title
    const title = document.createElement('h3');
    title.textContent = 'Form Filling';
    title.className = 'page-title'; // Add class for the title
    container.appendChild(title);

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
    homeIcon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-house" viewBox="0 0 16 16"><path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z"/></svg>'; // Home icon Unicode
    homeButton.prepend(homeIcon);

    container.appendChild(homeButton);

    // Create the Scenarios dropdown
    const scenariosDropdown = document.createElement('select');
    scenariosDropdown.id = 'scenariosDropdown';

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
                showDesnaUI();
                break;
            default:
                showDefaultDocUI(selectedScenario); // Pass the selected scenario
        }
    });

    container.appendChild(scenariosDropdown);

    // Append the container to the body
    document.body.appendChild(container);
}

export { showFormFillingUI };