/**
 * Author: Meng
 * Date: 2023-08-31
 * Modify: 2023-08-31
 * Desc:
 */

import React, { useEffect, useState, useRef } from "react";
import * as echarts from "echarts";

import logoIcon from "../../../assets/icon/logo.png";

import "./index.css";

function IndexPage(props) {
  const chartRef = useRef(null);
  const chartRef2 = useRef(null);
  const chartRef3 = useRef(null);
  const chartRef4 = useRef(null);
  const [topItems, setTopItems] = useState([
    { text: "今日访问量", icon: logoIcon, num: 102 },
    { text: "检测次数", icon: logoIcon, num: 102 },
    { text: "检测项目数", icon: logoIcon, num: 102 },
    { text: "故障次数", icon: logoIcon, num: 102 },
  ]);

  useEffect(() => {
    bindChart();
    bindChart2();
    bindChart3();
    bindChart4();

    function resizeChart() {
      // 更新布局
      chartRef.current.resize();
      chartRef2.current.resize();
      chartRef3.current.resize();
      chartRef4.current.resize();
    }
    window.addEventListener("resize", resizeChart);
    return () => {
      window.removeEventListener("resize", resizeChart);
    };
  }, []);

  function bindChart() {
    const chartDom = document.getElementById("project-chart");
    const myChart = echarts.init(chartDom);
    chartRef.current = myChart;
    const option = {
      title: {
        text: "检测项目",
      },
      tooltip: {
        trigger: "item",
      },
      legend: {
        orient: "vertical",
        left: "right",
      },
      series: [
        {
          type: "pie",
          radius: "90%",
          labelLine: {
            show: false
          },
          label: {
            show: false
          },
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
          data: [
            { value: 1048, name: "脉搏" },
            { value: 735, name: "面相" },
            { value: 580, name: "中医" },
          ],
          
        },
      ],
    };
    myChart.setOption(option);
  }

  function bindChart2() {
    const chartDom = document.getElementById("project-chart2");
    const myChart = echarts.init(chartDom);
    chartRef2.current = myChart;
    // 绘制图表
    myChart.setOption({
      title: {
        text: "设备访问量",
      },
      tooltip: {},
      xAxis: {
        data: ["小豹", "小蜜", "小兰", "小紫", "小花", "小白", "小绿", "小黄", "小红", "小蓝", "小黑", "小灰", "小粉"],
      },
      yAxis: {},
      series: [
        {
          name: "访问量",
          type: "bar",
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#83bff6' },
              { offset: 0.5, color: '#188df0' },
              { offset: 1, color: '#188df0' }
            ])
          },
          emphasis: {
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#2378f7' },
                { offset: 0.7, color: '#2378f7' },
                { offset: 1, color: '#83bff6' }
              ])
            }
          },
          data: [5, 20, 36, 10, 10, 20, 30, 20, 50, 60, 30, 60, 90],
        },
      ],
    });
  }
  function bindChart3() {
    const chartDom = document.getElementById("project-chart3");
    const myChart = echarts.init(chartDom);
    chartRef3.current = myChart;
    const option = {
      title: {
        text: "用户活跃度",
      },
      tooltip: {
        trigger: "axis",
      },
      legend: {
        left: "right",
        data: ["公司1", "公司2", "公司3", "公司4", "公司5", "公司6"],
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: ["11-20", "11-21", "11-22", "11-23", "11-24", "11-25","11-26", "11-27", "11-28", "11-29"],
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          name: "公司1",
          type: "line",
          stack: "Total",
          areaStyle: {},
          data: [120, 132, 101, 134, 90, 230, 210, 220, 182, 191, 234],
        },
        {
          name: "公司2",
          type: "line",
          stack: "Total",
          areaStyle: {},
          data: [220, 182, 191, 234, 290, 330, 310, 220, 182, 191, 234],
        },
        {
          name: "公司3",
          type: "line",
          stack: "Total",
          areaStyle: {},
          data: [150, 232, 201, 154, 190, 330, 410, 220, 182, 191, 234],
        },
        {
          name: "公司4",
          type: "line",
          stack: "Total",
          areaStyle: {},
          data: [320, 332, 301, 334, 390, 330, 320, 220, 182, 191, 234],
        },
        {
          name: "公司5",
          type: "line",
          stack: "Total",
          areaStyle: {},
          data: [820, 932, 901, 934, 1290, 1330, 1320, 220, 182, 191, 234],
        },
      ],
    };

    myChart.setOption(option);
  }
  function bindChart4() {
    const chartDom = document.getElementById("project-chart4");
    const myChart = echarts.init(chartDom);
    chartRef4.current = myChart;
    const option = {
      title: {
        text: "人员分布",
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: "vertical",
        left: "right",
      },
      series: [
        {
          name: '数量',
          type: 'pie',
          radius: ['36%', '76%'],
          emphasis: {
            label: {
              show: true,
              fontSize: 40,
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: false
          },
          data: [
            { value: 735, name: '男性' },
            { value: 580, name: '女性' },
          ]
        }
      ]
    };
    myChart.setOption(option);
  }

  function topView(item, index) {
    return (
      <div className="top-box-item" key={index}>
        <img className="top-item-icon" src={item.icon} />
        <div className="top-item-text">
          <span>{item.text}</span>
          <span className="top-item-num">{item.num}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="page workbench">
      <div className="top-box">{topItems.map(topView)}</div>

      <div className="chart-item2">
        <div id="project-chart3" className="chart-box" />
        <div id="project-chart4" className="chart-box"/>
      </div>

      <div className="chart-item">
        <div id="project-chart" className="chart-box" />
        <div id="project-chart2" className="chart-box"/>
      </div>
    </div>
  );
}

export default IndexPage;
