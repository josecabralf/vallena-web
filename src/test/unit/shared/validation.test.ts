import { describe, test, expect } from 'vitest';
import {
  CheckValue,
  Phone,
  Email,
  DNI,
  DateValidator,
  InputValidator,
} from '../../../shared/validation';

describe('CheckValue', () => {
  describe('isEmptyString', () => {
    test('should return true for empty string', () => {
      expect(CheckValue.isEmptyString('')).toBe(true);
    });

    test('should return false for non-empty string', () => {
      expect(CheckValue.isEmptyString('hello')).toBe(false);
    });

    test('should return false for other types', () => {
      expect(CheckValue.isEmptyString(null)).toBe(false);
      expect(CheckValue.isEmptyString(undefined)).toBe(false);
      expect(CheckValue.isEmptyString(0)).toBe(false);
      expect(CheckValue.isEmptyString([])).toBe(false);
    });
  });

  describe('isUndefined', () => {
    test('should return true for undefined', () => {
      expect(CheckValue.isUndefined(undefined)).toBe(true);
    });

    test('should return true for null', () => {
      expect(CheckValue.isUndefined(null)).toBe(true);
    });

    test('should return false for defined values', () => {
      expect(CheckValue.isUndefined('')).toBe(false);
      expect(CheckValue.isUndefined(0)).toBe(false);
      expect(CheckValue.isUndefined(false)).toBe(false);
      expect(CheckValue.isUndefined([])).toBe(false);
      expect(CheckValue.isUndefined({})).toBe(false);
    });
  });

  describe('isArray', () => {
    test('should return true for arrays', () => {
      expect(CheckValue.isArray([])).toBe(true);
      expect(CheckValue.isArray([1, 2, 3])).toBe(true);
      expect(CheckValue.isArray(['a', 'b'])).toBe(true);
    });

    test('should return false for non-arrays', () => {
      expect(CheckValue.isArray(null)).toBe(false);
      expect(CheckValue.isArray(undefined)).toBe(false);
      expect(CheckValue.isArray({})).toBe(false);
      expect(CheckValue.isArray('array')).toBe(false);
      expect(CheckValue.isArray(123)).toBe(false);
    });
  });

  describe('isObject', () => {
    test('should return true for objects', () => {
      expect(CheckValue.isObject({})).toBe(true);
      expect(CheckValue.isObject({ key: 'value' })).toBe(true);
      expect(CheckValue.isObject([])).toBe(true); // Arrays are objects
    });

    test('should return false for non-objects', () => {
      expect(CheckValue.isObject(null)).toBe(false);
      expect(CheckValue.isObject(undefined)).toBe(false);
      expect(CheckValue.isObject('string')).toBe(false);
      expect(CheckValue.isObject(123)).toBe(false);
      expect(CheckValue.isObject(true)).toBe(false);
    });
  });

  describe('isEmptyArray', () => {
    test('should return true for empty arrays', () => {
      expect(CheckValue.isEmptyArray([])).toBe(true);
    });

    test('should return false for non-empty arrays', () => {
      expect(CheckValue.isEmptyArray([1])).toBe(false);
      expect(CheckValue.isEmptyArray(['a', 'b'])).toBe(false);
    });

    test('should return false for non-arrays', () => {
      expect(CheckValue.isEmptyArray(null)).toBe(false);
      expect(CheckValue.isEmptyArray(undefined)).toBe(false);
      expect(CheckValue.isEmptyArray({})).toBe(false);
      expect(CheckValue.isEmptyArray('')).toBe(false);
    });
  });

  describe('isEmptyObject', () => {
    test('should return true for empty objects', () => {
      expect(CheckValue.isEmptyObject({})).toBe(true);
    });

    test('should return false for non-empty objects', () => {
      expect(CheckValue.isEmptyObject({ key: 'value' })).toBe(false);
      expect(CheckValue.isEmptyObject({ a: 1, b: 2 })).toBe(false);
    });

    test('should return false for non-objects', () => {
      expect(CheckValue.isEmptyObject([])).toBe(true); // Arrays are objects but empty arrays should return true
      expect(CheckValue.isEmptyObject(null)).toBe(false);
      expect(CheckValue.isEmptyObject(undefined)).toBe(false);
      expect(CheckValue.isEmptyObject('string')).toBe(false);
    });
  });

  describe('arrayLength', () => {
    test('should return length for arrays', () => {
      expect(CheckValue.arrayLength([])).toBe(0);
      expect(CheckValue.arrayLength([1, 2, 3])).toBe(3);
      expect(CheckValue.arrayLength(['a'])).toBe(1);
    });

    test('should return 0 for non-arrays', () => {
      expect(CheckValue.arrayLength(null)).toBe(0);
      expect(CheckValue.arrayLength(undefined)).toBe(0);
      expect(CheckValue.arrayLength({})).toBe(0);
      expect(CheckValue.arrayLength('string')).toBe(0);
      expect(CheckValue.arrayLength(123)).toBe(0);
    });
  });
});

describe('Phone', () => {
  describe('isValid', () => {
    test('should return true for valid phone numbers', () => {
      expect(Phone.isValid('1234567890')).toBe(true);
      expect(Phone.isValid('0987654321')).toBe(true);
    });

    test('should return false for invalid phone numbers', () => {
      expect(Phone.isValid('123456789')).toBe(false); // 9 digits
      expect(Phone.isValid('12345678901')).toBe(false); // 11 digits
      expect(Phone.isValid('123-456-7890')).toBe(false); // with dashes
      expect(Phone.isValid('123 456 7890')).toBe(false); // with spaces
      expect(Phone.isValid('abc1234567')).toBe(false); // with letters
      expect(Phone.isValid('')).toBe(false);
    });

    test('should return false for undefined/null values', () => {
      expect(Phone.isValid(undefined)).toBe(false);
      expect(Phone.isValid(null as unknown as string)).toBe(false);
    });
  });
});

describe('Email', () => {
  describe('isValid', () => {
    test('should return true for valid email addresses', () => {
      expect(Email.isValid('test@example.com')).toBe(true);
      expect(Email.isValid('user.name@domain.co.uk')).toBe(true);
      expect(Email.isValid('user+tag@example.org')).toBe(true);
      expect(Email.isValid('user123@test-domain.com')).toBe(true);
    });

    test('should return false for invalid email addresses', () => {
      expect(Email.isValid('invalid-email')).toBe(false);
      expect(Email.isValid('@example.com')).toBe(false);
      expect(Email.isValid('user@')).toBe(false);
      expect(Email.isValid('user@domain')).toBe(false);
      expect(Email.isValid('user.domain.com')).toBe(false);
      expect(Email.isValid('')).toBe(false);
    });

    test('should return false for undefined/null values', () => {
      expect(Email.isValid(undefined)).toBe(false);
      expect(Email.isValid(null as unknown as string)).toBe(false);
    });
  });
});

describe('DNI', () => {
  describe('isValid', () => {
    test('should return true for valid DNI numbers', () => {
      expect(DNI.isValid('1234567')).toBe(true); // 7 digits
      expect(DNI.isValid('12345678')).toBe(true); // 8 digits
    });

    test('should return false for invalid DNI numbers', () => {
      expect(DNI.isValid('123456')).toBe(false); // 6 digits
      expect(DNI.isValid('123456789')).toBe(false); // 9 digits
      expect(DNI.isValid('12345a78')).toBe(false); // with letter
      expect(DNI.isValid('12.345.678')).toBe(false); // with dots
      expect(DNI.isValid('')).toBe(false);
    });

    test('should return false for undefined/null values', () => {
      expect(DNI.isValid(undefined)).toBe(false);
      expect(DNI.isValid(null as unknown as string)).toBe(false);
    });
  });
});

describe('DateValidator', () => {
  describe('isValidDate', () => {
    test('should return true for valid date formats', () => {
      expect(DateValidator.isValidDate('01/01/2023')).toBe(true);
      expect(DateValidator.isValidDate('31/12/2023')).toBe(true);
      expect(DateValidator.isValidDate('2023-01-01')).toBe(true);
      expect(DateValidator.isValidDate('2023-12-31')).toBe(true);
    });

    test('should return false for invalid date formats', () => {
      expect(DateValidator.isValidDate('1/1/2023')).toBe(false); // single digits
      expect(DateValidator.isValidDate('2023/01/01')).toBe(false); // wrong format
      expect(DateValidator.isValidDate('01-01-2023')).toBe(false); // dashes in DD/MM/YYYY
      expect(DateValidator.isValidDate('invalid-date')).toBe(false);
      expect(DateValidator.isValidDate('')).toBe(false);
    });
  });
});

describe('InputValidator', () => {
  describe('requireDigit', () => {
    test('should return true when value contains digits', () => {
      expect(InputValidator.requireDigit('abc123')).toBe(true);
      expect(InputValidator.requireDigit('1')).toBe(true);
      expect(InputValidator.requireDigit('test9')).toBe(true);
    });

    test('should return false when value contains no digits', () => {
      expect(InputValidator.requireDigit('abcdef')).toBe(false);
      expect(InputValidator.requireDigit('TEST')).toBe(false);
      expect(InputValidator.requireDigit('!@#$')).toBe(false);
    });
  });

  describe('requireLowercase', () => {
    test('should return true when value contains lowercase letters', () => {
      expect(InputValidator.requireLowercase('ABC123def')).toBe(true);
      expect(InputValidator.requireLowercase('a')).toBe(true);
      expect(InputValidator.requireLowercase('Test')).toBe(true);
    });

    test('should return false when value contains no lowercase letters', () => {
      expect(InputValidator.requireLowercase('ABC123')).toBe(false);
      expect(InputValidator.requireLowercase('TEST')).toBe(false);
      expect(InputValidator.requireLowercase('123!@#')).toBe(false);
    });
  });

  describe('requireUppercase', () => {
    test('should return true when value contains uppercase letters', () => {
      expect(InputValidator.requireUppercase('abc123DEF')).toBe(true);
      expect(InputValidator.requireUppercase('A')).toBe(true);
      expect(InputValidator.requireUppercase('test')).toBe(false);
    });

    test('should return false when value contains no uppercase letters', () => {
      expect(InputValidator.requireUppercase('abc123')).toBe(false);
      expect(InputValidator.requireUppercase('test')).toBe(false);
      expect(InputValidator.requireUppercase('123!@#')).toBe(false);
    });
  });

  describe('requireNonAlphanumeric', () => {
    test('should return true when value contains special characters', () => {
      expect(InputValidator.requireNonAlphanumeric('abc123!')).toBe(true);
      expect(InputValidator.requireNonAlphanumeric('test@')).toBe(true);
      expect(InputValidator.requireNonAlphanumeric('!@#$')).toBe(true);
    });

    test('should return false when value contains only alphanumeric characters', () => {
      expect(InputValidator.requireNonAlphanumeric('abc123')).toBe(false);
      expect(InputValidator.requireNonAlphanumeric('TEST')).toBe(false);
      expect(InputValidator.requireNonAlphanumeric('123456')).toBe(false);
    });
  });

  describe('requireLength', () => {
    test('should return true when value meets minimum length', () => {
      expect(InputValidator.requireLength('12345', 5)).toBe(true);
      expect(InputValidator.requireLength('123456', 5)).toBe(true);
      expect(InputValidator.requireLength('test', 4)).toBe(true);
    });

    test('should return false when value is shorter than required', () => {
      expect(InputValidator.requireLength('1234', 5)).toBe(false);
      expect(InputValidator.requireLength('ab', 3)).toBe(false);
      expect(InputValidator.requireLength('', 1)).toBe(false);
    });
  });

  describe('requireExactLength', () => {
    test('should return true when value has exact length', () => {
      expect(InputValidator.requireExactLength('12345', 5)).toBe(true);
      expect(InputValidator.requireExactLength('test', 4)).toBe(true);
      expect(InputValidator.requireExactLength('', 0)).toBe(true);
    });

    test('should return false when value has different length', () => {
      expect(InputValidator.requireExactLength('1234', 5)).toBe(false);
      expect(InputValidator.requireExactLength('123456', 5)).toBe(false);
      expect(InputValidator.requireExactLength('test', 3)).toBe(false);
    });
  });

  describe('respectsAllowedCharacters', () => {
    test('should return true for alphanumeric strings', () => {
      expect(InputValidator.respectsAllowedCharacters('abc123')).toBe(true);
      expect(InputValidator.respectsAllowedCharacters('TEST123')).toBe(true);
      expect(InputValidator.respectsAllowedCharacters('123')).toBe(true);
      expect(InputValidator.respectsAllowedCharacters('abc')).toBe(true);
    });

    test('should return false for strings with special characters', () => {
      expect(InputValidator.respectsAllowedCharacters('abc123!')).toBe(false);
      expect(InputValidator.respectsAllowedCharacters('test@domain')).toBe(
        false
      );
      expect(InputValidator.respectsAllowedCharacters('hello world')).toBe(
        false
      );
      expect(InputValidator.respectsAllowedCharacters('test-123')).toBe(false);
    });
  });
});
