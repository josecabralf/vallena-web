import { Spinner } from '../../../components/Spinner.component';
import { render } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import '@testing-library/jest-dom';

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
