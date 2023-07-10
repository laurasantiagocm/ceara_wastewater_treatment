import logo from './logo.svg';
import './App.css';
import { readString } from 'react-papaparse';
import cageceData from './data/dados_novos_cagece.csv'
import { useEffect, useState } from 'react';
import LineChart from './graphs/Line';

function App() {
  const [wasterwaterData, setWasterwaterData] = useState([]);
  useEffect(() => {
    readString(cageceData, papaConfig);
  }, []);

  const papaConfig = {
    complete: (results, file) => {
      console.log('Parsing complete:', results, file);
      setWasterwaterData(results.data)
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
