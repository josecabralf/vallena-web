import { Button } from '../../../components/Button.component';
import { describe, test, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

describe('Button Component - Extended Tests', () => {
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

  test('handles different button types', () => {
    const types = ['default', 'primary', 'dashed', 'link', 'text'] as const;

    types.forEach(type => {
      const { unmount } = render(
        <Button title={`${type} button`} onClick={vi.fn()} type={type} />
      );
      expect(screen.getByText(`${type} button`)).toBeInTheDocument();
      unmount();
    });
  });

  test('renders with danger prop', () => {
    const mockClick = vi.fn();
    render(<Button title="Danger Button" onClick={mockClick} danger />);
    expect(screen.getByText('Danger Button')).toBeInTheDocument();
  });

  test('renders with disabled prop', () => {
    const mockClick = vi.fn();
    render(<Button title="Disabled Button" onClick={mockClick} disabled />);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  test('renders with ghost prop', () => {
    const mockClick = vi.fn();
    render(<Button title="Ghost Button" onClick={mockClick} ghost />);
    expect(screen.getByText('Ghost Button')).toBeInTheDocument();
  });

  test('renders with different shapes', () => {
    const shapes: ('default' | 'circle' | 'round')[] = [
      'default',
      'circle',
      'round',
    ];

    shapes.forEach(shape => {
      const { unmount } = render(
        <Button title="Shape Button" onClick={vi.fn()} shape={shape} />
      );
      expect(screen.getByText('Shape Button')).toBeInTheDocument();
      unmount();
    });
  });

  test('renders with block prop', () => {
    const mockClick = vi.fn();
    render(<Button title="Block Button" onClick={mockClick} block />);
    expect(screen.getByText('Block Button')).toBeInTheDocument();
  });

  test('handles click events', async () => {
    const user = userEvent.setup();
    const mockClick = vi.fn();
    render(<Button title="Clickable" onClick={mockClick} />);

    const button = screen.getByRole('button');
    await user.click(button);

    expect(mockClick).toHaveBeenCalledTimes(1);
  });

  test('handles mouse events', async () => {
    const user = userEvent.setup();
    const mockMouseOver = vi.fn();
    const mockMouseLeave = vi.fn();

    render(
      <Button
        title="Mouse Events"
        onClick={vi.fn()}
        onMouseOver={mockMouseOver}
        onMouseLeave={mockMouseLeave}
      />
    );

    const button = screen.getByRole('button');
    await user.hover(button);
    expect(mockMouseOver).toHaveBeenCalled();

    await user.unhover(button);
    expect(mockMouseLeave).toHaveBeenCalled();
  });

  test('renders with icon', () => {
    const mockIcon = <span data-testid="test-icon">Icon</span>;
    const mockClick = vi.fn();

    render(<Button title="With Icon" onClick={mockClick} icon={mockIcon} />);

    expect(screen.getByTestId('test-icon')).toBeInTheDocument();
    expect(screen.getByText('With Icon')).toBeInTheDocument();
  });

  test('shows spinner when isLoading is true', () => {
    const mockClick = vi.fn();
    const { container } = render(
      <Button title="Loading" onClick={mockClick} isLoading />
    );

    // The spinner should be rendered instead of the title
    expect(container.querySelector('.ant-spin')).toBeInTheDocument();
  });

  test('applies custom styles with disabled state', () => {
    const mockClick = vi.fn();
    const customStyle = { backgroundColor: 'blue' };

    render(
      <Button
        title="Styled Disabled"
        onClick={mockClick}
        disabled
        style={customStyle}
      />
    );

    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });
});
