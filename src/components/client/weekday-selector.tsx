import { type Dispatch, type SetStateAction } from "react";
import { Switch } from "../ui/switch";
import { Checkbox } from "../ui/checkbox";
import { Label } from "@radix-ui/react-label";

interface WeekdaySwitchProps {
  isExcluding: boolean;
  setIsExcluding: Dispatch<SetStateAction<boolean>>;
  setSelectedDaysOfWeek: Dispatch<SetStateAction<number[]>>;
}

export default function WeekdaySelector({
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

  const CheckBoxes = weekDays.map((name, index) => {
    const id = `${name}-CheckBox`;
    return (
      <div key={id} className="flex gap-2 items-center text-xl">
        <Checkbox id={id} onCheckedChange={() => toggleWeekDay(index)} />
        <Label htmlFor={id}>{name}</Label>
      </div>
    );
  });

  return (
    <div className="flex lg:flex-col flex-wrap lg:flex-nowrap gap-2 justify-center">
      <div className="flex gap-2 items-center w-full justify-center">
        <Label htmlFor="exclusion-switch" className="text-2xl">
          {isExcluding ? "Excluding" : "Including"}
        </Label>
        <Switch
          id="exclusion-switch"
          checked={isExcluding}
          onCheckedChange={() => setIsExcluding(!isExcluding)}
        />
      </div>

      {CheckBoxes}
    </div>
  );
}
