const fs = require('fs');
const moment = require('moment');

function predictCycleLength(periodData, lastPeriodDate) {
  const lastEntry = periodData[periodData.length - 1];
  const lastPeriodStartDate = moment(lastEntry.startDate);
  const currentDate = moment(lastPeriodDate);
  const elapsedDays = currentDate.diff(lastPeriodStartDate, 'days');

  const averageCycleLength = periodData.reduce((acc, entry) => acc + entry.cycleLength, 0) / periodData.length;

  const predictedCycleLength = Math.round((averageCycleLength * elapsedDays) / lastEntry.cycleLength);
  
  return predictedCycleLength;
}

function predictPeriodLength(periodData) {
  const averagePeriodLength = periodData.reduce((acc, entry) => acc + entry.periodLength, 0) / periodData.length;
  return Math.round(averagePeriodLength);
}

function calculateNextStartDate(lastPeriodDate, predictedCycleLength) {
  const nextStartDate = moment(lastPeriodDate).add(predictedCycleLength, 'days');
  return nextStartDate.format("YYYY-MM-DD");
}

fs.readFile('user_data/cycleData.json', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  const jsonData = JSON.parse(data);

  const lastPeriodDate = jsonData.dataEntries[jsonData.dataEntries.length - 1].startDate;
  const predictedCycle = predictCycleLength(jsonData.dataEntries, lastPeriodDate);
  const predictedPeriod = predictPeriodLength(jsonData.dataEntries);
  const nextStartDate = calculateNextStartDate(lastPeriodDate, predictedCycle);

  const newData = {
    dataEntries: [
      ...jsonData.dataEntries,
      {
        startDate: nextStartDate,
        periodLength: predictedPeriod,
        cycleLength: predictedCycle,
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
