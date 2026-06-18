import { getEventDate } from "./dateconversion.mjs";
import { readFileSync, writeFileSync } from "fs";

const events = JSON.parse(readFileSync("./days.json", "utf8"));

// calculate date as automating UTC could return wrong date due to timezone differences
function toICSDate(date) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}${m}${d}`;
}

function generateICS(events) {
    const lines = [
        "BEGIN:VCALENDAR",
        "VERSION:2.0",
        "PRODID:-//CodeYourFuture//EN",
        "CALSCALE:GREGORIAN",
    ];

    for (const event of events) {
        for (let year = 2020; year <= 2030; year++) {
            let anchor;
            try {
                anchor = getEventDate(event, year);
            } catch {
                console.warn(
                    `Skipping ${event.name} ${year}: no valid date found`,
                );
                continue;
            }

            const dtstart = toICSDate(anchor);
            const dtend = toICSDate(new Date(anchor.getTime() + 86400000));

            lines.push(
                "BEGIN:VEVENT",
                `SUMMARY:${event.name}`,
                `DTSTART;VALUE=DATE:${dtstart}`,
                `DTEND;VALUE=DATE:${dtend}`,
                `UID:${event.name.replace(/\s+/g, "-").toLowerCase()}-${year}@yourapp`,
                "END:VEVENT",
            );
        }
    }

    lines.push("END:VCALENDAR");
    return lines.join("\r\n"); // .ics spec requires CRLF line endings
}

writeFileSync("./days.ics", generateICS(events));
