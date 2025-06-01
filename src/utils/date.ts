import { addDays } from "date-fns";

function getMonthString(monthNum: number) {
  let monthString: string = "";
  switch (monthNum) {
    case 0:
      monthString = "January";
      break;
    case 1:
      monthString = "February";
      break;
    case 2:
      monthString = "March";
      break;
    case 3:
      monthString = "April";
      break;
    case 4:
      monthString = "May";
      break;
    case 5:
      monthString = "June";
      break;
    case 6:
      monthString = "July";
      break;
    case 7:
      monthString = "August";
      break;
    case 8:
      monthString = "September";
      break;
    case 9:
      monthString = "October";
      break;
    case 10:
      monthString = "November";
      break;
    case 11:
      monthString = "December";
      break;
  }

  return monthString;
}

function getDayOfWeekString(dayOfWeekNum: number) {
  let dayOfWeekString: string = "";

  switch (dayOfWeekNum) {
    case 0:
      dayOfWeekString = "Sunday";
      break;
    case 1:
      dayOfWeekString = "Monday";
      break;
    case 2:
      dayOfWeekString = "Tuesday";
      break;
    case 3:
      dayOfWeekString = "Wednesday";
      break;
    case 4:
      dayOfWeekString = "Thursday";
      break;
    case 5:
      dayOfWeekString = "Friday";
      break;
    case 6:
      dayOfWeekString = "Saturday";
      break;
  }

  return dayOfWeekString;
}

export function generateDaysArray(
  startingDate: Date,
  endingDate: Date,
  daysOfWeekArray: number[],
  isExcluding: boolean
) {
  const datesArray: Date[] = [];
  let currentDate = startingDate;

  do {
    if (isExcluding) {
      if (!daysOfWeekArray.includes(currentDate.getDay())) {
        datesArray.push(currentDate);
      }
    } else {
      if (daysOfWeekArray.includes(currentDate.getDay())) {
        datesArray.push(currentDate);
      }
    }
    currentDate = addDays(currentDate, 1);
  } while (currentDate <= endingDate);

  return datesArray;
}

export function getDateString(currentDate: Date) {
  const finalString = `${getDayOfWeekString(
    currentDate.getDay()
  )}, ${getMonthString(
    currentDate.getMonth()
  )} ${currentDate.getDate()}, ${currentDate.getFullYear()}`;
  return finalString;
}
