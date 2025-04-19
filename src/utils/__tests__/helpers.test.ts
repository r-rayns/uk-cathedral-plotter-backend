import { describe, test, expect } from "vitest";
import { titleCase } from "../helpers.js";

describe('titleCase', () => {
  test('should convert a basic string to title case', () => {
    expect(titleCase('hello world')).toBe('Hello World');
  });

  test('should handle words already in title case', () => {
    expect(titleCase('Hello World')).toBe('Hello World');
  });

  test('should handle an empty string', () => {
    expect(titleCase('')).toBe('');
  });

  test('should handle a single word', () => {
    expect(titleCase('hello')).toBe('Hello');
  });

  test('should maintain punctuation', () => {
    expect(titleCase('hello, world!')).toBe('Hello, World!');
  });
});
