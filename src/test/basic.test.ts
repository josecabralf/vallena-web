import { describe, test, expect } from 'vitest';

describe('Basic Math Tests', () => {
  test('1 should equal 1', () => {
    expect(1).toBe(1);
  });

  test('addition works correctly', () => {
    expect(1 + 1).toBe(2);
  });

  test('string equality', () => {
    expect('hello').toBe('hello');
  });

  test('array equality', () => {
    expect([1, 2, 3]).toEqual([1, 2, 3]);
  });

  test('boolean values', () => {
    expect(true).toBe(true);
    expect(false).toBe(false);
  });
});

describe('Advanced Equality Tests', () => {
  test('object equality', () => {
    const obj1 = { name: 'test', value: 42 };
    const obj2 = { name: 'test', value: 42 };
    expect(obj1).toEqual(obj2);
  });

  test('null and undefined', () => {
    expect(null).toBe(null);
    expect(undefined).toBe(undefined);
  });

  test('type checking', () => {
    expect(typeof 'string').toBe('string');
    expect(typeof 42).toBe('number');
    expect(typeof true).toBe('boolean');
  });
});
