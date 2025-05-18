"use client";

import CoordinateInputs from "@/components/client/coordinate-inputs";
import DateRangePicker from "@/components/client/date-range-picker";
import FilePicker from "@/components/client/file-picker";
import PDFDisplay from "@/components/client/pdf-display";
import WeekdaySelector from "@/components/client/weekday-selector";
import { addDays } from "date-fns";
import { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";

export default function MainPage() {
  const [xCoordinate, setXCoordinate] = useState<number>(0);
  const [yCoordinate, setYCoordinate] = useState<number>(0);

  const [templateFile, setTemplateFile] = useState<File | null>(null);

  const [pdfFileArrayBuffer, setPDFFileArrayBuffer] =
    useState<ArrayBuffer | null>(null);

  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 30),
  });

  const [isExcluding, setIsExcluding] = useState<boolean>(false);

  const [selectedDaysOfWeek, setSelectedDaysOfWeek] = useState<number[]>([]);

  useEffect(() => {
    async function getArrayBuffer(file: File) {
      const arrayBuffer = await file.arrayBuffer();
      setPDFFileArrayBuffer(arrayBuffer);
    }

    if (templateFile !== null) {
      getArrayBuffer(templateFile);
    }
  }, [templateFile]);

  return (
    <div>
      <CoordinateInputs
        xCoordinate={xCoordinate}
        setXCoordinate={setXCoordinate}
        yCoordinate={yCoordinate}
        setYCoordinate={setYCoordinate}
      />

      <FilePicker currentFile={templateFile} setCurrentFile={setTemplateFile} />

      <WeekdaySelector
        isExcluding={isExcluding}
        setIsExcluding={setIsExcluding}
        setSelectedDaysOfWeek={setSelectedDaysOfWeek}
      />

      <DateRangePicker dateRange={dateRange} setDateRange={setDateRange} />

      <PDFDisplay pdfFileArrayBuffer={pdfFileArrayBuffer} />
    </div>
  );
}
