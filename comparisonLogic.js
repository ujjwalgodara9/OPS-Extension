import { displayComparisonResults, downloadResults } from './uiElements.js';

async function compareCaptures() {
    document.getElementById("loading").classList.remove("hidden");
    document.getElementById("compare-btn").disabled = true;
    try {
        const data = await new Promise((resolve) => {
            chrome.storage.local.get("captures", resolve);
        });
        const captures = data.captures || [];
        if (captures.length < 2) {
            alert("At least two captures are required for comparison.");
            document.getElementById("loading").classList.add("hidden");
            document.getElementById("compare-btn").disabled = false;
            return;
        }

        // // Run both fetch calls concurrently using Promise.all
        // const [response1, response2] = await Promise.all([
        //     fetch("http://127.0.0.1:8000/compare_documents/", {
        //         method: "POST",
        //         headers: { "Content-Type": "application/json" },
        //         body: JSON.stringify({ captures }),
        //     }),
        //     fetch("http://127.0.0.1:8000/compare_documents_openai/", {
        //         method: "POST",
        //         headers: { "Content-Type": "application/json" },
        //         body: JSON.stringify({ captures }),
        //     })
        // ]);

        const [response1] = await Promise.all([
            fetch("http://127.0.0.1:8000/compare_documents/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ captures }),
            })
        ]);

        console.log(response1)

        

        // Parse both responses concurrently
        const [result1] = await Promise.all([response1.json()]);

        // Display both results. Each call creates its own wrapper, so they won't overlap.
        displayComparisonResults(result1,' Open API');
        // displayComparisonResults(result2, "Gemini");

    } catch (error) {
        console.error("Error during comparison:", error);
        document.getElementById("result").innerText = "Error: " + error.message;
    } finally {
        document.getElementById("loading").classList.add("hidden");
        document.getElementById("compare-btn").disabled = false;
    }
}

export { compareCaptures };