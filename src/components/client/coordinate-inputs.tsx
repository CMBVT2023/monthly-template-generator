import { Dispatch } from "react";
import { Input } from "../ui/input";

interface CoordinateInputsProps {
  xCoordinate: number;
  yCoordinate: number;
  setXCoordinate: Dispatch<number>;
  setYCoordinate: Dispatch<number>;
}

export default function CoordinateInputs({
  xCoordinate,
  yCoordinate,
  setXCoordinate,
  setYCoordinate,
}: CoordinateInputsProps) {
  return (
    <div>
      <Input
        value={xCoordinate}
        onChange={(e) => setXCoordinate(parseInt(e.target.value))}
        type="number"
        min={0}
        max={100}
      />
      <Input
        value={yCoordinate}
        onChange={(e) => setYCoordinate(parseInt(e.target.value))}
        type="number"
        min={0}
        max={100}
      />
    </div>
  );
}
