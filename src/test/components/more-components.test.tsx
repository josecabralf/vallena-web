import { describe, test, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { CustomTable } from '../../components/CustomTable.component';
import { FlexBox } from '../../components/FlexBox.component';
import { Icon } from '../../components/Icon.component';

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
