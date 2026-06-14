import "temporal-polyfill/global";
import { displayCalendar, populateYearSelect } from "./DOMFunctions.mjs";

function setup() {
    populateYearSelect();
    displayCalendar("12", "2026");
}

setup();
