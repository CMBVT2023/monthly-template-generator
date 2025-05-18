"use client";

import CoordinateInputs from "@/components/client/coordinate-inputs";
import FilePicker from "@/components/client/file-picker";
import WeekdaySwitch from "@/components/client/weekday-switch";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { addDays, format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import { DateRange } from "react-day-picker";

export default function MainPage() {
  const [xCoordinate, setXCoordinate] = useState<number>(0);
  const [yCoordinate, setYCoordinate] = useState<number>(0);

  const [templateFile, setTemplateFile] = useState<File | null>(null);

  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 30),
  });

  const [isExcluding, setIsExcluding] = useState<boolean>(false);

  const [selectedDaysOfWeek, setSelectedDaysOfWeek] = useState<number[]>([]);

  return (
    <div>
      <CoordinateInputs
        xCoordinate={xCoordinate}
        setXCoordinate={setXCoordinate}
        yCoordinate={yCoordinate}
        setYCoordinate={setYCoordinate}
      />

      <FilePicker currentFile={templateFile} setCurrentFile={setTemplateFile} />

      <WeekdaySwitch isExcluding={isExcluding} setIsExcluding={setIsExcluding} setSelectedDaysOfWeek={setSelectedDaysOfWeek} />

      <Popover>
        <PopoverTrigger asChild>
          <Button id="date" variant={"outline"}>
            <CalendarIcon />
            {dateRange?.from ? (
              dateRange.to ? (
                <>
                  {format(dateRange.from, "LLL dd, y")} -{" "}
                  {format(dateRange.to, "LLL dd, y")}
                </>
              ) : (
                format(dateRange.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={dateRange?.from}
            selected={dateRange}
            onSelect={setDateRange}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
