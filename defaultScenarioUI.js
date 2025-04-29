import { showHomePage } from './matcherChecker.js';

function defaultScenarioUI(selectedScenario) {
    // Clear existing content
    document.body.innerHTML = '';
    
    // Create the main container
    const container = document.createElement('div');
    container.id = 'default-scenario-ui-container';
    container.className = 'main-container';
    
    // Create the main title
    const mainTitle = document.createElement('h3');
    mainTitle.textContent = selectedScenario || 'Scenario Not Selected';
    mainTitle.className = 'page-title';
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
    homeButton.className = 'nav-button';
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
    homeIcon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-house" viewBox="0 0 16 16"><path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z"/></svg>';
    homeButton.prepend(homeIcon);
    container.appendChild(homeButton);
    
    // Append the container to the body
    document.body.appendChild(container);
}


export { defaultScenarioUI };


