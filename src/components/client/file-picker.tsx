import type { ChangeEvent, Dispatch, SetStateAction } from "react";
import { Input } from "../ui/input";

interface FilePickerProps {
    currentFile: File | null;
    setCurrentFile: Dispatch<SetStateAction<File | null>>;
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
    <div className="flex flex-col gap-2">
        <div className="hidden md:flex gap-2">
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
