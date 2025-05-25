interface PDFDisplayProps {
  pdfFilePath: string;
}

export default function PDFDisplay({ pdfFilePath }: PDFDisplayProps) {
  return <>{pdfFilePath !== "" && <iframe src={pdfFilePath} className="w-full md:w-2/3 h-full landscape:min-h-80" />}</>;
}
