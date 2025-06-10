interface PDFDisplayProps {
  pdfFilePath: string;
}

export default function PDFDisplay({ pdfFilePath }: PDFDisplayProps) {
  return (
    <div className="w-full md:w-2/3 h-full landscape:min-h-80 border-4 border-highlight">
      {pdfFilePath !== "" && (
        <iframe src={pdfFilePath} className="w-full h-full" />
      )}
    </div>
  );
}
