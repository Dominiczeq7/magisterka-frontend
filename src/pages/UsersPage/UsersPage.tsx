import { Tabs } from "antd";
import NavigationPanel from "../../components/NavigationPanel/NavigationPanel";
import TeachersTab from "./Tabs/TeachersTab";
import UsersTab from "./Tabs/UsersTab";

const { TabPane } = Tabs;

const UsersPage = () => {
  return (
    <>
      <NavigationPanel title="Osoby" />
      <Tabs defaultActiveKey="users" centered>
        <TabPane tab="Osoby" key="users">
          <UsersTab />
        </TabPane>
        <TabPane tab="Nauczyciele" key="teachers">
          <TeachersTab />
        </TabPane>
        <TabPane tab="Uczniowie" key="students">
          Content of Tab Pane 3
        </TabPane>
      </Tabs>
    </>
  );
};

export default UsersPage;
