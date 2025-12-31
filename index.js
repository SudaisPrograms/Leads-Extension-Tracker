// Array to store all saved leads (URLs)
let myLeads = []

// Getting HTML elements by their IDs
const inputEl = document.getElementById("input-el")      // Input box
const inputBtn = document.getElementById("input-btn")    // SAVE INPUT button
const ulEl = document.getElementById("ul-el")            // <ul> where links show
const deleteBtn = document.getElementById("delete-btn")  // DELETE ALL button
const tabBtn = document.getElementById("tab-btn")        // SAVE TAB button

// Get saved leads from localStorage (if any)
const leadsFromLocalStorage = JSON.parse(
    localStorage.getItem("myLeads")
)

// If data exists in localStorage, load it
if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    render(myLeads)
}

////////////////////////////////////////////////////
// SAVE CURRENT TAB (Chrome Extension Feature)
////////////////////////////////////////////////////
tabBtn.addEventListener("click", function () {

    // Gets the active tab in the current window
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {

        // Save the URL of the active tab
        myLeads.push(tabs[0].url)

        // Save updated array to localStorage
        localStorage.setItem("myLeads", JSON.stringify(myLeads))

        // Re-render list
        render(myLeads)
    })
})

////////////////////////////////////////////////////
// FUNCTION TO DISPLAY LEADS
////////////////////////////////////////////////////
function render(leads) {
    let listItems = ""

    // Loop through all saved links
    for (let i = 0; i < leads.length; i++) {

        // Create clickable links
        listItems += `
            <li>
                <a target="_blank" href="${leads[i]}">
                    ${leads[i]}
                </a>
            </li>
        `
    }

    // Show links inside the <ul>
    ulEl.innerHTML = listItems
}

////////////////////////////////////////////////////
// DELETE ALL LEADS (DOUBLE CLICK)
////////////////////////////////////////////////////
deleteBtn.addEventListener("dblclick", function () {
    localStorage.clear()     // Remove everything from storage
    myLeads = []             // Clear array
    render(myLeads)          // Update UI
})

////////////////////////////////////////////////////
// SAVE INPUT VALUE
////////////////////////////////////////////////////
inputBtn.addEventListener("click", function () {

    // Add input value to array
    myLeads.push(inputEl.value)

    // Clear input field
    inputEl.value = ""

    // Save updated array to localStorage
    localStorage.setItem("myLeads", JSON.stringify(myLeads))

    // Update UI
    render(myLeads)
})
