import { Col, Row, Form, Tabs, Button } from "antd";
import styled from "styled-components";
import { FormProps } from "antd/lib/form";

const { TabPane } = Tabs;

export const AccountForm: typeof Form = styled(Form)<FormProps>`
  display: block;
  width: 300px;
`;

export const StyledRow = styled(Row)`
  margin: 10px;
  align-items: normal;
`;

export const StyledCol = styled(Col)<{ align?: "left" | "center" | "right" }>`
  text-align: ${(props) => props.align || "center"};
`;

export const MainTabPane = styled(TabPane)`
  /* .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
    color: black;
    text-shadow: 0 0 0.25px currentColor;
  }

  .ant-tabs-ink-bar {
  }

  .ant-tabs-tab {
    font-size: 2rem;
  }

  font-size: 2rem;
  cursor: default; */
`;

export const StyledTabs = styled(Tabs)`
  width: 400px;
  margin-left: 80px;
  padding: 10px;
`;

export const ChangePassButton = styled(Button)`
  margin-top: 20px;
  width: 300px;
`;
