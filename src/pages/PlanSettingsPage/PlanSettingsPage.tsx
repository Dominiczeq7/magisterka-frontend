import { Tabs } from "antd";
import NavigationPanel from "../../components/NavigationPanel/NavigationPanel";
import PlanSettingsTab from "./Tabs/PlanSettingsTab";

const { TabPane } = Tabs;

const PlanSettingsPage = () => {
  return (
    <>
      <NavigationPanel title="Ustalanie planu" />
      <Tabs defaultActiveKey="planSettings" centered>
        <TabPane tab="Ustalanie planu" key="planSettings">
          <PlanSettingsTab />
        </TabPane>
        <TabPane tab="Wersje planu" key="planVersions">
          Content of Tab Pane 2
        </TabPane>
        <TabPane tab="Bloki zajęć" key="lessonBlocks">
          Content of Tab Pane 3
        </TabPane>
        <TabPane tab="Semestry" key="semesters">
          Content of Tab Pane 4
        </TabPane>
      </Tabs>
    </>
  );
};

export default PlanSettingsPage;
