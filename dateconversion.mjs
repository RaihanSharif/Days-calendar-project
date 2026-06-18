// Map each month to a number
const MONTH_TO_NUM = {
    january: 0,
    february: 1,
    march: 2,
    april: 3,
    may: 4,
    june: 5,
    july: 6,
    august: 7,
    september: 8,
    october: 9,
    november: 10,
    december: 11,
};

// Map each day of the week to a number
const DAY_TO_NUM = {
    sunday: 0,
    monday: 1,
    tuesday: 2,
    wednesday: 3,
    thursday: 4,
    friday: 5,
    saturday: 6,
};

// Map ordinal dates to cardinal integers
// e.g. first = first <day of Week> of the month
// fifth and last?
const ORDINAL_TO_CARDINAL = {
    first: 1,
    second: 2,
    third: 3,
    fourth: 4,
    fifth: 5,
    last: -1,
};

// Takes event object of form { name, monthName, dayName, occurrence, descriptionURL }
// converts string monthName, dayName, and occurrence to numeric values.
function normalizeEvent(event) {
    const month = MONTH_TO_NUM[event.monthName.toLowerCase()];
    const weekday = DAY_TO_NUM[event.dayName.toLowerCase()];
    const n = ORDINAL_TO_CARDINAL[event.occurrence.toLowerCase()];

    if (month === undefined || weekday === undefined || n === undefined) {
        throw new Error(`Invalid event definition: ${JSON.stringify(event)}`);
    }

    return { month, weekday, n };
}

/**
 * Calculates the exact date of the nth occurrence of a weekday within a given month.
 *
 * @param {number} year - The full year (e.g. 2026).
 * @param {number} month - The month index, zero-based (0 = January, 11 = December).
 * @param {number} weekday - The day of the week, zero-based (0 = Sunday, 6 = Saturday).
 * @param {number} n - The nth occurrence of weekday. Use 1 for the first, 2 for the
 *   second, etc. Use -1 to get the *last* occurrence of the weekday in the month.
 * @returns {Date} The exact date of the requested weekday occurrence.
 * @throws {Error} If `n` exceeds the number of times `weekday` appears in the month.
 *
 * @example
 * // Third Monday of June 2026
 * nthWeekdayOfMonth(2026, 5, 1, 3); // → Date: 2026-06-15
 *
 * @example
 * // Last Friday of December 2026
 * nthWeekdayOfMonth(2026, 11, 5, -1); // → Date: 2026-12-25
 */
export function nthWeekdayOfMonth(year, month, weekday, n) {
    if (n === -1) {
        const lastDay = new Date(year, month + 1, 0).getDate();
        const lastDate = new Date(year, month, lastDay);
        const diff = (lastDate.getDay() - weekday + 7) % 7;
        return new Date(year, month, lastDay - diff);
    }
    const firstDay = new Date(year, month, 1);
    const offset = (weekday - firstDay.getDay() + 7) % 7;
    const day = 1 + offset + (n - 1) * 7;
    const result = new Date(year, month, day);
    if (result.getMonth() !== month) {
        throw new Error("invalid occurrence for this day");
    }

    return result;
}

/**
 * Calculates the exact date of an event
 * @param {Object} event
 * @param {number} year - the full year e.g. 2026
 * @returns {Date} The exact date of event
 */
export function getEventDate(event, year) {
    const { month, weekday, n } = normalizeEvent(event);
    return nthWeekdayOfMonth(year, month, weekday, n);
}
