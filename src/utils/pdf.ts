import { PDFDocument, rgb, StandardFonts } from "pdf-lib";

export async function getFilePath(arrayBuffer: ArrayBuffer) {
  const pdfFile = await PDFDocument.load(arrayBuffer);
  const filePath = await pdfFile.saveAsBase64({ dataUri: true });
  return filePath;
}

export async function modifyPDFFile(
  x: number,
  y: number,
  date: Date,
  pdfArrayBuffer: ArrayBuffer
) {
  const newPDFFile = await PDFDocument.load(pdfArrayBuffer);

  const customFont = await newPDFFile.embedFont(StandardFonts.Helvetica);
  const pdfPage = await newPDFFile.getPage(0);
  const pageWidth = pdfPage.getWidth();
  const pageHeight = pdfPage.getHeight();

  const dateText = date.toDateString();
  const textSize = 16;
  const textWidth = customFont.widthOfTextAtSize(dateText, textSize);
  const textHeight = customFont.heightAtSize(textSize);

  pdfPage.drawText(dateText, {
    x: pageWidth * (x * 0.01),
    y: pageHeight * (y * 0.01),
    size: textSize,
    font: customFont,
    color: rgb(0, 0, 0),
  });

  return await newPDFFile.saveAsBase64({ dataUri: true });
}
