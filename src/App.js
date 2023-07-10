import './App.css';
import { readString } from 'react-papaparse';
import cageceData from './data/dados_para_aplicacao.csv'
import { useEffect, useState } from 'react';
import LineChart from './graphs/Line';
import getRandomObjectsFromArray from './utils/getRandomObjectsFromArray';
import convertColumns from './utils/convertColumn';
import MetGoalsAmount from './graphs/Bar/MetGoalsAmount';
import DqoValues from './graphs/Line/DqoValues';

function App() {
  const [wasterwaterData, setWasterwaterData] = useState([]); // todos os dados de esgoto e tratados

  // filtros
  const [selectedEtes, setSelectedEtes] = useState([]);
  const [selectedTechs, setSelectedTechs] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const [filteredData, setFilteredData] = useState([]); // dados filtrados

  useEffect(() => {
    readString(cageceData, papaConfig);
  }, []);
  useEffect(() => {
    console.log('filteredData mudou')
    console.log({ filteredData })
  }, [filteredData]);

  function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
  

  useEffect(() => {
    if (wasterwaterData?.length > 0) {
      let eteNamesToFilter = selectedEtes

      if (eteNamesToFilter.length === 0) {
        eteNamesToFilter = [`ETE ${randomIntFromInterval(1, 60)}`, `ETE ${randomIntFromInterval(1, 60)}`, `ETE ${randomIntFromInterval(1, 60)}`, `ETE ${randomIntFromInterval(1, 60)}`]
      }
      const dataFilteredByEte = wasterwaterData.filter((ete) => eteNamesToFilter.includes(ete.ETE))

      const dataFilteredByTech = selectedTechs.length > 0 ? dataFilteredByEte.filter((ete) => selectedTechs.includes(ete.Tipo)) : dataFilteredByEte;
      const dataFilteredByDate = dataFilteredByTech.filter((ete) => {
        const eteDate = new Date(ete.Data);
        if (startDate && endDate) {
          return eteDate >= startDate && eteDate <= endDate;
        }
        if (startDate) {
          return eteDate >= startDate;
        }
        if (endDate) {
          return eteDate <= endDate;
        }
        return true;
      });

      setFilteredData(dataFilteredByDate);
    }
  }, [wasterwaterData, selectedEtes, selectedTechs]);

  function convertCSVtoJSON(csvData) {
    const headers = csvData[0];

    const jsonData = csvData.slice(1).map((row) => {
      const jsonRow = {};
      row.forEach((value, index) => {
        jsonRow[headers[index]] = value;
      });
      return jsonRow;
    });

    return jsonData;
  }

  const papaConfig = {
    complete: (results, file) => {
      console.log('Parsing complete:', results, file);
      const jsonData = convertCSVtoJSON(results.data);
      console.log({ jsonData })
      if (jsonData.length > 0) {
        console.log('a data eh maior q 0')
        let correctData = convertColumns(jsonData)
        setWasterwaterData(correctData)
      }
    },
    download: true,
    error: (error, file) => {
      console.log('Error while parsing:', error, file);
    },
  };

  return (
    <>
      <MetGoalsAmount data={filteredData} />
      <DqoValues data={filteredData} />
    </>
  );
}

export default App;


