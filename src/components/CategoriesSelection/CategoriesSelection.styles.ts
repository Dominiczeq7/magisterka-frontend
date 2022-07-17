import { Button } from "antd";
import styled from "styled-components";

export const CategorySection = styled.div`
  text-align: center;
  margin: 50px 0px 0px 0px;
  display: flex;
  flex-wrap: wrap;
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
  margin: 30px auto;
  white-space: normal;

  :hover {
    background: #112d51 none repeat scroll 0% 0%;
    color: white;
  }
  .ant-btn {
  }
`;
