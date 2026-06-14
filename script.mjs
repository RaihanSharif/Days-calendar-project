import "temporal-polyfill/global";
import { displayCalendar, populateYearSelect } from "./DOMFunctions.mjs";

let currentDate = Temporal.Now.plainDateISO().with({ day: 1 });

function setup() {
    populateYearSelect();
    displayCalendar(currentDate);

    const nextBtn = document.getElementById("next-month");
    nextBtn.addEventListener("click", (e) => {
        currentDate = currentDate.add({ months: 1 });
        displayCalendar(currentDate);
        console.log(currentDate.toString());
    });
}

setup();
