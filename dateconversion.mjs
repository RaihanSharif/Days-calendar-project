// data conversion and case sensitivity protection
const MONTHS = {
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

const WEEKDAYS = {
  sunday: 0,
  monday: 1,
  tuesday: 2,
  wednesday: 3,
  thursday: 4,
  friday: 5,
  saturday: 6,
};

const OCCURRENCES = {
  first: 1,
  second: 2,
  third: 3,
  fourth: 4,
  fifth: 5,
  last: -1,
};

function normalizeEvent(event) {
  const month = MONTHS[event.monthName.toLowerCase()];
  const weekday = WEEKDAYS[event.dayName.toLowerCase()];
  const n = OCCURRENCES[event.occurrence.toLowerCase()];

  if (
    month === undefined ||
    weekday === undefined ||
    n === undefined
  ) {
    throw new Error(
      `Invalid event definition: ${JSON.stringify(event)}`,
    );
  }

  return { ...event, month, weekday, n };
}

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
  if (result.getMonth() !== month) return null;
  return result;
}

export function getEventDate(event, year) {
  const { month, weekday, n } = normalizeEvent(event);
  return nthWeekdayOfMonth(year, month, weekday, n);
}
