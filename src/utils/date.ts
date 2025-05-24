import { addDays } from "date-fns";

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
