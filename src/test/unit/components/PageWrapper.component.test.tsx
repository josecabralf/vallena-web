import { PageWrapper } from '../../../components/PageWrapper.component';
import { describe, test, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';

// Mock useLocation for PageWrapper tests
const mockLocation = {
  pathname: '/dashboard',
  search: '',
  hash: '',
  state: null,
  key: '',
};

vi.mock('react-router-dom', () => ({
  ...vi.importActual('react-router-dom'),
  useLocation: () => mockLocation,
  BrowserRouter: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

describe('PageWrapper Component', () => {
  test('renders without crashing', () => {
    expect(() =>
      render(
        <BrowserRouter>
          <PageWrapper>
            <div>Content</div>
          </PageWrapper>
        </BrowserRouter>
      )
    ).not.toThrow();
  });

  test('renders children content', () => {
    render(
      <BrowserRouter>
        <PageWrapper>
          <div>Page Content</div>
        </PageWrapper>
      </BrowserRouter>
    );

    expect(screen.getByText('Page Content')).toBeInTheDocument();
  });

  test('renders breadcrumb for dashboard', () => {
    mockLocation.pathname = '/dashboard';
    render(
      <BrowserRouter>
        <PageWrapper>
          <div>Content</div>
        </PageWrapper>
      </BrowserRouter>
    );

    expect(screen.getByText('Tablero')).toBeInTheDocument();
  });

  test('renders breadcrumb for cash-register', () => {
    mockLocation.pathname = '/cash-register';
    render(
      <BrowserRouter>
        <PageWrapper>
          <div>Content</div>
        </PageWrapper>
      </BrowserRouter>
    );

    expect(screen.getByText('Caja')).toBeInTheDocument();
  });

  test('renders breadcrumb for config', () => {
    mockLocation.pathname = '/config';
    render(
      <BrowserRouter>
        <PageWrapper>
          <div>Content</div>
        </PageWrapper>
      </BrowserRouter>
    );

    expect(screen.getByText('CONFIGURACIÓN')).toBeInTheDocument();
  });

  test('handles unknown paths gracefully', () => {
    mockLocation.pathname = '/unknown/path';
    render(
      <BrowserRouter>
        <PageWrapper>
          <div>Content</div>
        </PageWrapper>
      </BrowserRouter>
    );

    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  test('renders empty breadcrumb for root path', () => {
    mockLocation.pathname = '/';
    const { container } = render(
      <BrowserRouter>
        <PageWrapper>
          <div>Content</div>
        </PageWrapper>
      </BrowserRouter>
    );

    // Should still render breadcrumb component even if empty
    expect(container.querySelector('.ant-breadcrumb')).toBeInTheDocument();
  });

  test('handles nested unknown paths', () => {
    mockLocation.pathname = '/some/unknown/nested/path';
    render(
      <BrowserRouter>
        <PageWrapper>
          <div>Content</div>
        </PageWrapper>
      </BrowserRouter>
    );

    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  test('does not duplicate parent breadcrumb items', () => {
    mockLocation.pathname = '/config/users';
    const { container } = render(
      <BrowserRouter>
        <PageWrapper>
          <div>Content</div>
        </PageWrapper>
      </BrowserRouter>
    );

    const breadcrumbItems = container.querySelectorAll('.ant-breadcrumb-link');
    const configItems = Array.from(breadcrumbItems).filter(item =>
      item.textContent?.includes('CONFIGURACIÓN')
    );
    expect(configItems).toHaveLength(1);
  });
});
