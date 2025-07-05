import { describe, test, expect } from 'vitest';
import { ConditionValidator } from '../../../shared/ConditionValidator';

describe('ConditionValidator', () => {
  describe('constructor', () => {
    test('should create empty validator when no validations provided', () => {
      const validator = new ConditionValidator();
      expect(validator.errors).toEqual([]);
      expect(validator.isEmpty()).toBe(true);
      expect(validator.isValid()).toBe(true);
    });

    test('should create empty validator when empty validations array provided', () => {
      const validator = new ConditionValidator({ validations: [] });
      expect(validator.errors).toEqual([]);
      expect(validator.isEmpty()).toBe(true);
    });

    test('should run validations on construction', () => {
      const validations = [
        { condition: true, message: 'Error 1' },
        { condition: false, message: 'Error 2' },
        { condition: true, message: 'Error 3' },
      ];

      const validator = new ConditionValidator({ validations });
      expect(validator.errors).toEqual(['Error 1', 'Error 3']);
    });
  });

  describe('validate', () => {
    test('should add error messages for true conditions', () => {
      const validator = new ConditionValidator();
      const validations = [
        { condition: true, message: 'Required field is empty' },
        { condition: false, message: 'This should not be added' },
        { condition: true, message: 'Invalid format' },
      ];

      validator.validate(validations);

      expect(validator.errors).toEqual([
        'Required field is empty',
        'Invalid format',
      ]);
    });

    test('should not add error messages for false conditions', () => {
      const validator = new ConditionValidator();
      const validations = [
        { condition: false, message: 'Valid field' },
        { condition: false, message: 'Another valid field' },
      ];

      validator.validate(validations);

      expect(validator.errors).toEqual([]);
    });

    test('should accumulate errors from multiple validate calls', () => {
      const validator = new ConditionValidator();

      validator.validate([{ condition: true, message: 'First error' }]);

      validator.validate([{ condition: true, message: 'Second error' }]);

      expect(validator.errors).toEqual(['First error', 'Second error']);
    });
  });

  describe('isEmpty', () => {
    test('should return true when no errors', () => {
      const validator = new ConditionValidator();
      expect(validator.isEmpty()).toBe(true);
    });

    test('should return false when errors exist', () => {
      const validator = new ConditionValidator({
        validations: [{ condition: true, message: 'Error' }],
      });
      expect(validator.isEmpty()).toBe(false);
    });
  });

  describe('isValid', () => {
    test('should return true when no errors', () => {
      const validator = new ConditionValidator();
      expect(validator.isValid()).toBe(true);
    });

    test('should return false when errors exist', () => {
      const validator = new ConditionValidator({
        validations: [{ condition: true, message: 'Error' }],
      });
      expect(validator.isValid()).toBe(false);
    });

    test('should be equivalent to isEmpty', () => {
      const validator1 = new ConditionValidator();
      const validator2 = new ConditionValidator({
        validations: [{ condition: true, message: 'Error' }],
      });

      expect(validator1.isValid()).toBe(validator1.isEmpty());
      expect(validator2.isValid()).toBe(validator2.isEmpty());
    });
  });

  describe('toString', () => {
    test('should return empty string when no errors', () => {
      const validator = new ConditionValidator();
      expect(validator.toString()).toBe('');
    });

    test('should return single error message', () => {
      const validator = new ConditionValidator({
        validations: [{ condition: true, message: 'Single error' }],
      });
      expect(validator.toString()).toBe('Single error');
    });

    test('should join multiple errors with semicolon and space', () => {
      const validator = new ConditionValidator({
        validations: [
          { condition: true, message: 'Error 1' },
          { condition: true, message: 'Error 2' },
          { condition: true, message: 'Error 3' },
        ],
      });
      expect(validator.toString()).toBe('Error 1; Error 2; Error 3');
    });
  });

  describe('integration tests', () => {
    test('should handle complex validation scenario', () => {
      const email: string = '';
      const password: string = '123';
      const confirmPassword: string = 'abc';

      const validator = new ConditionValidator({
        validations: [
          { condition: !email, message: 'Email is required' },
          {
            condition: password.length < 8,
            message: 'Password must be at least 8 characters',
          },
          {
            condition: password !== confirmPassword,
            message: 'Passwords do not match',
          },
        ],
      });

      expect(validator.isValid()).toBe(false);
      expect(validator.errors).toHaveLength(3);
      expect(validator.toString()).toBe(
        'Email is required; Password must be at least 8 characters; Passwords do not match'
      );
    });

    test('should handle form validation with some valid fields', () => {
      const username = 'validuser';
      const email = 'user@example.com';
      const age = 15; // Invalid - too young

      const validator = new ConditionValidator({
        validations: [
          { condition: username.length < 3, message: 'Username too short' },
          { condition: !email.includes('@'), message: 'Invalid email format' },
          { condition: age < 18, message: 'Must be at least 18 years old' },
        ],
      });

      expect(validator.isValid()).toBe(false);
      expect(validator.errors).toEqual(['Must be at least 18 years old']);
      expect(validator.toString()).toBe('Must be at least 18 years old');
    });
  });
});
