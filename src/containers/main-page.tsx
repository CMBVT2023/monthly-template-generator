"use client";

import CoordinateInputs from "@/components/client/coordinate-inputs";
import DateRangePicker from "@/components/client/date-range-picker";
import FilePicker from "@/components/client/file-picker";
import PDFDisplay from "@/components/client/pdf-display";
import WeekdaySelector from "@/components/client/weekday-selector";
import { getFilePath, modifyPDFFile } from "@/utils/pdf";
import { addDays } from "date-fns";
import { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";

/* //ToDo:
  Add a font size input
  Add a page selector (To allow user to add date to pages other than the first)
  Add a color selector for the font color
 */

export default function MainPage() {
  const [xCoordinate, setXCoordinate] = useState<number>(0);
  const [yCoordinate, setYCoordinate] = useState<number>(0);

  const [templateFile, setTemplateFile] = useState<File | null>(null);
  const [templateFileArrayBuffer, setTemplateFileArrayBuffer] =
    useState<ArrayBuffer | null>(null);

  const [pdfFilePath, setPDFFilePath] = useState<string>("");

  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 30),
  });

  const [isExcluding, setIsExcluding] = useState<boolean>(false);

  const [selectedDaysOfWeek, setSelectedDaysOfWeek] = useState<number[]>([]);

  useEffect(() => {
    async function getArrayBuffer(file: File) {
      const arrayBuffer = await file.arrayBuffer();
      setTemplateFileArrayBuffer(arrayBuffer);

      const filePath = await getFilePath(arrayBuffer);
      setPDFFilePath(filePath);
    }

    if (templateFile !== null) {
      getArrayBuffer(templateFile);
    }
  }, [templateFile]);

  useEffect(() => {
    async function getDisplayPDF(
      x: number,
      y: number,
      date: Date,
      arrayBuffer: ArrayBuffer
    ) {
      const newFilePath = await modifyPDFFile(x, y, date, arrayBuffer);
      setPDFFilePath(newFilePath);
    }

    if (
      templateFileArrayBuffer !== null &&
      dateRange !== undefined &&
      dateRange.from !== undefined
    ) {
      getDisplayPDF(
        xCoordinate,
        yCoordinate,
        dateRange.from,
        templateFileArrayBuffer
      );
    }
  }, [xCoordinate, yCoordinate, dateRange, templateFileArrayBuffer]);

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

      <PDFDisplay pdfFilePath={pdfFilePath} />
    </div>
  );
}
