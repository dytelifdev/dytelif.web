import { describe, expect, it } from "vitest";
import { formatPhone } from "./form-parts";

describe("formatPhone", () => {
  it("groups a number that starts with 0", () => {
    expect(formatPhone("05330167278")).toBe("0533 016 72 78");
  });

  it("groups a ten-digit number", () => {
    expect(formatPhone("5330167278")).toBe("533 016 72 78");
  });

  it("groups an international number", () => {
    expect(formatPhone("+905330167278")).toBe("+90 533 016 72 78");
  });

  it("drops letters and caps the length", () => {
    expect(formatPhone("0533-016-72-78 99 abc")).toBe("0533 016 72 78");
  });

  it("keeps a lone plus while typing", () => {
    expect(formatPhone("+")).toBe("+");
  });
});
