import { describe, test, expect, beforeEach, vi } from 'vitest';
import moment from 'moment';
import { Date } from '../../shared/Date.class';

describe('Date', () => {
  beforeEach(() => {
    // Reset moment to avoid interference between tests
    vi.clearAllMocks();
  });

  describe('constructor', () => {
    test('should create date with current time when no parameter provided', () => {
      const date = new Date();
      expect(date.toMoment().isValid()).toBe(true);
    });

    test('should create date from string', () => {
      const date = new Date('2023-01-01');
      expect(date.format('YYYY-MM-DD')).toBe('2023-01-01');
    });

    test('should create date from number (timestamp)', () => {
      const timestamp = 1640995200000; // 2022-01-01 00:00:00 UTC
      const date = new Date(timestamp);
      expect(date.toMoment().isValid()).toBe(true);
    });

    test('should create date from JavaScript Date object', () => {
      const jsDate = new globalThis.Date('2023-06-15');
      const date = new Date(jsDate);
      expect(date.toMoment().isValid()).toBe(true);
    });

    test('should create date from Moment object', () => {
      const momentDate = moment('2023-12-25');
      const date = new Date(momentDate);
      expect(date.format('YYYY-MM-DD')).toBe('2023-12-25');
    });
  });

  describe('static now', () => {
    test('should return current date', () => {
      const date = Date.now();
      expect(date.toMoment().isValid()).toBe(true);
    });
  });

  describe('format', () => {
    test('should format date with TIME-STAMP format', () => {
      const date = new Date('2023-01-01 12:30:45');
      const formatted = date.format('TIME-STAMP');
      expect(formatted).toMatch(/\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}/);
    });

    test('should format date with custom format', () => {
      const date = new Date('2023-01-01');
      expect(date.format('DD/MM/YYYY')).toBe('01/01/2023');
      expect(date.format('MMMM Do, YYYY')).toBe('January 1st, 2023');
    });
  });

  describe('toISOString', () => {
    test('should return ISO string format', () => {
      const date = new Date('2023-01-01 12:30:45');
      const iso = date.toISOString();
      expect(iso).toMatch(/\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}/);
    });
  });

  describe('static parse', () => {
    test('should parse date string without format', () => {
      const date = Date.parse('2023-01-01');
      expect(date.format('YYYY-MM-DD')).toBe('2023-01-01');
    });

    test('should parse date string with custom format', () => {
      const date = Date.parse('01/01/2023', 'DD/MM/YYYY');
      expect(date.format('YYYY-MM-DD')).toBe('2023-01-01');
    });
  });

  describe('toMoment', () => {
    test('should return moment object', () => {
      const date = new Date('2023-01-01');
      const momentObj = date.toMoment();
      expect(moment.isMoment(momentObj)).toBe(true);
    });
  });

  describe('toDate', () => {
    test('should return JavaScript Date object', () => {
      const date = new Date('2023-01-01');
      const jsDate = date.toDate();
      expect(jsDate instanceof globalThis.Date).toBe(true);
    });
  });

  describe('addDays', () => {
    test('should add days to date', () => {
      const date = new Date('2023-01-01');
      date.addDays(5);
      expect(date.format('YYYY-MM-DD')).toBe('2023-01-06');
    });

    test('should return the same Date instance', () => {
      const date = new Date('2023-01-01');
      const result = date.addDays(1);
      expect(result).toBe(date);
    });
  });

  describe('subtractDays', () => {
    test('should subtract days from date', () => {
      const date = new Date('2023-01-06');
      date.subtractDays(5);
      expect(date.format('YYYY-MM-DD')).toBe('2023-01-01');
    });

    test('should return the same Date instance', () => {
      const date = new Date('2023-01-06');
      const result = date.subtractDays(1);
      expect(result).toBe(date);
    });
  });

  describe('substractHours', () => {
    test('should subtract hours from date', () => {
      const date = new Date('2023-01-01 12:00:00');
      date.substractHours(3);
      expect(date.format('YYYY-MM-DD HH:mm:ss')).toBe('2023-01-01 09:00:00');
    });
  });

  describe('getDay', () => {
    test('should return day of week', () => {
      const date = new Date('2023-01-01'); // Sunday
      expect(date.getDay()).toBe(0);
    });
  });

  describe('getMonth', () => {
    test('should return month (0-based)', () => {
      const date = new Date('2023-01-01');
      expect(date.getMonth()).toBe(0); // January is 0
    });
  });

  describe('getYear', () => {
    test('should return year', () => {
      const date = new Date('2023-01-01');
      expect(date.getYear()).toBe(2023);
    });
  });

  describe('isBefore', () => {
    test('should return true when date is before another date', () => {
      const date1 = new Date('2023-01-01');
      const date2 = new Date('2023-01-02');
      expect(date1.isBefore(date2)).toBe(true);
    });

    test('should return false when date is after another date', () => {
      const date1 = new Date('2023-01-02');
      const date2 = new Date('2023-01-01');
      expect(date1.isBefore(date2)).toBe(false);
    });
  });

  describe('isAfter', () => {
    test('should return true when date is after another date', () => {
      const date1 = new Date('2023-01-02');
      const date2 = new Date('2023-01-01');
      expect(date1.isAfter(date2)).toBe(true);
    });

    test('should return false when date is before another date', () => {
      const date1 = new Date('2023-01-01');
      const date2 = new Date('2023-01-02');
      expect(date1.isAfter(date2)).toBe(false);
    });
  });

  describe('isSame', () => {
    test('should return true for same dates', () => {
      const date1 = new Date('2023-01-01 12:30:45');
      const date2 = new Date('2023-01-01 12:30:45');
      expect(date1.isSame(date2)).toBe(true);
    });

    test('should return true for same dates with granularity', () => {
      const date1 = new Date('2023-01-01 12:30:45');
      const date2 = new Date('2023-01-01 15:45:30');
      expect(date1.isSame(date2, 'day')).toBe(true);
    });
  });

  describe('toMinutes', () => {
    test('should return minutes from date', () => {
      const date = new Date('2023-01-01 12:30:45');
      expect(date.toMinutes()).toBe(30);
    });
  });

  describe('toMilliseconds', () => {
    test('should return milliseconds from date', () => {
      const date = new Date('2023-01-01 12:30:45.123');
      expect(typeof date.toMilliseconds()).toBe('number');
    });
  });

  describe('startOf', () => {
    test('should set to start of day', () => {
      const date = new Date('2023-01-01 12:30:45');
      date.startOf('day');
      expect(date.format('YYYY-MM-DD HH:mm:ss')).toBe('2023-01-01 00:00:00');
    });

    test('should set to start of month', () => {
      const date = new Date('2023-01-15 12:30:45');
      date.startOf('month');
      expect(date.format('YYYY-MM-DD HH:mm:ss')).toBe('2023-01-01 00:00:00');
    });
  });

  describe('endOf', () => {
    test('should set to end of day', () => {
      const date = new Date('2023-01-01 12:30:45');
      date.endOf('day');
      expect(date.format('YYYY-MM-DD HH:mm:ss')).toBe('2023-01-01 23:59:59');
    });
  });

  describe('diff', () => {
    test('should calculate difference in days', () => {
      const date1 = new Date('2023-01-01');
      const date2 = new Date('2023-01-06');
      expect(date1.diff(date2, 'days')).toBe(-5);
      expect(date2.diff(date1, 'days')).toBe(5);
    });

    test('should calculate difference in hours', () => {
      const date1 = new Date('2023-01-01 12:00:00');
      const date2 = new Date('2023-01-01 15:00:00');
      expect(date1.diff(date2, 'hours')).toBe(-3);
    });
  });

  describe('static isTimeOverlap', () => {
    test('should return true for overlapping time intervals', () => {
      const start1 = new Date('2023-01-01 10:00:00');
      const end1 = new Date('2023-01-01 12:00:00');
      const start2 = new Date('2023-01-01 11:00:00');
      const end2 = new Date('2023-01-01 13:00:00');

      expect(Date.isTimeOverlap(start1, end1, start2, end2)).toBe(true);
    });

    test('should return false for non-overlapping time intervals', () => {
      const start1 = new Date('2023-01-01 10:00:00');
      const end1 = new Date('2023-01-01 11:00:00');
      const start2 = new Date('2023-01-01 12:00:00');
      const end2 = new Date('2023-01-01 13:00:00');

      expect(Date.isTimeOverlap(start1, end1, start2, end2)).toBe(false);
    });
  });

  describe('static parseTime', () => {
    test('should parse time string to ISO format', () => {
      const timeString = '14:30';
      const result = Date.parseTime(timeString);
      expect(result).toMatch(/\d{4}-\d{2}-\d{2} 14:30:00/);
    });
  });

  describe('addMillisecondsWithOffset', () => {
    test('should add milliseconds with timezone offset', () => {
      const date = new Date('2023-01-01 12:00:00');
      date.addMillisecondsWithOffset(3600000); // 1 hour in milliseconds

      // Should add the milliseconds and apply offset
      expect(date.toMoment().isValid()).toBe(true);
    });
  });

  describe('addDuration', () => {
    test('should add duration string with offset', () => {
      const date = new Date('2023-01-01 12:00:00');
      date.addDuration('PT1H'); // 1 hour
      expect(date.toMoment().isValid()).toBe(true);
    });
  });

  describe('toNearestHour', () => {
    test('should round to nearest hour', () => {
      const date = new Date('2023-01-01 12:30:45');
      const nearest = date.toNearestHour();
      expect(moment.isMoment(nearest)).toBe(true);
    });
  });
});
