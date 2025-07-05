import { Icon } from '../../../components/Icon.component';
import { describe, test, expect } from 'vitest';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

// Additional edge cases for Icon Component
describe('Icon Component - Edge Cases', () => {
  test('handles size of 0', () => {
    const { container } = render(<Icon name="user" size={0} />);

    const iconElement = container.querySelector('.anticon') as HTMLElement;
    expect(iconElement?.style.fontSize).toBe('0px');
  });

  test('handles very large size', () => {
    const { container } = render(<Icon name="user" size={1000} />);

    const iconElement = container.querySelector('.anticon') as HTMLElement;
    expect(iconElement?.style.fontSize).toBe('1000px');
  });

  test('handles empty string color', () => {
    const { container } = render(<Icon name="user" color="" />);

    const iconElement = container.querySelector('.anticon') as HTMLElement;
    expect(iconElement?.style.color).toBe('');
  });

  test('handles hex color values', () => {
    const { container } = render(<Icon name="user" color="#ff5733" />);

    const iconElement = container.querySelector('.anticon') as HTMLElement;
    // Browsers normalize hex colors to rgb format
    expect(iconElement?.style.color).toBe('rgb(255, 87, 51)');
  });

  test('handles CSS variable colors', () => {
    const { container } = render(
      <Icon name="user" color="var(--primary-color)" />
    );

    const iconElement = container.querySelector('.anticon') as HTMLElement;
    expect(iconElement?.style.color).toBe('var(--primary-color)');
  });

  test('handles multiple className values', () => {
    const { container } = render(
      <Icon name="user" className="icon-class another-class" />
    );

    const iconElement = container.querySelector('.anticon');
    expect(iconElement).toHaveClass('icon-class');
    expect(iconElement).toHaveClass('another-class');
  });

  test('renders consistently across multiple renders', () => {
    const { container: container1 } = render(<Icon name="user" />);
    const { container: container2 } = render(<Icon name="user" />);

    const icon1 = container1.querySelector('.anticon');
    const icon2 = container2.querySelector('.anticon');

    expect(icon1).toBeInTheDocument();
    expect(icon2).toBeInTheDocument();
    expect(icon1?.tagName).toBe(icon2?.tagName);
  });

  test('handles all available icon types from registry', () => {
    const iconNames = [
      'home',
      'user',
      'setting',
      'infoCircle',
      'eyeInvisible',
      'lock',
      'eyeTwoTone',
      'beer',
      'heart',
      'rocket',
    ] as const;

    iconNames.forEach(iconName => {
      const { container } = render(<Icon name={iconName} />);
      const iconElement = container.querySelector('.anticon, svg');
      expect(iconElement).toBeInTheDocument();
    });
  });

  test('error state is consistently rendered', () => {
    // @ts-expect-error Testing invalid icon name
    const { container: container1 } = render(<Icon name="invalid-1" />);
    // @ts-expect-error Testing invalid icon name
    const { container: container2 } = render(<Icon name="invalid-2" />);

    expect(container1.textContent).toContain('⚠️ Icono no encontrado');
    expect(container2.textContent).toContain('⚠️ Icono no encontrado');
  });
});
