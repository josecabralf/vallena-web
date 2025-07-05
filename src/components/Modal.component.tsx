import React, { type CSSProperties } from 'react';
import { Modal as AntModal, Button, Tabs } from 'antd';

export interface Props {
  close: (params?: unknown) => void;
  show: boolean;
  children?: React.ReactNode;
  width?: string | number;
  title?: string | React.ReactNode;
  onOk?: (...params: unknown[]) => unknown;
  tabs?: {
    key: string;
    label: string;
    children: React.ReactNode;
    disabled?: boolean;
  }[];
  defaultActiveTabKey?: string;
  styles?: CSSProperties;
  submit?: {
    call: (...params: unknown[]) => unknown;
    title: string;
  };
  activeKey?: string;
  onTabChange?: (key: string) => void;
}

export const Modal: React.FunctionComponent<Props> = (props: Props) => {
  return (
    <AntModal
      style={{ ...props.styles }}
      title={props.title}
      destroyOnClose={true}
      onOk={props.onOk}
      onCancel={props.close}
      open={props.show}
      width={props.width || 'fit-content'}
      footer={
        props.submit ? (
          <Button key="submit" type="primary" onClick={props.submit?.call}>
            {props.submit?.title}
          </Button>
        ) : null
      }
    >
      {props.tabs ? (
        <Tabs
          defaultActiveKey={props.defaultActiveTabKey}
          activeKey={props.activeKey}
          onChange={props.onTabChange}
          items={props.tabs}
        />
      ) : (
        props.children
      )}
    </AntModal>
  );
};
