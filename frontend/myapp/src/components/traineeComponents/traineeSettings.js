import TraineeDashboard from "./TraineeDashboard";
import {
  SettingsPageSider,
  PersonalInformationTab,
} from "../../components/settingsPage";

const TraineeSettingsWrapper = () => {
  return (
    <TraineeDashboard pageName="Settings">
      <SettingsPageSider />
      <PersonalInformationTab />
    </TraineeDashboard>
  );
};

export default TraineeSettingsWrapper;
