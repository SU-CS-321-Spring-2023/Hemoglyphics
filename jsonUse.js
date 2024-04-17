const fs = require('fs');

fs.readFile('user_data/cycleData.json', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  const jsonData = JSON.parse(data);
  console.log('Existing JSON Data:');
  console.log(jsonData);

  const newData = {
    dataEntries: [
      ...jsonData.dataEntries,
      {
        startDate: '2024-04-02',
        periodLength: 3,
        cycleLength: 28,
      },
    ],
  };

  fs.writeFile('user_data/cycleData.json', JSON.stringify(newData, null, 2), (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log('Data written to file.');
    console.log('Updated JSON Data:');
    console.log(newData);
  });
});
