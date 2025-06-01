import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import { getDateString } from "./date";

export async function getFilePath(arrayBuffer: ArrayBuffer) {
  const pdfFile = await PDFDocument.load(arrayBuffer);
  const filePath = await pdfFile.saveAsBase64({ dataUri: true });
  return filePath;
}

export async function modifyPDFFile(
  x: number,
  y: number,
  date: Date,
  templateFileArrayBuffer: ArrayBuffer
) {
  const newPDFFile = await PDFDocument.load(templateFileArrayBuffer);

  const customFont = await newPDFFile.embedFont(StandardFonts.Helvetica);
  const pdfPage = await newPDFFile.getPage(0);
  const pageWidth = pdfPage.getWidth();
  const pageHeight = pdfPage.getHeight();

  const dateText = getDateString(date);
  const textSize = 16;
  // const textWidth = customFont.widthOfTextAtSize(dateText, textSize);
  // const textHeight = customFont.heightAtSize(textSize);

  pdfPage.drawText(dateText, {
    x: pageWidth * (x * 0.01),
    y: pageHeight * (y * 0.01),
    size: textSize,
    font: customFont,
    color: rgb(0, 0, 0),
  });

  return newPDFFile;
}

export async function previewPDFFile(
  x: number,
  y: number,
  date: Date,
  templateFileArrayBuffer: ArrayBuffer
) {
  const previewFile = await modifyPDFFile(x, y, date, templateFileArrayBuffer);

  return await previewFile.saveAsBase64({ dataUri: true });
}

export async function generatePDFFromArray(
  datesArray: Date[],
  x: number,
  y: number,
  templateFileArrayBuffer: ArrayBuffer
) {
  const newPDfFile = await PDFDocument.create();

  for (let i = 0; i < datesArray.length; i++) {
    const modifiedPDF: PDFDocument = await modifyPDFFile(
      x,
      y,
      datesArray[i],
      templateFileArrayBuffer
    );
    const modifiedPDFPageIndices = modifiedPDF.getPageIndices();

    const modifiedPDFPages = await newPDfFile.copyPages(
      modifiedPDF,
      modifiedPDFPageIndices
    );

    for (const newPage of modifiedPDFPages) {
      newPDfFile.addPage(newPage);
    }

    await modifiedPDF.save();
  }

  return await newPDfFile.saveAsBase64({ dataUri: true });
}
