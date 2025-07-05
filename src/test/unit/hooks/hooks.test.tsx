import { describe, test, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useAuth } from '../../../hooks/useAuth.hook';
import { useToast } from '../../../hooks/useToast.hook';

describe('useAuth hook', () => {
  test('should throw error when used outside AuthProvider', () => {
    expect(() => {
      renderHook(() => useAuth());
    }).toThrow('useAuth must be used within an AuthProvider');
  });
});

describe('useToast hook', () => {
  test('should throw error when used outside ToastProvider', () => {
    expect(() => {
      renderHook(() => useToast());
    }).toThrow('useToast must be used within ToastProvider');
  });
});
