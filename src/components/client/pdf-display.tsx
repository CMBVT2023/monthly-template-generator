import { PDFDocument } from "pdf-lib";
import { useEffect, useState } from "react";

interface PDFDisplayProps {
  pdfFileArrayBuffer: ArrayBuffer | null;
}

export default function PDFDisplay({ pdfFileArrayBuffer }: PDFDisplayProps) {
  const [pdfFilePath, setPDFFilePath] = useState<string>("");

  useEffect(() => {
    async function getFilePath(arrayBuffer: ArrayBuffer) {
      const pdfFile = await PDFDocument.load(arrayBuffer);
      const filePath = await pdfFile.saveAsBase64({ dataUri: true });
      setPDFFilePath(filePath);
    }

    if (pdfFileArrayBuffer !== null) {
      getFilePath(pdfFileArrayBuffer);
    }
  }, [pdfFileArrayBuffer]);

  return <>{pdfFilePath !== "" && <iframe src={pdfFilePath} />}</>;
}
