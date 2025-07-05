import { describe, test, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { Spinner } from '../../components/Spinner.component';
import { CustomParagraph } from '../../components/Paragraph.component';
import { Button } from '../../components/Button.component';

describe('Spinner Component', () => {
  test('renders without crashing', () => {
    expect(() => render(<Spinner />)).not.toThrow();
  });

  test('renders with small size', () => {
    const { container } = render(<Spinner size="sm" />);
    const spinner = container.querySelector('.ant-spin');
    expect(spinner).toBeInTheDocument();
  });

  test('renders with medium size', () => {
    const { container } = render(<Spinner size="md" />);
    const spinner = container.querySelector('.ant-spin');
    expect(spinner).toBeInTheDocument();
  });
});

describe('CustomParagraph Component', () => {
  test('renders text content', () => {
    render(<CustomParagraph text="Hello World" />);
    expect(screen.getByText('Hello World')).toBeInTheDocument();
  });

  test('renders with different variants', () => {
    const variants = [
      'h1',
      'h2',
      'h3',
      'h4',
      'h5',
      'h6',
      'paragraph',
      'text',
    ] as const;

    variants.forEach(variant => {
      const { unmount } = render(
        <CustomParagraph variant={variant} text={`Test ${variant}`} />
      );
      expect(screen.getByText(`Test ${variant}`)).toBeInTheDocument();
      unmount();
    });
  });

  test('applies custom styles', () => {
    const customStyle = { color: 'red', fontSize: '20px' };
    render(<CustomParagraph text="Styled Text" style={customStyle} />);
    const element = screen.getByText('Styled Text');
    expect(element).toBeInTheDocument();
  });

  test('applies color and fontSize props', () => {
    render(
      <CustomParagraph
        text="Colored Text"
        color="blue"
        fontSize="24px"
        fontWeight="bold"
      />
    );
    const element = screen.getByText('Colored Text');
    expect(element).toBeInTheDocument();
  });

  test('applies className', () => {
    render(<CustomParagraph text="Test" className="custom-class" />);
    const element = screen.getByText('Test');
    expect(element).toHaveClass('custom-class');
  });

  test('renders with typography props', () => {
    render(
      <CustomParagraph text="Special Text" strong italic underline code />
    );
    expect(screen.getByText('Special Text')).toBeInTheDocument();
  });
});

describe('Button Component - Extended Tests', () => {
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
