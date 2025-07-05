import { CustomParagraph } from '../../../components/Paragraph.component';
import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

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
