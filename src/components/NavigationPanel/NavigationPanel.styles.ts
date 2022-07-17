import { Button, Row, Col } from "antd";
import styled from "styled-components";

export const StyledRow = styled(Row)``;

export const StyledCol = styled(Col)<{ align?: string }>`
  text-align: ${(props) => props.align || "center"};
`;

export const Title = styled.span`
  font-size: 1.6rem;
`;

export const BackButton = styled(Button)``;

export const AdditionalSection = styled.span``;
