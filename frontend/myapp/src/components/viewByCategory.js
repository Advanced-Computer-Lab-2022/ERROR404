import { Col, Row } from "antd";
import "../App.css";

const Categories = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: "5px",
        backgroundColor: "red",
        borderRadius: "20px",
      }}
    >
      <div className="category"></div>
      <span>Data Science</span>
    </div>
  );
};

export default Categories;
