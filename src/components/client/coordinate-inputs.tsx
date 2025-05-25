import type { ChangeEvent, Dispatch, SetStateAction } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

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
    <>
      <div className="flex gap-1 w-full">
        <Label htmlFor="x-coordinate">X:</Label>
        <Input
          id="x-coordinate"
          value={xCoordinate}
          onChange={validateCoordinate}
          type="number"
          min={0}
          max={100}
        />
      </div>

      <div className="flex gap-1 w-full">
        <Label htmlFor="y-coordinate">Y:</Label>
        <Input
          id="y-coordinate"
          value={yCoordinate}
          onChange={validateCoordinate}
          type="number"
          min={0}
          max={100}
        />
      </div>
    </>
  );
}
