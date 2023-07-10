import React from 'react';
import * as echarts from 'echarts';
import { useEffect, useState } from 'react';

const MetGoalsAmount = ({ data = [] }) => {
  const [eteNamesAsArray, setEteNamesAsArray] = useState([]);
  const [metGoalAmount, setMetGoalAmount] = useState([]);
  const [didntMetGoalAmount, setDidntMetGoalAmount] = useState([]);

  useEffect(() => {
    const eteNames = [...new Set(data.map((ete) => `${ete.ETE}`))];
    setEteNamesAsArray(eteNames);
  }, [data]);

  useEffect(() => {
    setMetGoalAmount([])
    setDidntMetGoalAmount([])

    eteNamesAsArray.forEach((eteName) => {
      let yesAmount = data.filter((ete) => ete.ETE === eteName && ete.Meta === 'S').length;
      let noAmount = data.filter((ete) => ete.ETE === eteName && ete.Meta === 'N').length;

      setMetGoalAmount(metGoalAmount => [...metGoalAmount, yesAmount])
      setDidntMetGoalAmount(didntMetGoalAmount => [...didntMetGoalAmount, noAmount])
    });
  }, [eteNamesAsArray, data]);

  useEffect(() => {
    const option = {
      title: {
        text: 'Metas alcançadas por ETE'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      legend: {},
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: eteNamesAsArray
      },
      yAxis: {
        type: 'value',
        boundaryGap: [0, 0.01]
      },
      series: [
        {
          name: 'S',
          type: 'bar',
          data: metGoalAmount,
          itemStyle: {
            color: '#8fd477'
          }
        },
        {
          name: 'N',
          type: 'bar',
          data: didntMetGoalAmount,
          itemStyle: {
            color: '#de425b'
          }
        }
      ]
    };

    console.log([eteNamesAsArray, metGoalAmount, didntMetGoalAmount])

    const chartDom = document.getElementById('s_n_chart');
    const myChart = echarts.init(chartDom);
    myChart.setOption(option);
  }, [eteNamesAsArray, metGoalAmount, didntMetGoalAmount]);

  return (
    <div id="s_n_chart" style={{ width: "500px", height: "500px" }}></div>
  )
}


export default MetGoalsAmount;
