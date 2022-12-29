import { Carousel, Image } from "antd";
import { useEffect, useState } from "react";
import { RiseOutlined } from "@ant-design/icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const contentStyle = {
  height: "30vh",
  color: "#fff",
  lineHeight: "30vh",
  justifyContent: "center",
};

const Sponsors = () => {
  const navigate = useNavigate();
  const [topCourses, setTopCourses] = useState([]);

  return (
    <div
      className="divaya"
      style={{
        width: "100%",
        height: "20vh",
        gap: "20px",
      }}
    >
      <Image
        preview={false}
        alt="Al Ahly For Real Estate Development"
        title="Al Ahly For Real Estate Development"
        src="https://cancham.org.eg//upload/Canadian_Chamber_sponsors_201901_191691.png"
      />

      <Image
        preview={false}
        alt="Arab African International Bank"
        title="Arab African International Bank"
        src="https://cancham.org.eg//upload/Canadian_Chamber_sponsors_201901_65822.png"
      />
      <Image
        preview={false}
        alt="Canadian Council"
        title="Canadian Council"
        src="https://cancham.org.eg//upload/Canadian_Chamber_sponsors_201901_958411.png"
      />

      <Image
        preview={false}
        alt="SKAGGS &amp; CALDER"
        title="SKAGGS &amp; CALDER"
        src="https://cancham.org.eg//upload/Canadian_Chamber_sponsors_201901_510104.png"
      />
      <Image
        preview={false}
        alt="ENP"
        title="ENP"
        src="https://cancham.org.eg//upload/Canadian_Chamber_sponsors_201905_2845.png"
      />
      <Image
        preview={false}
        alt="WUZZUF"
        title="WUZZUF"
        src="https://cancham.org.eg//upload/Canadian_Chamber_sponsors_201907_926440.jpg"
      />
      <Image
        preview={false}
        alt="Banque Misr"
        title="Banque Misr"
        src="https://cancham.org.eg//upload/Canadian_Chamber_sponsors_201901_498915.png"
      />
      <Image
        preview={false}
        alt="National Bank Of Egypt"
        title="National Bank Of Egypt"
        src="https://cancham.org.eg//upload/Canadian_Chamber_sponsors_201901_637268.png"
      />
    </div>
  );
};

export default Sponsors;
