import styled from "styled-components";
import { Button, Form, Input, Select, Typography } from "antd";
const { Title } = Typography;

export const RegularInput = styled(Input)``;

export const RegularSelect = styled(Select)`
  text-align: left;
`;

export const SubmitButton = styled(Button).attrs({
  type: "primary",
  htmlType: "submit",
})`
  float: left;
`;

export const CancelButton = styled(Button).attrs({
  type: "default",
})`
  float: right;
`;

export const RegularButton = styled(Button).attrs({
  type: "default",
})``;

export const RegularHeader = styled(Title).attrs({
  level: 4,
})<{ align?: "left" | "center" | "right" }>`
  text-align: ${(props) => props.align || "center"};
  line-height: unset !important;
`;

export const RegularFormItem = styled(Form.Item)`
  .ant-form-item-label {
    padding: 0;
  }
`;

export const SubmitFormItem = styled(Form.Item)`
  .ant-form-item-control-input-content {
    margin-top: 20px;
  }
`;
