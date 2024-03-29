import InstructorDashboard from "./InstructorDashboard";
import {
  SettingsPageSider,
  PersonalInformationTab,
} from "../../components/settingsPage";

const InstructorSettingsWrapper = () => {
  return (
    <InstructorDashboard>
      <SettingsPageSider />
      <PersonalInformationTab />
    </InstructorDashboard>
  );
};

export default InstructorSettingsWrapper;
