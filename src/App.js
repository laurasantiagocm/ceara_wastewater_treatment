import './App.css';
import { readString } from 'react-papaparse';
import cageceData from './data/dados_para_aplicacao.csv'
import { useEffect, useState } from 'react';
import LineChart from './graphs/Line';
import getRandomObjectsFromArray from './utils/getRandomObjectsFromArray';
import convertColumns from './utils/convertColumn';

function App() {
  const [wasterwaterData, setWasterwaterData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    readString(cageceData, papaConfig);
  }, []);

  useEffect(() => {
    if (filteredData?.length === 0 && wasterwaterData?.length > 0) {
      let randomObj = getRandomObjectsFromArray(wasterwaterData, 4)
      console.log({ randomObj })
      setFilteredData(randomObj)
    }
  }, [filteredData, wasterwaterData]);

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
    <LineChart />
  );
}

export default App;
