import { getEventDate } from "./dateconversion.mjs";

const event = {
  name: "Ada Lovelace Day",
  monthName: "October",
  dayName: "Tuesday",
  occurrence: "second",
};

console.log(getEventDate(event, 2026));
console.log(getEventDate(event, 2028));
