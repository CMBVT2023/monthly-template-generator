import type { ChangeEvent, Dispatch, SetStateAction } from "react";
import { Input } from "../ui/input";

interface CoordinateInputsProps {
  xCoordinate: number;
  yCoordinate: number;
  setXCoordinate: Dispatch<SetStateAction<number>>;
  setYCoordinate: Dispatch<SetStateAction<number>>;
}

export default function CoordinateInputs({
  xCoordinate,
  yCoordinate,
  setXCoordinate,
  setYCoordinate,
}: CoordinateInputsProps) {
  function validateCoordinate(e: ChangeEvent<HTMLInputElement>) {
    let value = parseInt(e.target.value);

    if (value < 0 || Number.isNaN(value)) {
      value = 0;
    } else if (value > 100) {
      value = 100;
    }

    if (e.target.id === "x-coordinate") {
      setXCoordinate(value);
    } else if (e.target.id === "y-coordinate") {
      setYCoordinate(value);
    }
  }

  return (
    <div>
      <Input
        id="x-coordinate"
        value={xCoordinate}
        onChange={validateCoordinate}
        type="number"
        min={0}
        max={100}
      />
      <Input
        id="y-coordinate"
        value={yCoordinate}
        onChange={validateCoordinate}
        type="number"
        min={0}
        max={100}
      />
    </div>
  );
}
