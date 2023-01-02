import { Button } from "antd";
import { useContext } from "react";
import { AppContext } from "../../AppContext";

const RequestRefund = () => {
  const [username, userType] = useContext(AppContext);
  const [userName, setUserName] = username;
  const [user, setUser] = userType;

  return <Button>Request Refund</Button>;
};

export default RequestRefund;
