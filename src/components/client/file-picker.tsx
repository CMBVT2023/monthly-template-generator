import { ChangeEvent, Dispatch } from "react";
import { Input } from "../ui/input";

interface FilePickerProps {
    currentFile: File | null;
    setCurrentFile: Dispatch<File>;
}

export default function FilePicker({currentFile, setCurrentFile}: FilePickerProps) {

    function validateFile(e: ChangeEvent<HTMLInputElement>) {
        if (e.target.files) {
            setCurrentFile(e.target.files[0]);
        }
    }

    function getFileName() {
        if (currentFile?.name) {
            return currentFile.name
        } else {
            return "No File Selected"
        }
    }

  return (
    <div>
        <div>
            <h2>Current File:</h2>
            <h3>{getFileName()}</h3>
        </div>
      <Input
        onChange={validateFile}
        type="file"
        accept="application/pdf"
      />
    </div>
  );
}
