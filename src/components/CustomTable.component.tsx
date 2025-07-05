import { Row, Col, Table, type TableProps } from 'antd';
import { Button } from '.';

interface CustomTableProps<T> {
  columns: TableProps<T>['columns'];
  data: T[];
  loading: boolean;
  onNew: () => void;
  buttonTitle: string;
  emptyText?: string;
}

export const CustomTable = <T extends object>({
  columns,
  data,
  loading,
  onNew,
  buttonTitle,
  emptyText = 'No se encontraron elementos',
}: CustomTableProps<T>) => {
  return (
    <div>
      {buttonTitle !== '' && (
        <Row justify="end" style={{ marginBottom: '16px' }}>
          <Col>
            <Button onClick={onNew} title={buttonTitle} type="primary" />
          </Col>
        </Row>
      )}
      <Table<T>
        columns={columns}
        dataSource={data}
        loading={loading}
        rowKey="id"
        locale={{ emptyText }}
      />
    </div>
  );
};
