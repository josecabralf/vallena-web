import { describe, test, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import { Modal } from '../../components/Modal.component';
import { PageWrapper } from '../../components/PageWrapper.component';

describe('Modal Component', () => {
  test('renders without crashing', () => {
    const mockClose = vi.fn();
    expect(() =>
      render(<Modal close={mockClose} show={true} title="Test Modal" />)
    ).not.toThrow();
  });

  test('renders when show is true', () => {
    const mockClose = vi.fn();
    render(<Modal close={mockClose} show={true} title="Test Modal" />);

    expect(screen.getByText('Test Modal')).toBeInTheDocument();
  });

  test('does not render when show is false', () => {
    const mockClose = vi.fn();
    render(<Modal close={mockClose} show={false} title="Test Modal" />);

    expect(screen.queryByText('Test Modal')).not.toBeInTheDocument();
  });

  test('renders children content', () => {
    const mockClose = vi.fn();
    render(
      <Modal close={mockClose} show={true} title="Test Modal">
        <div>Modal Content</div>
      </Modal>
    );

    expect(screen.getByText('Modal Content')).toBeInTheDocument();
  });

  test('renders submit button when submit prop is provided', () => {
    const mockClose = vi.fn();
    const mockSubmit = vi.fn();
    render(
      <Modal
        close={mockClose}
        show={true}
        title="Test Modal"
        submit={{ call: mockSubmit, title: 'Submit' }}
      />
    );

    expect(screen.getByText('Submit')).toBeInTheDocument();
  });

  test('calls submit function when submit button is clicked', async () => {
    const user = userEvent.setup();
    const mockClose = vi.fn();
    const mockSubmit = vi.fn();
    render(
      <Modal
        close={mockClose}
        show={true}
        title="Test Modal"
        submit={{ call: mockSubmit, title: 'Submit' }}
      />
    );

    const submitButton = screen.getByText('Submit');
    await user.click(submitButton);

    expect(mockSubmit).toHaveBeenCalledOnce();
  });

  test('renders tabs when tabs prop is provided', () => {
    const mockClose = vi.fn();
    const tabs = [
      {
        key: 'tab1',
        label: 'Tab 1',
        children: <div>Tab 1 Content</div>,
      },
      {
        key: 'tab2',
        label: 'Tab 2',
        children: <div>Tab 2 Content</div>,
      },
    ];

    render(
      <Modal close={mockClose} show={true} title="Test Modal" tabs={tabs} />
    );

    expect(screen.getByText('Tab 1')).toBeInTheDocument();
    expect(screen.getByText('Tab 2')).toBeInTheDocument();
    expect(screen.getByText('Tab 1 Content')).toBeInTheDocument();
  });

  test('handles tab change', async () => {
    const user = userEvent.setup();
    const mockClose = vi.fn();
    const mockTabChange = vi.fn();
    const tabs = [
      {
        key: 'tab1',
        label: 'Tab 1',
        children: <div>Tab 1 Content</div>,
      },
      {
        key: 'tab2',
        label: 'Tab 2',
        children: <div>Tab 2 Content</div>,
      },
    ];

    render(
      <Modal
        close={mockClose}
        show={true}
        title="Test Modal"
        tabs={tabs}
        onTabChange={mockTabChange}
      />
    );

    const tab2 = screen.getByText('Tab 2');
    await user.click(tab2);

    expect(mockTabChange).toHaveBeenCalledWith('tab2');
  });

  test('renders disabled tab', () => {
    const mockClose = vi.fn();
    const tabs = [
      {
        key: 'tab1',
        label: 'Tab 1',
        children: <div>Tab 1 Content</div>,
      },
      {
        key: 'tab2',
        label: 'Tab 2',
        children: <div>Tab 2 Content</div>,
        disabled: true,
      },
    ];

    render(
      <Modal close={mockClose} show={true} title="Test Modal" tabs={tabs} />
    );

    const tab2 = screen.getByText('Tab 2');
    expect(tab2.closest('.ant-tabs-tab')).toHaveClass('ant-tabs-tab-disabled');
  });

  test('renders with active tab key', () => {
    const mockClose = vi.fn();
    const tabs = [
      {
        key: 'tab1',
        label: 'Tab 1',
        children: <div>Tab 1 Content</div>,
      },
      {
        key: 'tab2',
        label: 'Tab 2',
        children: <div>Tab 2 Content</div>,
      },
    ];

    render(
      <Modal
        close={mockClose}
        show={true}
        title="Test Modal"
        tabs={tabs}
        activeKey="tab2"
      />
    );

    expect(screen.getByText('Tab 2 Content')).toBeInTheDocument();
  });

  test('renders with default active tab key', () => {
    const mockClose = vi.fn();
    const tabs = [
      {
        key: 'tab1',
        label: 'Tab 1',
        children: <div>Tab 1 Content</div>,
      },
      {
        key: 'tab2',
        label: 'Tab 2',
        children: <div>Tab 2 Content</div>,
      },
    ];

    render(
      <Modal
        close={mockClose}
        show={true}
        title="Test Modal"
        tabs={tabs}
        defaultActiveTabKey="tab2"
      />
    );

    expect(screen.getByText('Tab 2 Content')).toBeInTheDocument();
  });
});

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
