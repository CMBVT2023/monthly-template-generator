import type { Dispatch, SetStateAction } from "react";
import { Switch } from "../ui/switch";
import { Checkbox } from "../ui/checkbox";

interface WeekdaySwitchProps {
  isExcluding: boolean;
  setIsExcluding: Dispatch<SetStateAction<boolean>>;
  setSelectedDaysOfWeek: Dispatch<SetStateAction<number[]>>;
}

export default function WeekdaySwitch({
  isExcluding,
  setIsExcluding,
  setSelectedDaysOfWeek,
}: WeekdaySwitchProps) {
  const weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  function toggleWeekDay(weekDayNum: number) {
    setSelectedDaysOfWeek((prev) => {
      const currentArray = prev;
      // Checks if the array already includes number.
      if (currentArray.includes(weekDayNum)) {
        // Filters out number if it does.
        return currentArray.filter((num) => num !== weekDayNum);
      } else {
        // Appends it and sorts the array if it doesn't.
        return [...currentArray, weekDayNum].sort((a, b) => a - b);
      }
    });
  }

  return (
    <div>
      <Switch
        checked={isExcluding}
        onCheckedChange={() => setIsExcluding(!isExcluding)}
      />

      <div>
        <Checkbox onCheckedChange={() => toggleWeekDay(1)} />
        <Checkbox onCheckedChange={() => toggleWeekDay(1)} />
      </div>
    </div>
  );
}
