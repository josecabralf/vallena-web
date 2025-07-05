import { Modal } from '../../../components/Modal.component';
import { describe, test, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

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
