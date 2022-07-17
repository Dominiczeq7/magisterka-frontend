import * as LS from "./NavigationPanel.styles";
import { useHistory } from "react-router-dom";
import { CaretLeftOutlined } from "@ant-design/icons";

interface NavigationPanelProps {
  title?: string;
  additional?: React.ReactNode;
}

const NavigationPanel: React.FC<NavigationPanelProps> = (props) => {
  let history = useHistory();

  const showBackButton = () => {
    return history.location.pathname !== "/" ? (
      <LS.BackButton
        icon={<CaretLeftOutlined />}
        onClick={() => history.goBack()}
      >
        Wstecz
      </LS.BackButton>
    ) : undefined;
  };

  return (
    <LS.StyledRow align="middle">
      <LS.StyledCol align="left" span={8}>
        {showBackButton()}
      </LS.StyledCol>
      <LS.StyledCol align="center" span={8}>
        <LS.Title>{props.title}</LS.Title>
      </LS.StyledCol>
      <LS.StyledCol align="right" span={8}>
        <LS.AdditionalSection>{props.additional}</LS.AdditionalSection>
      </LS.StyledCol>
    </LS.StyledRow>
  );
};

export default NavigationPanel;
