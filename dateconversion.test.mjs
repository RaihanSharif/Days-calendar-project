import { describe, it, expect } from "vitest";
import { nthWeekdayOfMonth } from "./dateconversion.mjs";

describe("nthWeekdayOfMonth", () => {
    // nthWeekdayOfMonth(year, month, weekday, n)
    // weekday = day of the week, n = nth occurence of that day of week

    // -----------------------------
    // The basic nth day test cases
    // -----------------------------
    it("returns the first Monday of June 2026", () => {
        // month = 5, weekday = 1, n = 1
        const result = nthWeekdayOfMonth(2026, 5, 1, 1);

        expect(result.getFullYear()).toBe(2026);
        expect(result.getMonth()).toBe(5);
        expect(result.getDate()).toBe(1);
    });

    it("returns the third Monday of June 2026", () => {
        const result = nthWeekdayOfMonth(2026, 5, 1, 3);

        expect(result.getFullYear()).toBe(2026);
        expect(result.getMonth()).toBe(5);
        expect(result.getDate()).toBe(15);
    });

    it("returns the second Tuesday of March 2026", () => {
        const result = nthWeekdayOfMonth(2026, 2, 2, 2);

        expect(result.getFullYear()).toBe(2026);
        expect(result.getMonth()).toBe(2);
        expect(result.getDate()).toBe(10);
    });

    // -------------------------------
    // Last occurrence (n = -1)
    // -------------------------------
    it("returns the last Friday of December 2026", () => {
        const result = nthWeekdayOfMonth(2026, 11, 5, -1);

        expect(result.getFullYear()).toBe(2026);
        expect(result.getMonth()).toBe(11);
        expect(result.getDate()).toBe(25);
    });

    it("returns the last Sunday of October 2026", () => {
        const result = nthWeekdayOfMonth(2026, 9, 0, -1);

        expect(result.getFullYear()).toBe(2026);
        expect(result.getMonth()).toBe(9);
        expect(result.getDate()).toBe(25);
    });

    it("returns the last Monday of February 2026 (non-leap)", () => {
        const result = nthWeekdayOfMonth(2026, 1, 1, -1);

        expect(result.getFullYear()).toBe(2026);
        expect(result.getMonth()).toBe(1);
        expect(result.getDate()).toBe(23);
    });

    // -------------------------------------
    // Edge: weekday lands on the 1st
    // -------------------------------------
    it("returns the first Saturday of May 2021 when the 1st is a Saturday", () => {
        // May 1 2021 is a Saturday
        const result = nthWeekdayOfMonth(2021, 4, 6, 1);
        expect(result.getFullYear()).toBe(2021);
        expect(result.getMonth()).toBe(4);
        expect(result.getDate()).toBe(1);
    });

    // -------------------------------------
    // Edge: When 'fifth' occurence in event, rather than 'last'
    // -------------------------------------
    it("returns the fifth Monday of June 2026 when it exists", () => {
        // June 2026: Mondays are 1, 8, 15, 22, 29
        const result = nthWeekdayOfMonth(2026, 5, 1, 5);

        expect(result.getFullYear()).toBe(2026);
        expect(result.getMonth()).toBe(5);
        expect(result.getDate()).toBe(29);
    });

    // ------------------------------------
    // Edge: February in a leap year
    // ------------------------------------
    it("returns the last Monday of February in a leap year (2028)", () => {
        // Feb 2028 has 29 days; last Monday = Feb 28
        const result = nthWeekdayOfMonth(2028, 1, 2, -1);

        expect(result.getFullYear()).toBe(2028);
        expect(result.getMonth()).toBe(1);
        expect(result.getDate()).toBe(29);
    });

    // -------------------------------
    // Return type
    // -------------------------------
    it("always returns a Date instance", () => {
        const result = nthWeekdayOfMonth(2026, 5, 1, 1);
        expect(result).toBeInstanceOf(Date);
    });

    // -------------------------------
    // Error cases
    // -------------------------------
    it("throws when the nth occurrence does not exist in the month", () => {
        // June 2026 has only 5 Mondays (1,8,15,22,29) — no 6th
        expect(() => nthWeekdayOfMonth(2026, 5, 1, 6)).toThrow();
    });

    it("throws when requesting a 5th weekday that only occurs 4 times", () => {
        // Feb 2026: Mondays are 2, 9, 16, 23 — no 5th Monday
        expect(() => nthWeekdayOfMonth(2026, 1, 1, 5)).toThrow();
    });
});
