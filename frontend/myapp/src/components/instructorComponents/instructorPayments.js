import React, { useState, useEffect, useContext } from "react";
import ReactDOM from "react-dom";
import { Line, G2 } from "@ant-design/plots";

import { each, findIndex } from "@antv/util";
import axios from "axios";
import { AppContext } from "../../AppContext";

const DemoLine = () => {
  const { username, userType } = useContext(AppContext);
  const [userName, setUserName] = username;
  const [user, setUser] = userType;
  const [january, setJan] = useState(0);
  useEffect(() => {
    axios
      .get("http://localhost:2020/getuser/" + userName + "/" + user)
      .then((response) => {
        console.log(response);
        setJan(response.data.wallet);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const { InteractionAction, registerInteraction, registerAction } = G2;
  const data = [
    {
      year: "January",
      value: 0,
    },
    {
      year: "Februeray",
      value: 0,
    },
    {
      year: "March",
      value: 0,
    },
    {
      year: "April",
      value: 0,
    },
    {
      year: "May",
      value: 0,
    },
    {
      year: "June",
      value: 0,
    },
    {
      year: "July",
      value: 0,
    },
    {
      year: "August",
      value: 0,
    },
    {
      year: "September",
      value: 0,
    },
    {
      year: "October",
      value: 0,
    },
    {
      year: "November",
      value: 0,
    },
    {
      year: "December",
      value: january,
    },
  ];
  G2.registerShape("point", "custom-point", {
    draw(cfg, container) {
      const point = {
        x: cfg.x,
        y: cfg.y,
      };
      const group = container.addGroup();
      group.addShape("circle", {
        name: "outer-point",
        attrs: {
          x: point.x,
          y: point.y,
          fill: cfg.color || "red",
          opacity: 0.5,
          r: 6,
        },
      });
      group.addShape("circle", {
        name: "inner-point",
        attrs: {
          x: point.x,
          y: point.y,
          fill: cfg.color || "red",
          opacity: 1,
          r: 2,
        },
      });
      return group;
    },
  });

  class CustomMarkerAction extends InteractionAction {
    active() {
      const view = this.getView();
      const evt = this.context.event;

      if (evt.data) {
        // items: 数组对象，当前 tooltip 显示的每条内容
        const { items } = evt.data;
        const pointGeometries = view.geometries.filter(
          (geom) => geom.type === "point"
        );
        each(pointGeometries, (pointGeometry) => {
          each(pointGeometry.elements, (pointElement, idx) => {
            const active =
              findIndex(items, (item) => item.data === pointElement.data) !==
              -1;
            const [point0, point1] = pointElement.shape.getChildren();

            if (active) {
              // outer-circle
              point0.animate(
                {
                  r: 10,
                  opacity: 0.2,
                },
                {
                  duration: 1800,
                  easing: "easeLinear",
                  repeat: true,
                }
              ); // inner-circle

              point1.animate(
                {
                  r: 6,
                  opacity: 0.4,
                },
                {
                  duration: 800,
                  easing: "easeLinear",
                  repeat: true,
                }
              );
            } else {
              this.resetElementState(pointElement);
            }
          });
        });
      }
    }

    reset() {
      const view = this.getView();
      const points = view.geometries.filter((geom) => geom.type === "point");
      each(points, (point) => {
        each(point.elements, (pointElement) => {
          this.resetElementState(pointElement);
        });
      });
    }

    resetElementState(element) {
      const [point0, point1] = element.shape.getChildren();
      point0.stopAnimate();
      point1.stopAnimate();
      const { r, opacity } = point0.get("attrs");
      point0.attr({
        r,
        opacity,
      });
      const { r: r1, opacity: opacity1 } = point1.get("attrs");
      point1.attr({
        r: r1,
        opacity: opacity1,
      });
    }

    getView() {
      return this.context.view;
    }
  }

  registerAction("custom-marker-action", CustomMarkerAction);
  registerInteraction("custom-marker-interaction", {
    start: [
      {
        trigger: "tooltip:show",
        action: "custom-marker-action:active",
      },
    ],
    end: [
      {
        trigger: "tooltip:hide",
        action: "custom-marker-action:reset",
      },
    ],
  });
  const config = {
    data,
    xField: "year",
    yField: "value",
    label: {},
    point: {
      size: 5,
      shape: "custom-point",
      style: {
        fill: "white",
        stroke: "#5B8FF9",
        lineWidth: 2,
      },
    },
    tooltip: {
      showMarkers: false,
    },
    state: {
      active: {
        style: {
          shadowBlur: 4,
          stroke: "#000",
          fill: "red",
        },
      },
    },
    interactions: [
      {
        type: "custom-marker-interaction",
      },
    ],
  };
  return <Line {...config} />;
};

export default DemoLine;
