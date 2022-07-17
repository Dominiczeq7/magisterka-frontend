import { Button, Col, Form, FormProps, Row } from "antd";
import styled from "styled-components";

export const ActionPanel = styled.div`
  height: 32px;
  text-align: right;
`;

export const ActionButton = styled(Button).attrs({
  type: "primary",
})`
  margin-left: 10px;
`;

export const GridFormRow = styled(Row)`
  padding: 10px 0px;
`;

export const GridCol = styled(Col).attrs({
  span: 12,
})`
  text-align: center;
`;

export const FormCol = styled(Col).attrs({
  span: 12,
})`
  text-align: center;
`;

export const SelectableTableContainer = styled.div`
  .ant-table-selection-column {
    display: none;
  }
`;

export const TableTopPanel = styled(Row)`
  height: 32px;
  margin-bottom: 10px;
`;

export const TableTitle = styled(Col).attrs({
  span: 12,
})``;

export const TableButtons = styled(Col).attrs({
  span: 12,
})`
  text-align: right;
`;

export const RegularForm: typeof Form = styled(Form)<FormProps>`
  display: block;
  margin-right: auto;
  margin-left: auto;
  width: 300px;
  padding: 10px;
`;
