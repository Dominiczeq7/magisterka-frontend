import { message, Input, Button } from "antd";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { getUser, getUsers, loginUser } from "../../apis/usersAPI";
import * as LS from "./LoginPage.styles";
import * as CS from "../../styles/commons.styles";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

interface IFormInput {
  email: string;
  password: string;
}
interface LoginProps {
  mainLogo: string;
}

const LoginPage: React.FC<LoginProps> = (props) => {
  const { mainLogo } = props;
  const [, setCookie] = useCookies(["user"]);
  const [emailField, setEmailField] = useState<string>();
  message.config({
    top: 580,
  });

  const onSubmit = async (values: IFormInput) => {
    const id = await loginUser(values);

    if ((await id) ? true : false) {
      const user = await getUser(id);
      setCookie("user", user, { path: "/" });
    } else {
      message.error("Email lub hasło nie są poprawne.");
    }
  };

  const onRecoverPassword = async () => {
    const users = getUsers();
    const user = (await users)?.filter((o) => {
      return o.email === emailField;
    })[0];
    if (user) {
      message.success("Wysłano email z nowym hasłem.");
    } else {
      message.error("W bazie nie ma takiego adresu email.");
    }
  };

  const onChangeEmailField = (e: any) => {
    setEmailField(e.target.value);
  };

  useEffect(() => {}, []);

  /* eslint-disable no-template-curly-in-string */
  const validateMessages = {
    required: "Pole ${label} jest wymagane!",
    types: {
      email: "${label} nie jest prawidłowy!",
      password: "${label} nie jest poprawne!",
    },
  };
  /* eslint-enable no-template-curly-in-string */

  return (
    <>
      <LS.Header>
        <LS.Logo src={mainLogo} alt="" height="100" />
        Harmonogramowanie
      </LS.Header>
      <LS.Body>
        <LS.Title>Logowanie</LS.Title>

        <LS.LoginForm
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onSubmit}
          validateMessages={validateMessages}
        >
          <CS.RegularFormItem
            label="Email"
            labelCol={{ span: 24 }}
            name="email"
            rules={[{ required: true }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              type="email"
              placeholder=""
              onChange={onChangeEmailField}
            />
          </CS.RegularFormItem>
          <CS.RegularFormItem
            label="Hasło"
            labelCol={{ span: 24 }}
            name="password"
            rules={[{ required: true }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder=""
            />
          </CS.RegularFormItem>

          <CS.SubmitFormItem>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Zaloguj
            </Button>
            <LS.ForgotPassButton
              className="login-form-forgot"
              onClick={onRecoverPassword}
            >
              Odzyskaj hasło
            </LS.ForgotPassButton>
          </CS.SubmitFormItem>
        </LS.LoginForm>
      </LS.Body>
    </>
  );
};

export default LoginPage;
