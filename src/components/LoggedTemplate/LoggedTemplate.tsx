import { useCookies } from "react-cookie";
import * as LS from "./LoggedTemplate.styles";
import { UserOutlined, UnlockOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

interface LoggedProps {
  mainLogo: string;
  childComp?: React.ReactNode;
}

const LoggedTemplate: React.FC<LoggedProps> = (props) => {
  const { childComp, mainLogo } = props;
  const [, , removeCookie] = useCookies(["user"]);

  const onLogout = (e: any) => {
    removeCookie("user", { path: "/" });
  };

  return (
    <>
      <LS.Header>
        <Link to="/">
          <LS.LogoWithTitle>
            <LS.Logo src={mainLogo} alt="" height="80" />
            Harmonogramowanie
          </LS.LogoWithTitle>
        </Link>
        <LS.ManagementSection>
          <Link to="/konto">
            <LS.ManagementButton icon={<UserOutlined />} />
          </Link>
          <LS.ManagementButton icon={<UnlockOutlined />} onClick={onLogout} />
        </LS.ManagementSection>
      </LS.Header>
      <LS.Body>
        <LS.PageContent>{childComp}</LS.PageContent>
      </LS.Body>
    </>
  );
};

export default LoggedTemplate;
