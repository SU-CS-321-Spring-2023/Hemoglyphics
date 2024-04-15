// Description: This script predicts the next period start date and cycle length based on the historical period data.

const moment = require('moment');

// Define period cycle data (replace with your actual data)
const periodData = [
        { startDate: '2018-08-15', periodLength: 5, cycleLength: 34 },
        { startDate: '2018-09-18', periodLength: 6, cycleLength: 34 },
        { startDate: '2018-10-12', periodLength: 4, cycleLength: 30 },
        { startDate: '2018-11-11', periodLength: 4, cycleLength: 26 },
        { startDate: '2018-12-07', periodLength: 5, cycleLength: 26 },
        { startDate: '2018-12-31', periodLength: 5, cycleLength: 25 },
        { startDate: '2019-01-25', periodLength: 4, cycleLength: 25 },
        { startDate: '2019-02-19', periodLength: 5, cycleLength: 24 },
        { startDate: '2019-03-15', periodLength: 4, cycleLength: 24 },
        { startDate: '2019-04-08', periodLength: 4, cycleLength: 24 },
        { startDate: '2019-05-02', periodLength: 4, cycleLength: 24 },
        { startDate: '2019-05-23', periodLength: 4, cycleLength: 21 },
        { startDate: '2019-06-16', periodLength: 6, cycleLength: 24 },
        { startDate: '2019-07-11', periodLength: 3, cycleLength: 23 },
        { startDate: '2019-08-03', periodLength: 4, cycleLength: 25 },
        { startDate: '2019-08-28', periodLength: 6, cycleLength: 25 },
        { startDate: '2019-09-22', periodLength: 5, cycleLength: 25 },
        { startDate: '2019-10-17', periodLength: 4, cycleLength: 28 },
        { startDate: '2019-11-14', periodLength: 4, cycleLength: 21 },
        { startDate: '2019-12-05', periodLength: 4, cycleLength: 28 },
        { startDate: '2020-01-02', periodLength: 5, cycleLength: 21 },
        { startDate: '2020-01-23', periodLength: 4, cycleLength: 24 },
        { startDate: '2020-02-16', periodLength: 4, cycleLength: 24 },
        { startDate: '2020-03-11', periodLength: 4, cycleLength: 24 },
        { startDate: '2020-04-05', periodLength: 4, cycleLength: 25 },
        { startDate: '2020-04-27', periodLength: 5, cycleLength: 22 },
        { startDate: '2020-05-20', periodLength: 6, cycleLength: 23 },
        { startDate: '2020-06-14', periodLength: 5, cycleLength: 25 },
        { startDate: '2020-07-07', periodLength: 4, cycleLength: 23 },
        { startDate: '2020-08-01', periodLength: 4, cycleLength: 25 },
        { startDate: '2020-07-24', periodLength: 4, cycleLength: 24 },
        { startDate: '2020-09-22', periodLength: 4, cycleLength: 60 },
        { startDate: '2020-10-18', periodLength: 4, cycleLength: 26 },
        { startDate: '2020-11-12', periodLength: 5, cycleLength: 25 },
        { startDate: '2020-12-03', periodLength: 5, cycleLength: 21 },
        { startDate: '2020-12-26', periodLength: 6, cycleLength: 23 },
        { startDate: '2021-01-18', periodLength: 4, cycleLength: 23 },
        { startDate: '2021-02-15', periodLength: 5, cycleLength: 28 },
        { startDate: '2021-03-13', periodLength: 5, cycleLength: 26 },
        { startDate: '2021-04-06', periodLength: 5, cycleLength: 24 },
        { startDate: '2021-04-29', periodLength: 4, cycleLength: 23 },
        { startDate: '2021-05-25', periodLength: 6, cycleLength: 26 },
        { startDate: '2021-06-20', periodLength: 4, cycleLength: 26 },
        { startDate: '2021-07-12', periodLength: 6, cycleLength: 28 },
        { startDate: '2021-08-13', periodLength: 5, cycleLength: 32 },
        { startDate: '2021-09-10', periodLength: 4, cycleLength: 28 },
        { startDate: '2021-10-08', periodLength: 4, cycleLength: 28 },
        { startDate: '2021-11-06', periodLength: 5, cycleLength: 29 },
        { startDate: '2021-12-08', periodLength: 4, cycleLength: 32 },
        { startDate: '2022-01-04', periodLength: 4, cycleLength: 24 },
        { startDate: '2022-01-28', periodLength: 4, cycleLength: 29 },
        { startDate: '2022-02-26', periodLength: 5, cycleLength: 25 },
        { startDate: '2022-03-23', periodLength: 5, cycleLength: 29 },
        { startDate: '2022-04-21', periodLength: 4, cycleLength: 26 },
        { startDate: '2022-05-17', periodLength: 5, cycleLength: 28 },
        { startDate: '2022-06-14', periodLength: 4, cycleLength: 28 },
        { startDate: '2022-07-12', periodLength: 4, cycleLength: 32 },
        { startDate: '2022-08-13', periodLength: 6, cycleLength: 28 },
        { startDate: '2022-09-10', periodLength: 4, cycleLength: 28 },
        { startDate: '2022-10-08', periodLength: 4, cycleLength: 29 },
        { startDate: '2022-11-06', periodLength: 5, cycleLength: 32 },
        { startDate: '2022-12-08', periodLength: 4, cycleLength: 32 },
        { startDate: '2023-01-06', periodLength: 4, cycleLength: 31 },
        { startDate: '2023-02-06', periodLength: 5, cycleLength: 30 },
        { startDate: '2023-03-08', periodLength: 5, cycleLength: 31 },
        { startDate: '2023-04-08', periodLength: 4, cycleLength: 37 },
        { startDate: '2023-05-15', periodLength: 4, cycleLength: 30 },
        { startDate: '2023-06-14', periodLength: 7, cycleLength: 23 },
        { startDate: '2023-07-07', periodLength: 4, cycleLength: 28 },
        { startDate: '2023-08-04', periodLength: 4, cycleLength: 26 },
        { startDate: '2023-08-30', periodLength: 5, cycleLength: 32 },
        { startDate: '2023-10-01', periodLength: 4, cycleLength: 28 },
        { startDate: '2023-10-29', periodLength: 4, cycleLength: 33 },

    ];
  

    
 // Function to predict cycle length based on the last period date
function predictCycleLength(lastPeriodDate) {
  const lastEntry = periodData[periodData.length - 1];
  const lastPeriodStartDate = moment(lastEntry.startDate);
  const currentDate = moment(lastPeriodDate);
  const elapsedDays = currentDate.diff(lastPeriodStartDate, 'days');

  // Calculate the average cycle length from previous data
  const averageCycleLength = periodData.reduce((acc, entry) => acc + entry.cycleLength, 0) / periodData.length;

  // Adjust the initial guess based on the elapsed time since the last period
  const predictedCycleLength = Math.round((averageCycleLength * elapsedDays) / lastEntry.cycleLength);
  console.log("Last period start date:", lastPeriodStartDate.format("YYYY-MM-DD"));
  console.log("Current date:", currentDate.format("YYYY-MM-DD"));
  
  return predictedCycleLength;
}


// Example usage
 const lastPeriodDate = '2023-12-01'; // Example last period date after the last recorded period start date

const predictedCycle = predictCycleLength(lastPeriodDate);
console.log("Predicted cycle length:", predictedCycle, "days");

// Calculate the next period start date based on the predicted cycle length
function calculateNextStartDate(lastPeriodDate, predictedCycleLength) {
  const nextStartDate = moment(lastPeriodDate).add(predictedCycleLength, 'days');
  return nextStartDate.format("YYYY-MM-DD");
}

// Example 
const nextStartDate = calculateNextStartDate(lastPeriodDate, predictedCycle);
console.log("Next period start date:", nextStartDate);
