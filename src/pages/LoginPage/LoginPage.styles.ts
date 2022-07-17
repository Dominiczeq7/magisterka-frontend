import { Button, Form } from "antd";
import styled from "styled-components";
import { FormProps } from "antd/lib/form";

export const LoginForm: typeof Form = styled(Form)<FormProps>`
  display: block;
  margin-right: auto;
  margin-left: auto;
  width: 300px;
  padding: 20px;
`;

export const Body = styled.div`
  padding: 50px;
`;

export const Header = styled.div`
  margin-top: 50px;
  text-align: center;
  font-size: 3.5rem;
  word-wrap: break-word;
  color: #112d51;
  text-decoration: underline;
  text-decoration-color: #0572bc;
`;

export const Logo = styled.img`
  padding-left: 50px;
  padding-right: 50px;
  vertical-align: middle;
`;

export const Title = styled.div`
  font-size: 2em;
  text-align: center;
  margin: 30px;
`;

export const ForgotPassButton = styled(Button)`
  float: right;
`;
