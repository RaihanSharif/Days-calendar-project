// helper function to generate ± range years for the year selector
export function getYearRange(referenceDate, range) {
    const startYear = referenceDate.subtract({ years: range });
    const result = [];
    for (let i = 0; i < range * 2 + 1; i++) {
        result.push(startYear.add({ years: i }).year);
    }
    return result;
}

// Populates the year <select> element with options for
// referenceDate's year ± `range` years (defaults to current year ± 5)
export function populateYearSelect(
    referenceDate = Temporal.Now.plainDateISO(),
    range = 5,
) {
    const yearSelect = document.getElementById("select-year");

    for (const year of getYearRange(referenceDate, range)) {
        const yearOption = document.createElement("option");
        yearOption.value = year.toString();
        yearOption.textContent = year.toString();
        yearSelect.appendChild(yearOption);
    }
}
