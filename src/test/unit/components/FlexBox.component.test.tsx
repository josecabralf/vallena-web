import { FlexBox } from '../../../components/FlexBox.component';
import { describe, test, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

// Additional edge cases for FlexBox Component
describe('FlexBox Component - Edge Cases', () => {
  test('handles zero gap correctly', () => {
    const { container } = render(
      <FlexBox gap={0}>
        <div>Test</div>
      </FlexBox>
    );

    const flexBox = container.firstChild as HTMLElement;
    expect(flexBox.style.columnGap).toBe('0px');
  });

  test('handles negative gap values', () => {
    const { container } = render(
      <FlexBox gap={-10}>
        <div>Test</div>
      </FlexBox>
    );

    const flexBox = container.firstChild as HTMLElement;
    expect(flexBox.style.columnGap).toBe('-10px');
  });

  test('handles empty string gap', () => {
    const { container } = render(
      <FlexBox gap="">
        <div>Test</div>
      </FlexBox>
    );

    const flexBox = container.firstChild as HTMLElement;
    expect(flexBox.style.columnGap).toBe('');
  });

  test('handles complex gap units', () => {
    const { container } = render(
      <FlexBox gap="calc(1rem + 10px)">
        <div>Test</div>
      </FlexBox>
    );

    const flexBox = container.firstChild as HTMLElement;
    expect(flexBox.style.columnGap).toBe('calc(1rem + 10px)');
  });

  test('handles multiple children correctly', () => {
    render(
      <FlexBox>
        <div>Child 1</div>
        <div>Child 2</div>
        <div>Child 3</div>
      </FlexBox>
    );

    expect(screen.getByText('Child 1')).toBeInTheDocument();
    expect(screen.getByText('Child 2')).toBeInTheDocument();
    expect(screen.getByText('Child 3')).toBeInTheDocument();
  });

  test('handles style override priority', () => {
    const { container } = render(
      <FlexBox
        direction="column"
        style={{ flexDirection: 'row', backgroundColor: 'blue' }}
      >
        <div>Test</div>
      </FlexBox>
    );

    const flexBox = container.firstChild as HTMLElement;
    // Style prop should override the direction prop
    expect(flexBox.style.flexDirection).toBe('row');
    expect(flexBox.style.backgroundColor).toBe('blue');
  });

  test('handles event propagation', async () => {
    const user = userEvent.setup();
    const mockOnClick = vi.fn();
    render(
      <FlexBox onClick={mockOnClick}>
        <button>Inner Button</button>
      </FlexBox>
    );

    const button = screen.getByText('Inner Button');
    await user.click(button);

    // Both events should fire
    expect(mockOnClick).toHaveBeenCalledOnce();
  });

  test('handles additional DOM attributes', () => {
    const { container } = render(
      <FlexBox onFocus={vi.fn()}>
        <div>Focusable Content</div>
      </FlexBox>
    );

    const flexBox = container.firstChild as HTMLElement;
    expect(flexBox.tagName).toBe('DIV');
  });
});
