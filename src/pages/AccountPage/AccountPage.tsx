import * as CS from "../../styles/commons.styles";
import * as LS from "./AccountPage.styles";
import NavigationPanel from "../../components/NavigationPanel/NavigationPanel";
import { Form, message } from "antd";
import { useCookies } from "react-cookie";
import { loginUser, updateUser } from "../../apis/usersAPI";

const AccountPage = () => {
  const [cookies] = useCookies(["user"]);
  const [form] = Form.useForm();
  message.config({
    top: 580,
  });

  /* eslint-disable no-template-curly-in-string */
  const validateMessages = {
    required: "Pole ${label} jest wymagane!",
    types: {
      email: "${label} nie jest prawidłowy!",
      password: "${label} nie jest poprawne!",
    },
  };
  /* eslint-enable no-template-curly-in-string */

  interface IFormInput {
    email: string;
    old_password: string;
    new_password: string;
    confirm_password: string;
  }

  const onChangePassword = async (values: IFormInput) => {
    const id: number = cookies.user.id;
    const user_id = await loginUser({
      email: values.email,
      password: values.old_password,
    });

    if (id !== user_id) {
      message.error("Niepoprawne hasło");
    } else if (values.new_password === values.old_password) {
      message.error("Nowe i stare hasło muszą być różne!");
    } else if (values.new_password !== values.confirm_password) {
      message.error("Powtórz poprawnie nowe hasło!");
    } else {
      const response = await updateUser(id, { password: values.new_password });
      if (response) {
        const id_after_change = await loginUser({
          email: values.email,
          password: values.new_password,
        });
        if (id_after_change) {
          message.success("Hasło zostało zmienione");
          form.resetFields();
        } else {
          message.error("Coś poszło nie tak...");
        }
      }
    }
  };

  const userDataForm: React.ReactNode = (
    <LS.AccountForm
      name="user_data"
      initialValues={{ remember: true }}
      onFinish={() => {}}
    >
      <CS.RegularFormItem
        label="Tytuł"
        labelCol={{ span: 24 }}
        name="title"
        rules={[{}]}
      >
        <CS.RegularInput type="text" placeholder="" disabled />
      </CS.RegularFormItem>

      <CS.RegularFormItem
        label="Imię"
        labelCol={{ span: 24 }}
        name="name"
        rules={[{}]}
      >
        <CS.RegularInput
          type="text"
          placeholder=""
          disabled
          defaultValue={cookies.user.name}
        />
      </CS.RegularFormItem>

      <CS.RegularFormItem
        label="Nazwisko"
        labelCol={{ span: 24 }}
        name="surname"
        rules={[{}]}
      >
        <CS.RegularInput
          type="text"
          placeholder=""
          disabled
          defaultValue={cookies.user.surname}
        />
      </CS.RegularFormItem>

      <CS.RegularFormItem
        label="Stanowisko"
        labelCol={{ span: 24 }}
        name="position"
        rules={[{}]}
      >
        <CS.RegularInput type="text" placeholder="" disabled />
      </CS.RegularFormItem>
    </LS.AccountForm>
  );

  const loginDataForm: React.ReactNode = (
    <LS.AccountForm
      name="login_data"
      initialValues={{ remember: true }}
      onFinish={onChangePassword}
      validateMessages={validateMessages}
      form={form}
    >
      <CS.RegularFormItem
        label="Email"
        labelCol={{ span: 24 }}
        name="email"
        rules={[{ required: true }]}
        initialValue={cookies.user.email}
      >
        <CS.RegularInput
          type="email"
          placeholder=""
          disabled
          value={cookies.user.email}
        />
      </CS.RegularFormItem>

      <CS.RegularFormItem
        label="Stare hasło"
        labelCol={{ span: 24 }}
        name="old_password"
        rules={[{ required: true }]}
      >
        <CS.RegularInput type="password" placeholder="" />
      </CS.RegularFormItem>

      <CS.RegularFormItem
        label="Nowe hasło"
        labelCol={{ span: 24 }}
        name="new_password"
        rules={[{ required: true }]}
      >
        <CS.RegularInput type="password" placeholder="" />
      </CS.RegularFormItem>

      <CS.RegularFormItem
        label="Powtórz hasło"
        labelCol={{ span: 24 }}
        name="confirm_password"
        rules={[{ required: true }]}
      >
        <CS.RegularInput type="password" placeholder="" />
      </CS.RegularFormItem>

      <LS.ChangePassButton className="login-form-forgot" htmlType="submit">
        Zmień hasło
      </LS.ChangePassButton>
    </LS.AccountForm>
  );

  return (
    <>
      <NavigationPanel title="Twoje konto" />
      <LS.StyledRow align="middle">
        <LS.StyledCol span={12}>
          <LS.StyledTabs>
            <LS.MainTabPane tab="Dane osobowe">{userDataForm}</LS.MainTabPane>
          </LS.StyledTabs>
        </LS.StyledCol>
        <LS.StyledCol span={12}>
          <LS.StyledTabs>
            <LS.MainTabPane tab="Logowanie">{loginDataForm}</LS.MainTabPane>
          </LS.StyledTabs>
        </LS.StyledCol>
      </LS.StyledRow>
    </>
  );
};

export default AccountPage;
