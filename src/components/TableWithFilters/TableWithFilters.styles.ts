import { Button, DatePicker, Form } from "antd";
import styled from "styled-components";
import { RegularHeader } from "../../styles/commons.styles";

export const RegularTableContainer = styled.div`
  .ant-table-selection-column {
    display: none;
  }
`;

export const TableTopPanel = styled.div`
  display: flex;
  padding-top: auto;
`;

export const NormalFormItem = styled(Form.Item)`
  width: 200px;
  padding-top: auto;
  margin-bottom: 10px;
  margin-left: 10px;

  .ant-form-item-label {
    padding: 0;
  }

  .ant-form-item-control {
    width: 200px;
  }

  .ant-form-item-control-input {
    width: 200px;
  }
`;

export const RegularButton = styled(Button).attrs({
  type: "default",
})`
  display: inline-block;
  align-self: flex-end;
  margin-bottom: 10px;
  margin-left: 10px;
`;

export const EmptySpaceToRight = styled.div`
  margin-left: auto;
`;

export const BottomHeader = styled(RegularHeader)`
  margin-bottom: 10px;
  display: inline-block;
  align-self: flex-end;
`;

export const RegularDatePicker = styled(DatePicker)`
  display: inline-block;
  align-self: flex-end;

  height: 32px;
  width: 200px;
`;
