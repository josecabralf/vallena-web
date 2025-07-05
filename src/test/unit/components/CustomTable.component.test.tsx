import { CustomTable } from '../../../components/CustomTable.component';
import { describe, test, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

describe('CustomTable Component', () => {
  const mockData = [
    { id: 1, name: 'Item 1', value: 100 },
    { id: 2, name: 'Item 2', value: 200 },
  ];

  const mockColumns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Value',
      dataIndex: 'value',
      key: 'value',
    },
  ];

  test('renders without crashing', () => {
    const mockOnNew = vi.fn();
    expect(() =>
      render(
        <CustomTable
          columns={mockColumns}
          data={mockData}
          loading={false}
          onNew={mockOnNew}
          buttonTitle="Add New"
        />
      )
    ).not.toThrow();
  });

  test('renders button when buttonTitle is provided', () => {
    const mockOnNew = vi.fn();
    render(
      <CustomTable
        columns={mockColumns}
        data={mockData}
        loading={false}
        onNew={mockOnNew}
        buttonTitle="Add New"
      />
    );

    expect(screen.getByText('Add New')).toBeInTheDocument();
  });

  test('does not render button when buttonTitle is empty', () => {
    const mockOnNew = vi.fn();
    render(
      <CustomTable
        columns={mockColumns}
        data={mockData}
        loading={false}
        onNew={mockOnNew}
        buttonTitle=""
      />
    );

    expect(screen.queryByText('Add New')).not.toBeInTheDocument();
  });

  test('calls onNew when button is clicked', async () => {
    const user = userEvent.setup();
    const mockOnNew = vi.fn();
    render(
      <CustomTable
        columns={mockColumns}
        data={mockData}
        loading={false}
        onNew={mockOnNew}
        buttonTitle="Add New"
      />
    );

    const button = screen.getByText('Add New');
    await user.click(button);

    expect(mockOnNew).toHaveBeenCalledOnce();
  });

  test('displays custom empty text', () => {
    const mockOnNew = vi.fn();
    const customEmptyText = 'Custom empty message';
    const { container } = render(
      <CustomTable
        columns={mockColumns}
        data={[]}
        loading={false}
        onNew={mockOnNew}
        buttonTitle="Add New"
        emptyText={customEmptyText}
      />
    );

    // Check if custom empty text is in the DOM
    expect(container.textContent).toContain(customEmptyText);
  });

  test('uses default empty text when not provided', () => {
    const mockOnNew = vi.fn();
    const { container } = render(
      <CustomTable
        columns={mockColumns}
        data={[]}
        loading={false}
        onNew={mockOnNew}
        buttonTitle="Add New"
      />
    );

    // Check if default empty text is in the DOM
    expect(container.textContent).toContain('No se encontraron elementos');
  });

  test('displays loading state', () => {
    const mockOnNew = vi.fn();
    const { container } = render(
      <CustomTable
        columns={mockColumns}
        data={mockData}
        loading={true}
        onNew={mockOnNew}
        buttonTitle="Add New"
      />
    );

    // Antd loading shows spinner
    expect(container.querySelector('.ant-spin')).toBeInTheDocument();
  });

  test('renders data in table', () => {
    const mockOnNew = vi.fn();
    render(
      <CustomTable
        columns={mockColumns}
        data={mockData}
        loading={false}
        onNew={mockOnNew}
        buttonTitle="Add New"
      />
    );

    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
    expect(screen.getByText('100')).toBeInTheDocument();
    expect(screen.getByText('200')).toBeInTheDocument();
  });
});

// Additional edge cases and coverage for CustomTable
describe('CustomTable Component - Edge Cases', () => {
  const mockData = [
    { id: 1, name: 'Item 1', value: 100 },
    { id: 2, name: 'Item 2', value: 200 },
  ];

  const mockColumns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Value',
      dataIndex: 'value',
      key: 'value',
    },
  ];

  test('handles empty data array', () => {
    const mockOnNew = vi.fn();
    render(
      <CustomTable
        columns={mockColumns}
        data={[]}
        loading={false}
        onNew={mockOnNew}
        buttonTitle="Add New"
      />
    );

    expect(screen.getByText('Add New')).toBeInTheDocument();
  });

  test('handles undefined emptyText gracefully', () => {
    const mockOnNew = vi.fn();
    const { container } = render(
      <CustomTable
        columns={mockColumns}
        data={[]}
        loading={false}
        onNew={mockOnNew}
        buttonTitle="Add New"
        emptyText={undefined}
      />
    );

    // Should use default empty text
    expect(container.textContent).toContain('No se encontraron elementos');
  });

  test('handles very long button title', () => {
    const mockOnNew = vi.fn();
    const longTitle = 'This is a very long button title that might wrap';
    render(
      <CustomTable
        columns={mockColumns}
        data={mockData}
        loading={false}
        onNew={mockOnNew}
        buttonTitle={longTitle}
      />
    );

    expect(screen.getByText(longTitle)).toBeInTheDocument();
  });

  test('handles null buttonTitle as empty string', () => {
    const mockOnNew = vi.fn();
    render(
      <CustomTable
        columns={mockColumns}
        data={mockData}
        loading={false}
        onNew={mockOnNew}
        buttonTitle=""
      />
    );

    // Should not show our custom button when buttonTitle is empty
    const buttonText = screen.queryByText('Add New');
    expect(buttonText).not.toBeInTheDocument();

    // Check that no button with "Add" text exists
    const addButtons = screen
      .queryAllByRole('button')
      .filter(button => button.textContent?.includes('Add'));
    expect(addButtons.length).toBe(0);
  });

  test('renders with complex data structure', () => {
    const complexData = [
      {
        id: 1,
        name: 'Complex Item',
        nested: { value: 42 },
        tags: ['tag1', 'tag2'],
      },
    ];
    const complexColumns = [
      { title: 'Name', dataIndex: 'name', key: 'name' },
      { title: 'Nested Value', dataIndex: ['nested', 'value'], key: 'nested' },
    ];

    const mockOnNew = vi.fn();
    render(
      <CustomTable
        columns={complexColumns}
        data={complexData}
        loading={false}
        onNew={mockOnNew}
        buttonTitle="Add Complex"
      />
    );

    expect(screen.getByText('Complex Item')).toBeInTheDocument();
  });
});
