import TraineeDashboard from "../../pages/TraineeDashboard";
import {
  SettingsPageSider,
  PersonalInformationTab,
} from "../../components/settingsPage";

const TraineeSettingsWrapper = () => {
  return (
    <TraineeDashboard>
      <SettingsPageSider />
      <PersonalInformationTab />
    </TraineeDashboard>
  );
};

export default TraineeSettingsWrapper;