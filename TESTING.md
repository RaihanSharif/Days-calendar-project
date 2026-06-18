# REQUIREMENTS

### Create an HTML page which, when loaded, displays a calendar.

Tested manually by running the application locally, and in deployed version.

### The calendar must show every day of the current month, each as a rectangle. Each row of rectangles must show one week. The first column must show Sundays. The first day of the month must be shown in the first row.

Tested manually, by testing months that start on each day of the week.

### There must be two buttons which, when clicked, switch what is displayed. One button must change the display to the previous month. The other button must change the display to the next month. On repeated clicks, these buttons must keep moving back/forwards in time, one month per click.

Tested manually by click them both repeatedly to move the calendar month forward and backward a few years.

### These buttons must work on every month. There should be no first/last months beyond which you can't press previous/next and have them work.

Tested manually by clicking back and forth repeatedly until calendar month reaches several years backward and forward.

### There must be a way to jump to a particular month and year, e.g. "October 2020". For example, you could use a \<select\> tag for each of the month name and a reasonable range of years.

A month select and year select element were added, and if both have valid values the calendar shows that month/year.

Chose 5 years in past and future from current system date as 'reasonable' range of years.

### The days from the JSON file must appear correctly when the month they fall in is displayed. For example:

Tested manually, and using unit tests to ensure JSON file is correctly converted to desired date, and displayed on calendar.

### The calendar should work for every year - if someone goes to 1900, or 2050, or any other year, the commemerative days should be correctly displayed.

Tested manually by clicking a distant year, tested in dev environment by manually setting initial date to a distant date, as follows:

`let currentDate = Temporal.PlainDate.from("1906-10-01");`

### The calendar should work if days were added or removed from the JSON file. You must not hard-code logic for specific days. If, for instance, International Dawn Chorus Day were added to the JSON file (The first Sunday of May), your calendar should show it correctly without modification.

Tested manually. Code always generates events from the provided JSON file.

### Your GitHub repository must contain at least one unit test which demonstrates that your code works. End to end tests are optional. Testing via the DOM is optional.

unit test can be found in the [dateconversion.test.js](./dateconversion.test.mjs)! file

### Every view of your website must be accessible (i.e. all months). We will test this by making sure that "Snapshot" mode of Lighthouse gives 100% accessibility for any view we look at.

Pages with or without events both get maximum accessbility score.
<img width="1406" height="771" alt="Screenshot 2026-06-18 at 18 33 43" src="https://github.com/user-attachments/assets/014162e6-558a-4179-a1b1-6cd4199d73ca" />

<img width="1410" height="765" alt="Screenshot 2026-06-18 at 18 33 50" src="https://github.com/user-attachments/assets/6172ee9a-6abb-49a4-982d-9e4a7fcc3e35" />


### Produce a script that can be run in a terminal via `node`, which creates an [iCal format](https://icalendar.org/) file named `days.ics` containing entries for every day in the JSON file. You must not use recurring events. There must be one entry per commemorative day per year from 2020 until 2030 (inclusive). The events should be "whole day" events - they should not have start/end times.

Tested by importing the created `days.ics` file and then checking if right events were present in 2020, 2026, 2030 and not in 2019 and 2031.

### Logic for calculating dates must be shared between the web generator and the iCal generator.

Both calendar and ical script use the `getEventDate()` function.

### The events in the calendar must be whole-day events, and not have a start/end time.

Checked on google calendar.



