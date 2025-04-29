function displayScreenshots(captures) {
    const container = document.getElementById("screenshots-container");
    container.innerHTML = ""; // Clear previous content

    captures.forEach((capture, index) => {
        const screenshotItem = document.createElement("div");
        screenshotItem.className = "screenshot-item"; // Add class for the screenshot item

        const thumbnail = document.createElement("img");
        thumbnail.className = "thumbnail-image"; // Add class for the thumbnail image
        thumbnail.src = `data:image/png;base64,${capture.data}`;
        thumbnail.alt = `Screenshot ${index + 1}`;

        const fullImageContainer = document.createElement("div");
        fullImageContainer.className = "full-image"; // Add class for the full image container

        const fullImage = document.createElement("img");
        fullImage.src = `data:image/png;base64,${capture.data}`;
        fullImage.alt = `Screenshot ${index + 1}`;

        fullImageContainer.appendChild(fullImage);

        const downloadBtn = document.createElement("button");
        downloadBtn.className = "download-btn"; // Add class for the download button
        downloadBtn.innerText = `Download Screenshot ${index + 1}`;
        downloadBtn.addEventListener("click", () => {
            downloadImage(capture.data, `screenshot_${index + 1}.png`);
        });

        // Event listener to show full image
        thumbnail.addEventListener("click", () => {
            fullImageContainer.style.display = "flex";
        });

        // Event listener to hide full image
        fullImageContainer.addEventListener("click", () => {
            fullImageContainer.style.display = "none";
        });

        screenshotItem.appendChild(thumbnail);
        screenshotItem.appendChild(fullImageContainer);
        screenshotItem.appendChild(downloadBtn);
        container.appendChild(screenshotItem);
    });
}

function downloadImage(base64Data, filename) {
    const link = document.createElement("a");
    link.href = `data:image/png;base64,${base64Data}`;
    link.download = filename;
    link.click();
}

// function displayComparisonResults(result) {
//     const resultContainer = document.getElementById("result");
//     resultContainer.innerHTML = ""; // Clear previous content

//     // Create a table element
//     const table = document.createElement("table");

//     // Add a row for the status
//     const statusRow = document.createElement("tr");
//     const statusCell = document.createElement("td");
//     statusCell.setAttribute("colspan", "5"); // Span across all columns
//     statusCell.textContent = `Status: ${result.comparison_result.status}`;
//     statusCell.style.fontWeight = "bold";
//     statusCell.style.textAlign = "center";
//     statusCell.style.fontSize = "1.3em";
//     statusRow.appendChild(statusCell);
//     table.appendChild(statusRow);

//     // Add table headers
//     const headerRow = document.createElement("tr");
//     const headers = ["Field", "Desna", "TNA", "AusPayNet", "Status"];
//     headers.forEach(headerText => {
//         const header = document.createElement("th");
//         header.textContent = headerText;
//         header.style.fontWeight = "bold";
//         headerRow.appendChild(header);
//     });
//     table.appendChild(headerRow);

//     // Add rows for mismatched fields
//     if (result.comparison_result.mismatched_fields) {
//         Object.entries(result.comparison_result.mismatched_fields).forEach(([key, value]) => {
//             const row = document.createElement("tr");
//             row.className = "mismatch"; // Add class for mismatches
//             const fieldCell = document.createElement("td");
//             fieldCell.textContent = key;
//             row.appendChild(fieldCell);
//             const response1Cell = document.createElement("td");
//             response1Cell.textContent = value[0] || "N/A";
//             row.appendChild(response1Cell);
//             const response2Cell = document.createElement("td");
//             response2Cell.textContent = value[1] || "N/A";
//             row.appendChild(response2Cell);
//             const response3Cell = document.createElement("td");
//             response3Cell.textContent = value[2] || "N/A";
//             row.appendChild(response3Cell);
//             const statusCell = document.createElement("td");
//             statusCell.textContent = "mismatch";
//             statusCell.className = "status-mismatch";
//             row.appendChild(statusCell);
//             table.appendChild(row);
//         });
//     }

//     // Add rows for matching fields
//     if (result.comparison_result.matching_fields) {
//         Object.entries(result.comparison_result.matching_fields).forEach(([key, value]) => {
//             const row = document.createElement("tr");
//             row.className = "match"; // Add class for matches
//             const fieldCell = document.createElement("td");
//             fieldCell.textContent = key;
//             row.appendChild(fieldCell);
//             const response1Cell = document.createElement("td");
//             response1Cell.textContent = value || "N/A";
//             row.appendChild(response1Cell);
//             const response2Cell = document.createElement("td");
//             response2Cell.textContent = value || "N/A";
//             row.appendChild(response2Cell);
//             const response3Cell = document.createElement("td");
//             response3Cell.textContent = value || "N/A";
//             row.appendChild(response3Cell);
//             const statusCell = document.createElement("td");
//             statusCell.textContent = "match";
//             statusCell.className = "status-match";
//             row.appendChild(statusCell);
//             table.appendChild(row);
//         });
//     }

//     // Append the table to the result container
//     resultContainer.appendChild(table);

//     // Add a download button for the results
//     const downloadBtn = document.createElement("button");
//     downloadBtn.innerText = "Download Results";
//     downloadBtn.className = "download-btn"; // Add class for the button
//     downloadBtn.addEventListener("click", () => {
//         downloadResults(result, "comparison_result.json");
//     });
//     resultContainer.appendChild(downloadBtn);
// }

// function displayComparisonResults(result, model) {
//     console.log(result)
//     const resultContainer = document.getElementById("result");
//     // resultContainer.innerHTML = ""; // Clear previous content
  
//     // Create a table element
//     const table = document.createElement("table");
//     table.classList.add("result-table");
  
//     const modelRow = document.createElement("tr");
//     const modelCell = document.createElement("td");
//     modelCell.setAttribute("colspan", "5"); // Span across all columns
//     modelCell.textContent = `Model: ${model}`;
//     modelCell.style.fontWeight = "bold";
//     modelCell.style.textAlign = "center";
//     modelCell.style.fontSize = "1.3em";
//     modelRow.appendChild(modelCell);
//     table.appendChild(modelRow);
    

//     // Add a row for the status
//     const statusRow = document.createElement("tr");
//     const statusCell = document.createElement("td");
//     statusCell.setAttribute("colspan", "5"); // Span across all columns
//     statusCell.textContent = `Status: ${result.comparison_result.status}`;
//     statusCell.style.fontWeight = "bold";
//     statusCell.style.textAlign = "center";
//     statusCell.style.fontSize = "1.3em";
//     statusRow.appendChild(statusCell);
//     table.appendChild(statusRow);
  
//     // Add table headers
//     const headerRow = document.createElement("tr");
  
//     // Create first column header for "Field"
//     const fieldHeader = document.createElement("th");
//     fieldHeader.textContent = "Field";
//     fieldHeader.style.fontWeight = "bold";
//     headerRow.appendChild(fieldHeader);
  
//     // Add dynamic headers from document types
//     result.comparison_result.document_types.forEach(docType => {
//         const header = document.createElement("th");
//         // Capitalize the first letter of each document type
//         header.textContent = docType.charAt(0).toUpperCase() + docType.slice(1);
//         header.style.fontWeight = "bold";
//         headerRow.appendChild(header);
//     });
  
//     // Add the Status column header
//     const statusHeader = document.createElement("th");
//     statusHeader.textContent = "Status";
//     statusHeader.style.fontWeight = "bold";
//     headerRow.appendChild(statusHeader);
  
//     table.appendChild(headerRow);
  
//     // Add rows for mismatched fields
//     if (result.comparison_result.mismatched_fields) {
//         Object.entries(result.comparison_result.mismatched_fields).forEach(([key, value]) => {
//             const row = document.createElement("tr");
//             row.style.backgroundColor = "#fff0f0"; // Light red for mismatches
  
//             const fieldCell = document.createElement("td");
//             fieldCell.textContent = key;
//             row.appendChild(fieldCell);
  
//             const response1Cell = document.createElement("td");
//             response1Cell.textContent = value[0] || "N/A";
//             row.appendChild(response1Cell);
  
//             const response2Cell = document.createElement("td");
//             response2Cell.textContent = value[1] || "N/A";
//             row.appendChild(response2Cell);
  
//             const response3Cell = document.createElement("td");
//             response3Cell.textContent = value[2] || "N/A";
//             row.appendChild(response3Cell);
  
//             const statusCell = document.createElement("td");
//             statusCell.textContent = "mismatch";
//             statusCell.style.color = "#c20000";
//             row.appendChild(statusCell);
  
//             table.appendChild(row);
//         });
//     }
  
//     // Add rows for matching fields
//     if (result.comparison_result.matching_fields) {
//         Object.entries(result.comparison_result.matching_fields).forEach(([key, value]) => {
//             const row = document.createElement("tr");
//             row.style.backgroundColor = "#f0fff0"; // Light green for matches
  
//             const fieldCell = document.createElement("td");
//             fieldCell.textContent = key;
//             row.appendChild(fieldCell);
  
//             const response1Cell = document.createElement("td");
//             response1Cell.textContent = value || "N/A";
//             row.appendChild(response1Cell);
  
//             const response2Cell = document.createElement("td");
//             response2Cell.textContent = value || "N/A";
//             row.appendChild(response2Cell);
  
//             const response3Cell = document.createElement("td");
//             response3Cell.textContent = value || "N/A";
//             row.appendChild(response3Cell);
  
//             const statusCell = document.createElement("td");
//             statusCell.textContent = "match";
//             statusCell.style.color = "#2c853c";
//             row.appendChild(statusCell);
  
//             table.appendChild(row);
//         });
//     }
  
//     // Append the table to the result container
//     resultContainer.appendChild(table);
  
//     // Add a download button for the results
//     const downloadBtn = document.createElement("button");
//     downloadBtn.innerText = "Download Results";
//     downloadBtn.classList.add("download-btn");
//     downloadBtn.addEventListener("click", () => {
//         downloadResults(result, "comparison_result.json");
//     });
//     resultContainer.appendChild(downloadBtn);
  
// }

// function displayComparisonResults(result, model) {
//     console.log(result);
//     const resultContainer = document.getElementById("result");
//     resultContainer.innerHTML = ""; // Clear previous content

//     // Create a table element
//     const table = document.createElement("table");
//     table.classList.add("result-table");

//     // Add a row for the model
//     const modelRow = document.createElement("tr");
//     const modelCell = document.createElement("td");
//     modelCell.setAttribute("colspan", "6"); // Span across all columns
//     modelCell.textContent = `Model: ${model}`;
//     modelCell.style.fontWeight = "bold";
//     modelCell.style.textAlign = "center";
//     modelCell.style.fontSize = "1.3em";
//     modelRow.appendChild(modelCell);
//     table.appendChild(modelRow);

//     // Add a row for the status
//     const statusRow = document.createElement("tr");
//     const statusCell = document.createElement("td");
//     statusCell.setAttribute("colspan", "6"); // Span across all columns
//     statusCell.textContent = `Status: ${result.comparison_result.status}`;
//     statusCell.style.fontWeight = "bold";
//     statusCell.style.textAlign = "center";
//     statusCell.style.fontSize = "1.3em";
//     statusRow.appendChild(statusCell);
//     table.appendChild(statusRow);

//     // Add table headers
//     const headerRow = document.createElement("tr");

//     // Create first column header for "Field"
//     const fieldHeader = document.createElement("th");
//     fieldHeader.textContent = "Field";
//     fieldHeader.style.fontWeight = "bold";
//     headerRow.appendChild(fieldHeader);

//     // Add dynamic headers from document types
//     result.comparison_result.document_types.forEach(docType => {
//         const header = document.createElement("th");
//         // Capitalize the first letter of each document type
//         header.textContent = docType.charAt(0).toUpperCase() + docType.slice(1);
//         header.style.fontWeight = "bold";
//         headerRow.appendChild(header);
//     });

//     // Add the Status column header
//     const statusHeader = document.createElement("th");
//     statusHeader.textContent = "Status";
//     statusHeader.style.fontWeight = "bold";
//     headerRow.appendChild(statusHeader);

//     // Add the Validation column header
//     const validationHeader = document.createElement("th");
//     validationHeader.textContent = "Validation";
//     validationHeader.style.fontWeight = "bold";
//     headerRow.appendChild(validationHeader);

//     table.appendChild(headerRow);

//     // Function to validate fields
//     const validateField = (fieldName, value) => {
//         if (!value) return "N/A"; // Skip validation if value is missing

//         switch (fieldName) {
//             case "MFID":
//             case "Amount Limit in Figures":
//             case "BSB Number":
//             case "Account Number":
//                 // Check if the value contains only numeric characters
//                 return /^\d+$/.test(value) ? "Passed" : "Failed";
//             case "Bank Bureau Name":
//             case "Company Name":
//             case "Drawing Account Name":
//             case "Amount Limit in Words":
//             case "Limit Frequency":
//             case "Period Ending":
//             case "Temporary Processing Limit Override":
//                 // Check if the value contains only alphanumeric characters and spaces
//                 return /^[a-zA-Z0-9\s]+$/.test(value) ? "Passed" : "Failed";
//             default:
//                 return "N/A";
//         }
//     };

//     // Add rows for mismatched fields
//     if (result.comparison_result.mismatched_fields) {
//         Object.entries(result.comparison_result.mismatched_fields).forEach(([key, value]) => {
//             const row = document.createElement("tr");
//             row.style.backgroundColor = "#fff0f0"; // Light red for mismatches

//             const fieldCell = document.createElement("td");
//             fieldCell.textContent = key;
//             row.appendChild(fieldCell);

//             const response1Cell = document.createElement("td");
//             response1Cell.textContent = value[0] || "N/A";
//             row.appendChild(response1Cell);

//             const response2Cell = document.createElement("td");
//             response2Cell.textContent = value[1] || "N/A";
//             row.appendChild(response2Cell);

//             const response3Cell = document.createElement("td");
//             response3Cell.textContent = value[2] || "N/A";
//             row.appendChild(response3Cell);

//             const statusCell = document.createElement("td");
//             statusCell.textContent = "mismatch";
//             statusCell.style.color = "#c20000";
//             row.appendChild(statusCell);

//             // Add validation cell
//             const validationCell = document.createElement("td");
//             const validationStatus = validateField(key, value[0]); // Validate the first value
//             validationCell.textContent = validationStatus;
//             validationCell.style.color = validationStatus === "Passed" ? "#2c853c" : "#c20000";
//             row.appendChild(validationCell);

//             table.appendChild(row);
//         });
//     }

//     // Add rows for matching fields
//     if (result.comparison_result.matching_fields) {
//         Object.entries(result.comparison_result.matching_fields).forEach(([key, value]) => {
//             const row = document.createElement("tr");
//             row.style.backgroundColor = "#f0fff0"; // Light green for matches

//             const fieldCell = document.createElement("td");
//             fieldCell.textContent = key;
//             row.appendChild(fieldCell);

//             const response1Cell = document.createElement("td");
//             response1Cell.textContent = value || "N/A";
//             row.appendChild(response1Cell);

//             const response2Cell = document.createElement("td");
//             response2Cell.textContent = value || "N/A";
//             row.appendChild(response2Cell);

//             const response3Cell = document.createElement("td");
//             response3Cell.textContent = value || "N/A";
//             row.appendChild(response3Cell);

//             const statusCell = document.createElement("td");
//             statusCell.textContent = "match";
//             statusCell.style.color = "#2c853c";
//             row.appendChild(statusCell);

//             // Add validation cell
//             const validationCell = document.createElement("td");
//             const validationStatus = validateField(key, value); // Validate the value
//             validationCell.textContent = validationStatus;
//             validationCell.style.color = validationStatus === "Passed" ? "#2c853c" : "#c20000";
//             row.appendChild(validationCell);

//             table.appendChild(row);
//         });
//     }

//     // Append the table to the result container
//     resultContainer.appendChild(table);

//     // Add a download button for the results
//     const downloadBtn = document.createElement("button");
//     downloadBtn.innerText = "Download Results";
//     downloadBtn.classList.add("download-btn");
//     downloadBtn.addEventListener("click", () => {
//         downloadResults(result, "comparison_result.json");
//     });
//     resultContainer.appendChild(downloadBtn);
// }

// function displayComparisonResults(result, model) {
//     const resultContainer = document.getElementById("result");
//     resultContainer.innerHTML = ""; // Clear previous content

//     // Create a table element
//     const table = document.createElement("table");
//     table.classList.add("result-table");

//     // Add a row for the model
//     const modelRow = document.createElement("tr");
//     const modelCell = document.createElement("td");
//     modelCell.setAttribute("colspan", "6"); // Span across all columns
//     modelCell.textContent = `Model: ${model}`;
//     modelCell.style.fontWeight = "bold";
//     modelCell.style.textAlign = "center";
//     modelCell.style.fontSize = "1.3em";
//     modelRow.appendChild(modelCell);
//     table.appendChild(modelRow);

//     // Add a row for the status
//     const statusRow = document.createElement("tr");
//     const statusCell = document.createElement("td");
//     statusCell.setAttribute("colspan", "6"); // Span across all columns
//     statusCell.textContent = `Status: ${result.comparison_result.status}`;
//     statusCell.style.fontWeight = "bold";
//     statusCell.style.textAlign = "center";
//     statusCell.style.fontSize = "1.3em";
//     statusRow.appendChild(statusCell);
//     table.appendChild(statusRow);

//     // Add table headers
//     const headerRow = document.createElement("tr");

//     // Create first column header for "Field"
//     const fieldHeader = document.createElement("th");
//     fieldHeader.textContent = "Field";
//     fieldHeader.style.fontWeight = "bold";
//     headerRow.appendChild(fieldHeader);

//     // Add dynamic headers from document types
//     result.comparison_result.document_types.forEach(docType => {
//         const header = document.createElement("th");
//         // Capitalize the first letter of each document type
//         header.textContent = docType.charAt(0).toUpperCase() + docType.slice(1);
//         header.style.fontWeight = "bold";
//         headerRow.appendChild(header);
//     });

//     // Add the Status column header
//     const statusHeader = document.createElement("th");
//     statusHeader.textContent = "Status";
//     statusHeader.style.fontWeight = "bold";
//     headerRow.appendChild(statusHeader);

//     // Add the Validation column header
//     const validationHeader = document.createElement("th");
//     validationHeader.textContent = "Validation";
//     validationHeader.style.fontWeight = "bold";
//     headerRow.appendChild(validationHeader);

//     table.appendChild(headerRow);

//     // Function to validate fields
//     const validateField = (fieldName, value) => {
//         if (!value) return "N/A"; // Skip validation if value is missing

//         switch (fieldName) {
//             case "MFID":
//                 return /^\d+$/.test(value) ? "Passed" : "Failed";
//             case "Amount Limit in Figures":
//                 return /^\d+$/.test(value) ? "Passed" : "Failed";
//             case "BSB Number":
//                 return /^\d+$/.test(value) ? "Passed" : "Failed";
//             case "Account Number":
//                 // Check if the value contains only numeric characters
//                 return /^\d+$/.test(value) ? "Passed" : "Failed";
//             case "Bank Bureau Name":
//             case "Company Name":
//             case "Drawing Account Name":
//             case "Amount Limit in Words":
//             case "Limit Frequency":
//             case "Period Ending":
//             case "Temporary Processing Limit Override":
//                 // Check if the value contains only alphanumeric characters and spaces
//                 return /^[a-zA-Z0-9\s]+$/.test(value) ? "Passed" : "Failed";
//             default:
//                 return "N/A";
//         }
//     };

//     // Add rows for mismatched fields
//     if (result.comparison_result.mismatched_fields) {
//         Object.entries(result.comparison_result.mismatched_fields).forEach(([key, fieldData]) => {
//             const row = document.createElement("tr");
//             row.style.backgroundColor = "#fff0f0"; // Light red for mismatches

//             const fieldCell = document.createElement("td");
//             fieldCell.textContent = key;
//             row.appendChild(fieldCell);

//             // Display all original values for mismatched fields
//             fieldData.values.forEach(value => {
//                 const valueCell = document.createElement("td");
//                 valueCell.textContent = value || "N/A";
//                 row.appendChild(valueCell);
//             });

//             const statusCell = document.createElement("td");
//             statusCell.textContent = fieldData.status; // "mismatch"
//             statusCell.style.color = "#c20000";
//             row.appendChild(statusCell);

//             // Add validation cell
//             const validationCell = document.createElement("td");
//             const validationStatus = validateField(key, fieldData.values[0]); // Validate the first value
//             validationCell.textContent = validationStatus;
//             validationCell.style.color = validationStatus === "Passed" ? "#2c853c" : "#c20000";
//             row.appendChild(validationCell);

//             table.appendChild(row);
//         });
//     }

//     // Add rows for matching fields
//     if (result.comparison_result.matching_fields) {
//         Object.entries(result.comparison_result.matching_fields).forEach(([key, fieldData]) => {
//             const row = document.createElement("tr");
//             row.style.backgroundColor = "#f0fff0"; // Light green for matches

//             const fieldCell = document.createElement("td");
//             fieldCell.textContent = key;
//             row.appendChild(fieldCell);

//             // Display all original values for matching fields
//             fieldData.values.forEach(value => {
//                 const valueCell = document.createElement("td");
//                 valueCell.textContent = value || "N/A";
//                 row.appendChild(valueCell);
//             });

//             const statusCell = document.createElement("td");
//             statusCell.textContent = fieldData.status; // "match"
//             statusCell.style.color = "#2c853c";
//             row.appendChild(statusCell);

//             // Add validation cell
//             const validationCell = document.createElement("td");
//             const validationStatus = validateField(key, fieldData.values[0]); // Validate the first value
//             validationCell.textContent = validationStatus;
//             validationCell.style.color = validationStatus === "Passed" ? "#2c853c" : "#c20000";
//             row.appendChild(validationCell);

//             table.appendChild(row);
//         });
//     }

    

//     // Append the table to the result container
//     resultContainer.appendChild(table);

//     // Add a download button for the results
//     const downloadBtn = document.createElement("button");
//     downloadBtn.innerText = "Download Results";
//     downloadBtn.classList.add("download-btn");
//     downloadBtn.addEventListener("click", () => {
//         downloadResults(result, "comparison_result.json");
//     });
//     resultContainer.appendChild(downloadBtn);
// }

function displayComparisonResults(result, model) {
    const resultContainer = document.getElementById("result");
    resultContainer.innerHTML = "";

    const table = document.createElement("table");
    table.classList.add("result-table");

        // Add a row for the model
    const modelRow = document.createElement("tr");
    const modelCell = document.createElement("td");
    modelCell.setAttribute("colspan", "6"); // Span across all columns
    modelCell.textContent = `Model: ${model}`;
    modelCell.style.fontWeight = "bold";
    modelCell.style.textAlign = "center";
    modelCell.style.fontSize = "1.3em";
    modelRow.appendChild(modelCell);
    table.appendChild(modelRow);

    // Add a row for the status
    const statusRow = document.createElement("tr");
    const statusCell = document.createElement("td");
    statusCell.setAttribute("colspan", "6"); // Span across all columns
    statusCell.textContent = `Status: ${result.comparison_result.status}`;
    statusCell.style.fontWeight = "bold";
    statusCell.style.textAlign = "center";
    statusCell.style.fontSize = "1.3em";
    statusRow.appendChild(statusCell);
    table.appendChild(statusRow);

    // Add headers (unchanged)
    const headerRow = document.createElement("tr");
    const headers = ["Field", ...result.comparison_result.document_types.map(d => d.charAt(0).toUpperCase() + d.slice(1)), "Status", "Validation"];
    headers.forEach(text => {
        const th = document.createElement("th");
        th.textContent = text;
        headerRow.appendChild(th);
    });
    table.appendChild(headerRow);

    // Validation function (unchanged)
    const validateField = (fieldName, value) => {
        if (!value) return "N/A";
        switch (fieldName) {
            case "MFID":
            case "Amount Limit in Figures":
            case "BSB Number":
            case "Account Number":
                return /^\d+$/.test(value) ? "Passed" : "Failed";
            case "Bank Bureau Name":
            case "Company Name":
            case "Drawing Account Name":
            case "Amount Limit in Words":
            case "Limit Frequency":
            case "Period Ending":
            case "Temporary Processing Limit Override":
                return /^[a-zA-Z0-9\s]+$/.test(value) ? "Passed" : "Failed";
            default:
                return "N/A";
        }
    };

    // Process mismatched fields (updated)
    if (result.comparison_result.mismatched_fields) {
        Object.entries(result.comparison_result.mismatched_fields).forEach(([key, fieldData]) => {
            const row = document.createElement("tr");
            row.style.backgroundColor = "#fff0f0";

            // Field name
            const fieldCell = document.createElement("td");
            fieldCell.textContent = key;
            row.appendChild(fieldCell);

            // Values
            fieldData.values.forEach(value => {
                const valueCell = document.createElement("td");
                valueCell.textContent = value || "N/A";
                row.appendChild(valueCell);
            });

            // Status
            const statusCell = document.createElement("td");
            statusCell.textContent = "mismatch";
            statusCell.style.color = "#c20000";
            row.appendChild(statusCell);

            // Validation (check all values)
            const validationCell = document.createElement("td");
            let validationStatus = "Passed";
            for (const value of fieldData.values) {
                if (validateField(key, value) === "Failed") {
                    validationStatus = "Failed";
                    break;
                }
            }
            validationCell.textContent = validationStatus;
            validationCell.style.color = validationStatus === "Passed" ? "#2c853c" : "#c20000";
            row.appendChild(validationCell);

            table.appendChild(row);
        });
    }

    // Process matched fields (unchanged)
    if (result.comparison_result.matching_fields) {
        Object.entries(result.comparison_result.matching_fields).forEach(([key, fieldData]) => {
            const row = document.createElement("tr");
            row.style.backgroundColor = "#f0fff0";

            // Field name
            const fieldCell = document.createElement("td");
            fieldCell.textContent = key;
            row.appendChild(fieldCell);

            // Values
            fieldData.values.forEach(value => {
                const valueCell = document.createElement("td");
                valueCell.textContent = value || "N/A";
                row.appendChild(valueCell);
            });

            // Status
            const statusCell = document.createElement("td");
            statusCell.textContent = "match";
            statusCell.style.color = "#2c853c";
            row.appendChild(statusCell);

            // Validation (first value only)
            const validationCell = document.createElement("td");
            validationCell.textContent = validateField(key, fieldData.values[0]);
            validationCell.style.color = validationCell.textContent === "Passed" ? "#2c853c" : "#c20000";
            row.appendChild(validationCell);

            table.appendChild(row);
        });
    }

    resultContainer.appendChild(table);

    // Download button (unchanged)
    const downloadBtn = document.createElement("button");
    downloadBtn.innerText = "Download Results";
    downloadBtn.classList.add("download-btn");
    downloadBtn.addEventListener("click", () => downloadResults(result, "comparison_result.json"));
    resultContainer.appendChild(downloadBtn);
}

function downloadResults(result, filename) {
    const json = JSON.stringify(result, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
}

export { displayScreenshots, downloadImage, displayComparisonResults, downloadResults };