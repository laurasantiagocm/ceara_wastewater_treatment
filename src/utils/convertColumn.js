const convertColumns = (array) => {
  console.log({ arraydentro: array })
  const convertedArray = array.map((obj) => {
    const newObj = {
      ...obj,
      Data: new Date(obj.Data),
      pH: obj.pH !== '' ? parseFloat(obj.pH) : null,
      CT: obj.CT !== '' ? parseFloat(obj.CT) : null,
      DQO: obj.DQO !== '' ? parseFloat(obj.DQO) : null,
      DQOFiltrada: obj.DQOFiltrada !== '' ? parseFloat(obj.DQOFiltrada) : null,
      EColi: obj.EColi !== '' ? parseFloat(obj.EColi) : null,
      SST: obj.SST !== '' ? parseFloat(obj.SST) : null,
      level: obj.level !== '' ? parseFloat(obj.level) : null,
      satisfy_dqo: obj.satisfy_dqo !== '' ? parseFloat(obj.satisfy_dqo) : null,
      satisfy_ecoli: obj.satisfy_ecoli !== '' ? parseFloat(obj.satisfy_ecoli) : null,
      satisfy_filtered_dqo: obj.satisfy_filtered_dqo !== '' ? parseFloat(obj.satisfy_filtered_dqo) : null,
      satisfy_general: obj.satisfy_general !== '' ? parseFloat(obj.satisfy_general) : null,
      satisfy_ph: obj.satisfy_ph !== '' ? parseFloat(obj.satisfy_ph) : null,
      satisfy_le: obj.satisfy_le !== '' ? parseFloat(obj.satisfy_le) : null,
    }; // Create a new object to avoid modifying the original one
    return newObj;
  });

  console.log({ arrayconvertid: convertedArray })
  return convertedArray;
}

export default convertColumns;