import "temporal-polyfill/global";
import { displayCalendar, populateYearSelect } from "./DOMFunctions.mjs";

let currentDate = Temporal.Now.plainDateISO().with({ day: 1 });

function setup() {
    populateYearSelect();
    displayCalendar(currentDate);

    const prevBtn = document.getElementById("prev-month");
    prevBtn.addEventListener("click", () => {
        currentDate = currentDate.subtract({ months: 1 });
        displayCalendar(currentDate);
    });

    const nextBtn = document.getElementById("next-month");
    nextBtn.addEventListener("click", (e) => {
        currentDate = currentDate.add({ months: 1 });
        displayCalendar(currentDate);
    });

    const monthSelect = document.getElementById("select-month");
    const yearSelect = document.getElementById("select-year");

    function handleMonthYearSelect() {
        const month = monthSelect.value;
        const year = yearSelect.value;
        if (month && year) {
            currentDate = Temporal.PlainDate.from(
                `${String(year)}-${String(month)}-01`,
            );
            displayCalendar(currentDate);
        } else {
            alert("Please select both month and year");
        }
    }

    monthSelect.addEventListener("change", handleMonthYearSelect);

    yearSelect.addEventListener("change", handleMonthYearSelect);
}

setup();
