// Function to set current year in footer
function setCurrentYear() {
    const yearElement = document.getElementById('current-year');
    const currentYear = new Date().getFullYear();
    yearElement.textContent = currentYear;
}

// Call the function to set the year when the script loads
setCurrentYear();
