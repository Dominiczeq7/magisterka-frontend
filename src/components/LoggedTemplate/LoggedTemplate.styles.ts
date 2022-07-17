import { Button } from "antd";
import styled from "styled-components";

export const Body = styled.div`
  margin: 10px 10%;
`;

export const Header = styled.div`
  margin: 10px 10%;
  height: 100px;
`;

export const LogoWithTitle = styled.a`
  font-size: 2.5rem;
  word-wrap: break-word;
  color: #112d51;
  text-decoration: underline;
  text-decoration-color: #0572bc;

  :hover {
    text-decoration: underline;
  }
`;

export const Logo = styled.img`
  padding-right: 50px;
  vertical-align: middle;
  margin-left: 10px;
`;

export const Title = styled.div`
  font-size: 2rem;
  text-align: center;
  margin: 10px;
  height: 40px;
  color: #112d51;
`;

export const ManagementSection = styled.span`
  display: flex;
  padding-top: 20px;
  height: 80px;
  float: right;
`;

export const ManagementButton = styled(Button).attrs({
  shape: "circle",
})`
  text-align: center;
  vertical-align: middle;
  align-items: right;
  margin-right: 10px;

  background: #0070bb none repeat scroll 0% 0%;
  color: white;

  :hover {
    background: #112d51 none repeat scroll 0% 0%;
    color: white;
  }
`;

export const PageContent = styled.div`
  padding-left: 10px;
  padding-right: 10px;
`;

export const CategorySection = styled.div`
  text-align: center;
  margin: 0px;
`;

export const CategoryButton = styled(Button).attrs({
  type: "primary",
  shape: "round",
  block: true,
})`
  font-size: 2em;
  text-align: center;
  width: 250px;
  height: 300px;
  margin: 30px;

  white-space: normal;

  :hover {
    background: #112d51 none repeat scroll 0% 0%;
    color: white;
  }
  .ant-btn {
  }
`;

export const ActionPanel = styled.div`
  margin: 10px;
  height: 40px;
`;
