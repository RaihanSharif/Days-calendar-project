import events from "./days.json";
import { getEventDate } from "./dateconversion.mjs";

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

// Get all event of a given month and year (numeric)
export function getMonthEvents(month, year) {
    const monthName = new Intl.DateTimeFormat("en", { month: "long" }).format(
        new Date(2000, month - 1),
    );
    const filtered = events.filter((event) => event.monthName === monthName);

    const eventsWithDate = filtered.map((event) => {
        const eventDate = getEventDate(event, year).getDate();

        return { eventName: event["name"], dayOfMonth: eventDate };
    });
    return eventsWithDate;
}

// Temporal date input
export function displayCalendar(date) {
    const monthHeader = document.getElementById("month-header");
    monthHeader.textContent = date.toLocaleString("en-GB", {
        month: "long",
        year: "numeric",
    });

    // In Temporal first day of week is Monday, with value of 1
    // Sunday is 7. This makes the week start on a Sunday
    const offset = date.dayOfWeek % 7;

    const container = document.getElementById("calendar-dates");
    // resets container with header row every time
    container.innerHTML = `
        <div class="cal-heading">Sunday</div>
        <div class="cal-heading">Monday</div>
        <div class="cal-heading">Tuesday</div>
        <div class="cal-heading">Wednesday</div>
        <div class="cal-heading">Thursday</div>
        <div class="cal-heading">Friday</div>
        <div class="cal-heading">Saturday</div>
    `;

    // Calendar cells before the first day of the month are created first
    for (let i = 0; i < offset; i++) {
        const dateCell = document.createElement("div");
        dateCell.classList.add("date-box");
        dateCell.classList.add("empty-box");
        container.appendChild(dateCell);
    }

    // All the events for this month. e.g.[{eventName, dayOfMonth}]
    const eventsWithDates = getMonthEvents(date.month, date.year);

    for (let i = 1; i < date.daysInMonth + 1; i++) {
        const dateCell = document.createElement("div");
        dateCell.className = "date-box";
        dateCell.dataset.value = String(i);

        const dayNumber = document.createElement("div");
        dayNumber.className = "day-number";
        dayNumber.textContent = String(i);
        dateCell.appendChild(dayNumber);

        // all events for this day of the month
        const dayEvents = eventsWithDates.filter((ev) => ev.dayOfMonth === i);

        dayEvents.forEach(({ eventName }) => {
            const eventItem = document.createElement("div");
            eventItem.className = "event-item";
            eventItem.textContent = eventName;
            dateCell.appendChild(eventItem);
        });

        container.appendChild(dateCell);
    }
}
