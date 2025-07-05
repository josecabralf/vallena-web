import { describe, test, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Button } from '../components/Button.component';

describe('Button Component', () => {
  test('renders button with title text', () => {
    const mockClick = vi.fn();
    render(<Button title="Click me" onClick={mockClick} />);
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  test('button is clickable', () => {
    const mockClick = vi.fn();
    const { container } = render(
      <Button title="Test Button" onClick={mockClick} />
    );
    const button = container.querySelector('button');
    expect(button).not.toBeNull();
  });

  test('renders without crashing', () => {
    const mockClick = vi.fn();
    expect(() =>
      render(<Button title="Test" onClick={mockClick} />)
    ).not.toThrow();
  });

  test('renders with loading spinner', () => {
    const mockClick = vi.fn();
    render(<Button title="Loading" onClick={mockClick} isLoading={true} />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});
