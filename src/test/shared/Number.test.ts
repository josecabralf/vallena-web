import { describe, test, expect } from 'vitest';
import { Number } from '../../shared/Number';

describe('Number', () => {
  describe('formatCurrency', () => {
    test('should format numbers with Spanish locale (es-AR)', () => {
      expect(Number.formatCurrency(1234567)).toBe('1.234.567');
      expect(Number.formatCurrency(1000000)).toBe('1.000.000');
      expect(Number.formatCurrency(1234)).toBe('1.234');
    });

    test('should format decimal numbers correctly', () => {
      expect(Number.formatCurrency(1234.56)).toBe('1.234,56');
      expect(Number.formatCurrency(123.45)).toBe('123,45');
      expect(Number.formatCurrency(0.99)).toBe('0,99');
    });

    test('should handle zero and negative numbers', () => {
      expect(Number.formatCurrency(0)).toBe('0');
      expect(Number.formatCurrency(-1234.56)).toBe('-1.234,56');
      expect(Number.formatCurrency(-1000000)).toBe('-1.000.000');
    });

    test('should handle small numbers', () => {
      expect(Number.formatCurrency(1)).toBe('1');
      expect(Number.formatCurrency(12)).toBe('12');
      expect(Number.formatCurrency(123)).toBe('123');
    });

    test('should handle very large numbers', () => {
      expect(Number.formatCurrency(1234567890)).toBe('1.234.567.890');
      expect(Number.formatCurrency(999999999.99)).toBe('999.999.999,99');
    });
  });
});
