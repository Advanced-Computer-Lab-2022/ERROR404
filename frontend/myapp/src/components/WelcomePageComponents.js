import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { WordCloud } from "@ant-design/plots";
const data = [
  {
    value: 9,
    name: "Datascience",
  },
  {
    value: 8,
    name: "Bloackchain",
  },
  {
    value: 8,
    name: "Solidity",
  },
  {
    value: 8,
    name: "G6",
  },
  {
    value: 8,
    name: "DataSet",
  },
  {
    value: 8,
    name: "Math",
  },
  {
    value: 6,
    name: "Analysis",
  },
  {
    value: 6,
    name: "Data Mining",
  },
  {
    value: 6,
    name: "Data Vis",
  },
  {
    value: 6,
    name: "Design",
  },
  {
    value: 6,
    name: "Grammar",
  },
  {
    value: 6,
    name: "Graphics",
  },
  {
    value: 6,
    name: "Graph",
  },
  {
    value: 6,
    name: "Hierarchy",
  },
  {
    value: 6,
    name: "Labeling",
  },
  {
    value: 6,
    name: "Layout",
  },
  {
    value: 6,
    name: "Quantitative",
  },
  {
    value: 6,
    name: "Relation",
  },
  {
    value: 6,
    name: "Statistics",
  },
  {
    value: 6,
    name: "可视化",
  },
  {
    value: 6,
    name: "数据",
  },
  {
    value: 6,
    name: "Art",
  },
  {
    value: 4,
    name: "Arc Diagram",
  },
  {
    value: 4,
    name: "Bar Chart",
  },
  {
    value: 4,
    name: "Canvas",
  },
  {
    value: 4,
    name: "Chart",
  },
  {
    value: 4,
    name: "DAG",
  },
  {
    value: 4,
    name: "DG",
  },
  {
    value: 4,
    name: "Facet",
  },
  {
    value: 4,
    name: "Geo",
  },
  {
    value: 4,
    name: "Line",
  },
  {
    value: 4,
    name: "MindMap",
  },
  {
    value: 4,
    name: "Pie",
  },
  {
    value: 4,
    name: "Pizza Chart",
  },
  {
    value: 4,
    name: "Punch Card",
  },
  {
    value: 4,
    name: "SVG",
  },
  {
    value: 4,
    name: "Sunburst",
  },
  {
    value: 4,
    name: "Tree",
  },
  {
    value: 4,
    name: "UML",
  },
  {
    value: 3,
    name: "Chart",
  },
  {
    value: 3,
    name: "View",
  },
  {
    value: 3,
    name: "Geom",
  },
  {
    value: 3,
    name: "Shape",
  },
  {
    value: 3,
    name: "Scale",
  },
  {
    value: 3,
    name: "Animate",
  },
  {
    value: 3,
    name: "Global",
  },
  {
    value: 3,
    name: "Slider",
  },
  {
    value: 3,
    name: "Connector",
  },
  {
    value: 3,
    name: "Transform",
  },
  {
    value: 3,
    name: "Util",
  },
  {
    value: 3,
    name: "DomUtil",
  },
  {
    value: 3,
    name: "MatrixUtil",
  },
  {
    value: 3,
    name: "PathUtil",
  },
  {
    value: 3,
    name: "G",
  },
  {
    value: 3,
    name: "2D",
  },
  {
    value: 3,
    name: "3D",
  },
  {
    value: 3,
    name: "Line",
  },
  {
    value: 3,
    name: "Area",
  },
  {
    value: 3,
    name: "Interval",
  },
  {
    value: 3,
    name: "Schema",
  },
  {
    value: 3,
    name: "Edge",
  },
  {
    value: 3,
    name: "Polygon",
  },
  {
    value: 3,
    name: "Heatmap",
  },
  {
    value: 3,
    name: "Render",
  },
  {
    value: 3,
    name: "Tooltip",
  },
  {
    value: 3,
    name: "Axis",
  },
  {
    value: 3,
    name: "Guide",
  },
  {
    value: 3,
    name: "Coord",
  },
  {
    value: 3,
    name: "Legend",
  },
  {
    value: 3,
    name: "Path",
  },
  {
    value: 3,
    name: "Helix",
  },
  {
    value: 3,
    name: "Theta",
  },
  {
    value: 3,
    name: "Rect",
  },
  {
    value: 3,
    name: "Polar",
  },
  {
    value: 3,
    name: "Dsv",
  },
  {
    value: 3,
    name: "Csv",
  },
  {
    value: 3,
    name: "Tsv",
  },
  {
    value: 3,
    name: "GeoJSON",
  },
  {
    value: 3,
    name: "TopoJSON",
  },
  {
    value: 3,
    name: "Filter",
  },
  {
    value: 3,
    name: "Map",
  },
  {
    value: 3,
    name: "Pick",
  },
  {
    value: 3,
    name: "Rename",
  },
  {
    value: 3,
    name: "Filter",
  },
  {
    value: 3,
    name: "Map",
  },
  {
    value: 3,
    name: "Pick",
  },
  {
    value: 3,
    name: "Rename",
  },
  {
    value: 3,
    name: "Reverse",
  },
  {
    value: 3,
    name: "sort",
  },
  {
    value: 3,
    name: "Subset",
  },
  {
    value: 3,
    name: "Partition",
  },
  {
    value: 3,
    name: "Imputation",
  },
  {
    value: 3,
    name: "Fold",
  },
  {
    value: 3,
    name: "Aggregate",
  },
  {
    value: 3,
    name: "Proportion",
  },
  {
    value: 3,
    name: "Histogram",
  },
  {
    value: 3,
    name: "Quantile",
  },
  {
    value: 3,
    name: "Treemap",
  },
  {
    value: 3,
    name: "Hexagon",
  },
  {
    value: 3,
    name: "Binning",
  },
  {
    value: 3,
    name: "kernel",
  },
  {
    value: 3,
    name: "Regression",
  },
  {
    value: 3,
    name: "Density",
  },
  {
    value: 3,
    name: "Sankey",
  },
  {
    value: 3,
    name: "Voronoi",
  },
  {
    value: 3,
    name: "Projection",
  },
  {
    value: 3,
    name: "Centroid",
  },
  {
    value: 3,
    name: "H5",
  },
  {
    value: 3,
    name: "Mobile",
  },
  {
    value: 3,
    name: "K线图",
  },
  {
    value: 3,
    name: "关系图",
  },
  {
    value: 3,
    name: "烛形图",
  },
  {
    value: 3,
    name: "股票图",
  },
  {
    value: 3,
    name: "SQL",
  },
  {
    value: 3,
    name: "Database",
  },
  {
    value: 3,
    name: "分面",
  },
  {
    value: 3,
    name: "Design",
  },
  {
    value: 3,
    name: "Data",
  },
  {
    value: 3,
    name: "Data Structure",
  },
  {
    value: 3,
    name: "Algorithm",
  },
  {
    value: 3,
    name: "Design Patterns",
  },
  {
    value: 3,
    name: "Design Patterns",
  },
  {
    value: 3,
    name: "柱状图",
  },
  {
    value: 3,
    name: "仪表盘",
  },
  {
    value: 3,
    name: "气泡图",
  },
  {
    value: 3,
    name: "漏斗图",
  },
  {
    value: 3,
    name: "热力图",
  },
  {
    value: 3,
    name: "玉玦图",
  },
  {
    value: 3,
    name: "直方图",
  },
  {
    value: 3,
    name: "矩形树图",
  },
  {
    value: 3,
    name: "箱形图",
  },
  {
    value: 3,
    name: "色块图",
  },
  {
    value: 3,
    name: "螺旋图",
  },
  {
    value: 3,
    name: "词云",
  },
  {
    value: 3,
    name: "词云图",
  },
  {
    value: 3,
    name: "雷达图",
  },
  {
    value: 3,
    name: "Design Patterns",
  },
  {
    value: 3,
    name: "Design Patterns",
  },
  {
    value: 3,
    name: "English",
  },
  {
    value: 3,
    name: "Ein",
  },
  {
    value: 3,
    name: "Cryptography",
  },
  {
    value: 3,
    name: "Jacques Bertin",
  },
  {
    value: 3,
    name: "Leland Wilkinson",
  },
  {
    value: 3,
    name: "William Playfair",
  },
  {
    value: 3,
    name: "关联",
  },
  {
    value: 3,
    name: "Crypto",
  },
  {
    value: 3,
    name: "Bitcoin",
  },
  {
    value: 3,
    name: "占比",
  },
  {
    value: 3,
    name: "Web Development",
  },
  {
    value: 3,
    name: "Gaming",
  },
  {
    value: 3,
    name: "比较",
  },
  {
    value: 3,
    name: "流程",
  },
  {
    value: 3,
    name: "趋势",
  },
  {
    value: 2,
    name: "Civil",
  },
  {
    value: 2,
    name: "Design",
  },
  {
    value: 2,
    name: "完白",
  },
  {
    value: 2,
    name: "巴思",
  },
  {
    value: 2,
    name: "张初尘",
  },
  {
    value: 2,
    name: "御术",
  },
  {
    value: 2,
    name: "有田",
  },
  {
    value: 2,
    name: "沉鱼",
  },
  {
    value: 2,
    name: "玉伯",
  },
  {
    value: 2,
    name: "画康",
  },
  {
    value: 2,
    name: "祯逸",
  },
  {
    value: 2,
    name: "绝云",
  },
  {
    value: 2,
    name: "罗宪",
  },
  {
    value: 2,
    name: "萧庆",
  },
  {
    value: 2,
    name: "Javascript",
  },
  {
    value: 2,
    name: "陆沉",
  },
  {
    value: 2,
    name: "JAVA",
  },
  {
    value: 2,
    name: "Domo",
  },
  {
    value: 2,
    name: "GPL",
  },
  {
    value: 2,
    name: "PAI",
  },
  {
    value: 2,
    name: "SPSS",
  },
  {
    value: 2,
    name: "SYSTAT",
  },
  {
    value: 2,
    name: "Tableau",
  },
  {
    value: 2,
    name: "D3",
  },
  {
    value: 2,
    name: "Vega",
  },
  {
    value: 2,
    name: "VGA",
  },
];
const DemoWordCloud = () => {
  const config = {
    data,

    wordField: "name",
    weightField: "value",
    colorField: "name",
    imageMask:
      "data:image/png;base64,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",
    wordStyle: {
      fontFamily: "Verdana",
      fontSize: [8, 32],
    },
  };

  return (
    <WordCloud
      autoFit
      style={{
        width: "100%",
      }}
      {...config}
    />
  );
};

export default DemoWordCloud;
