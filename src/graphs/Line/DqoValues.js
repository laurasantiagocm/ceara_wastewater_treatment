import React from 'react';
import * as echarts from 'echarts';
import { useEffect, useState } from 'react';
import dataColorPalette from '../../data/dataColorPalette';

const DqoValues = ({ data = [] }) => {
  const [eteNamesAsArray, setEteNamesAsArray] = useState([]);
  const [dqoValues, setDqoValues] = useState([]);
  const [dateValues, setDateValues] = useState([]);

  function getFirstDaysOfMonth(startDate, endDate) {
    const result = [];
    let currentDate = new Date(startDate);

    // Set the date to the first day of the month
    currentDate.setDate(1);

    while (currentDate <= endDate) {
      result.push([currentDate.getDate(), currentDate.getMonth() + 1, currentDate.getFullYear()].join('/')); // Clone the date object and add it to the result array
      currentDate.setMonth(currentDate.getMonth() + 1); // Move to the next month
    }

    return result;
  }

  useEffect(() => {
    const eteNames = [...new Set(data.map((ete) => `${ete.ETE}`))];
    setEteNamesAsArray(eteNames);
  }, [data]);

  useEffect(() => {
    setDqoValues([])
    setDateValues([])
    eteNamesAsArray.forEach((eteName) => {
      let eteData = data.filter((ete) => ete.ETE === eteName)
      let dqoValuesEte = eteData.map((ete) => ete.DQO);

      if (eteData.length > 0) {
        const firstDate = eteData[0].Data
        const lastDate = eteData[eteData.length - 1].Data

        const dates = getFirstDaysOfMonth(firstDate, lastDate)
        setDateValues(dates)
      }
      setDqoValues(dqoValues => [...dqoValues, dqoValuesEte])
    });
  }, [eteNamesAsArray, data]);

  useEffect(() => {

    // let base = +new Date(1968, 9, 3);
    // let oneDay = 24 * 3600 * 1000;
    // let date = [];
    // let data = [Math.random() * 300];
    // for (let i = 1; i < 20000; i++) {
    //   var now = new Date((base += oneDay));
    //   date.push([now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'));
    //   data.push(Math.round((Math.random() - 0.5) * 20 + data[i - 1]));
    // }
    const option = {
      tooltip: {
        trigger: 'axis',
        position: function (pt) {
          return [pt[0], '10%'];
        }
      },
      legend: {
        data: eteNamesAsArray
      },
      title: {
        left: 'center',
        text: 'Valores de DQO'
      },
      toolbox: {
        feature: {
          dataZoom: {
            yAxisIndex: 'none'
          },
          restore: {},
          saveAsImage: {}
        }
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: dateValues // array de DATAS (como [2009/03/01, etc])
      },
      yAxis: {
        type: 'value',
        boundaryGap: [0, '100%']
      },
      dataZoom: [
        {
          type: 'inside',
          start: 0,
          end: 10
        },
        {
          start: 0,
          end: 10
        }
      ],
      series: eteNamesAsArray.map((eteName, index) => {
        return {
          name: eteName,
          type: 'line',
          smooth: true,
          sampling: 'lttb',
          emphasis: {
            focus: 'series'
          },
          itemStyle: {
            color: dataColorPalette[index]
          },
          data: dqoValues[index] // array de dados (valores numeros, como [1, 2, etc]). pra por mais um conjunto, basta por outro objeto series.
        }
      })
    };

    const chartDom = document.getElementById('dqo_line_chart');
    const myChart = echarts.init(chartDom);
    myChart.setOption(option);
  }, [eteNamesAsArray, dqoValues, dateValues]);

  return (
    <div id="dqo_line_chart" style={{ width: "1000px", height: "500px" }}></div>
  )
}


export default DqoValues;
