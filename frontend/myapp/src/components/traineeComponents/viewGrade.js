import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Table } from "antd";
import { AppContext } from "../../AppContext";
import TraineeDashboard from "./TraineeDashboard";
const { Column, ColumnGroup } = Table;

const ViewGradeWrapper = () => {
  const [data, setData] = useState([]);
  const { userType, userMongoId } = useContext(AppContext);

  const [user] = userType;
  const [userId] = userMongoId;

  useEffect(() => {
    axios
      .get("http://localhost:2020/getmygrade/" + userId + "/" + user)
      .then((response) => {
        let dataz = [];
        console.log("main -> ", Object.entries(response.data.grades));
        Object.entries(response.data.grades).map((item) => {
          console.log("item ", item[1]);
          dataz.push(item[1]);
        });
        setData(dataz);
        console.log("data ", data);
      })
      .catch((error) => {
        console.log("erorr", error.message);
      });
  }, []);

  return (
    <TraineeDashboard pageName="Previous Grades">
      <Table
        dataSource={data}
        key={data.subject}
        pagination={{
          onChange: (page) => {
            console.log(page);
            window.scrollTo(0, 0);
          },
          pageSize: 6,
        }}
      >
        <ColumnGroup>
          <Column title="Subject" dataIndex="subject" key="subject" />
        </ColumnGroup>
        <ColumnGroup>
          <Column title="Grade" dataIndex="grade" key="grade" />
        </ColumnGroup>
      </Table>
    </TraineeDashboard>
  );
};

export default ViewGradeWrapper;
