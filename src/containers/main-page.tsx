"use client";

import CoordinateInputs from "@/components/client/coordinate-inputs";
import DateRangePicker from "@/components/client/date-range-picker";
import FilePicker from "@/components/client/file-picker";
import FiltersToggle from "@/components/client/filters-toggle";
import PDFDisplay from "@/components/client/pdf-display";
import WeekdaySelector from "@/components/client/weekday-selector";
import { Button } from "@/components/ui/button";
import { generateDaysArray } from "@/utils/date";
import { generatePDFFromArray, previewPDFFile } from "@/utils/pdf";
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
  const [finishedPDFFilePath, setFinishedPDFFilePath] = useState<string>("");

  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 30),
  });

  const [isExcluding, setIsExcluding] = useState<boolean>(true);

  const [selectedDaysOfWeek, setSelectedDaysOfWeek] = useState<number[]>([]);

  useEffect(() => {
    async function getArrayBuffer(file: File) {
      const arrayBuffer = await file.arrayBuffer();
      setTemplateFileArrayBuffer(arrayBuffer);
    }

    if (templateFile !== null) {
      getArrayBuffer(templateFile);
    }
  }, [templateFile]);

  useEffect(() => {
    let loadingTimeout: NodeJS.Timeout | null = null;

    async function getDisplayPDF(
      x: number,
      y: number,
      date: Date,
      templateFileArrayBuffer: ArrayBuffer
    ) {
      const newFilePath = await previewPDFFile(
        x,
        y,
        date,
        templateFileArrayBuffer
      );
      setPDFFilePath(newFilePath);
    }

    if (
      templateFileArrayBuffer !== null &&
      dateRange !== undefined &&
      dateRange.from !== undefined
    ) {
      const date = dateRange.from;
      loadingTimeout = setTimeout(() => {
        getDisplayPDF(xCoordinate, yCoordinate, date, templateFileArrayBuffer);
        setFinishedPDFFilePath("");
      }, 500);
    }

    return () => {
      if (loadingTimeout !== null) {
        clearTimeout(loadingTimeout);
      }
    };
  }, [xCoordinate, yCoordinate, dateRange, templateFileArrayBuffer]);

  async function checkSelectedDateRange() {
    if (dateRange?.from === undefined || templateFileArrayBuffer === null)
      return;

    let daysArray: Date[] = [];
    if (dateRange.to === undefined) {
      daysArray = generateDaysArray(
        dateRange.from,
        dateRange.from,
        selectedDaysOfWeek,
        isExcluding
      );
    } else {
      daysArray = generateDaysArray(
        dateRange.from,
        dateRange.to,
        selectedDaysOfWeek,
        isExcluding
      );

      const newPDfFile = await generatePDFFromArray(
        daysArray,
        xCoordinate,
        yCoordinate,
        templateFileArrayBuffer
      );
      setFinishedPDFFilePath(newPDfFile);
    }
  }

  return (
    <div className="container p-2 w-full h-full max-h-full overflow-y-auto overflow-x-hidden flex flex-col md:flex-row gap-2">
      <div className="w-full md:w-1/3 h-auto max-h-full min-h-60 overflow-y-auto overflow-x-hidden flex flex-col gap-2">
        <div className="flex flex-row lg:flex-col gap-2 lg:gap-5 w-full h-fit p-2">
          <CoordinateInputs
            xCoordinate={xCoordinate}
            setXCoordinate={setXCoordinate}
            yCoordinate={yCoordinate}
            setYCoordinate={setYCoordinate}
          />
        </div>
        <DateRangePicker dateRange={dateRange} setDateRange={setDateRange} />
        <FilePicker
          currentFile={templateFile}
          setCurrentFile={setTemplateFile}
        />
        <FiltersToggle>
          <WeekdaySelector
            isExcluding={isExcluding}
            setIsExcluding={setIsExcluding}
            setSelectedDaysOfWeek={setSelectedDaysOfWeek}
          />
        </FiltersToggle>
        <Button onClick={checkSelectedDateRange}>Generate</Button>
      </div>

      {finishedPDFFilePath == "" ? (
        <PDFDisplay pdfFilePath={pdfFilePath} />
      ) : (
        <PDFDisplay pdfFilePath={finishedPDFFilePath} />
      )}
    </div>
  );
}
