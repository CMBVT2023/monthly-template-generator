interface PDFDisplayProps {
  pdfFilePath: string;
}

export default function PDFDisplay({ pdfFilePath }: PDFDisplayProps) {
  return <>{pdfFilePath !== "" && <iframe src={pdfFilePath} className="w-full h-lvh" />}</>;
}
