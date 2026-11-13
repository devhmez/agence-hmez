import { describe, it, expect } from "vitest";
import {
  enquirySchema,
  bookingContactSchema,
  validPreferredDate,
  localDate,
} from "@/lib/validation";
describe("date preferences", () => {
  it("rejects invalid calendar dates, past dates, and malformed input", () => {
    for (const date of ["2026-02-30", "2026-09-16", "2026-9-20", "hello", ""])
      expect(validPreferredDate(date, "2026-09-17")).toBe(false);
  });
  it("accepts today, future dates, and real leap days", () => {
    for (const date of ["2026-09-17", "2026-09-18", "2028-02-29"])
      expect(validPreferredDate(date, "2026-09-17")).toBe(true);
  });
  it("uses the local calendar date", () =>
    expect(localDate(new Date(2026, 0, 3, 23, 59))).toBe("2026-01-03"));
});
describe("enquiry validation", () => {
  const valid = {
    name: "Alex Example",
    email: "alex@example.com",
    clinic: "Example Clinic",
    website: "",
    summary: "A new website for our clinic.",
    companyFax: "",
  };
  it("accepts an optional website and valid content", () =>
    expect(enquirySchema.safeParse(valid).success).toBe(true));
  it("rejects unsafe website protocols, oversized text, email injection and extra fields", () => {
    for (const changes of [
      { website: "javascript:alert(1)" },
      { summary: "x".repeat(2001) },
      { email: "a@example.com\nBcc:other@example.com" },
      { unknown: "value" },
    ])
      expect(enquirySchema.safeParse({ ...valid, ...changes }).success).toBe(
        false,
      );
  });
  it("requires enquiry-only consent and validates optional phone", () => {
    expect(
      bookingContactSchema.safeParse({
        name: "Alex",
        email: "alex@example.com",
        phone: "",
        consent: true,
      }).success,
    ).toBe(true);
    expect(
      bookingContactSchema.safeParse({
        name: "Alex",
        email: "alex@example.com",
        phone: "not a phone",
        consent: false,
      }).success,
    ).toBe(false);
  });
});
