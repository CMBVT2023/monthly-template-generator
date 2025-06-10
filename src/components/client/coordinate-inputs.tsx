import type {
  ChangeEvent,
  Dispatch,
  SetStateAction,
} from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Slider } from "../ui/slider";

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
  function validateTextCoordinate(e: ChangeEvent<HTMLInputElement>) {
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

  function validateXSliderCoordinate(value: number[]) {
    if (value.length > 0) {
      const [xCoordinate] = value;

      setXCoordinate(xCoordinate);
    }
  }

  function validateYSliderCoordinate(value: number[]) {
    if (value.length > 0) {
      const [yCoordinate] = value;

      setYCoordinate(yCoordinate);
    }
  }

  return (
    <>
      <div className="flex gap-1 w-full lg:hidden">
        <Label htmlFor="x-coordinate">X:</Label>
        <Input
          id="x-coordinate"
          value={xCoordinate}
          onChange={validateTextCoordinate}
          type="number"
          min={0}
          max={100}
        />
      </div>
      <div className="flex gap-1 w-full lg:hidden">
        <Label htmlFor="y-coordinate">Y:</Label>
        <Input
          id="y-coordinate"
          value={yCoordinate}
          onChange={validateTextCoordinate}
          type="number"
          min={0}
          max={100}
        />
      </div>

      <div className="hidden lg:flex gap-1 w-full">
        <Label htmlFor="x-coordinate-slider">X:</Label>
        <Slider
          id="x-coordinate-slider"
          onValueChange={validateXSliderCoordinate}
          min={0}
          max={100}
          step={1}
        />
      </div>

      <div className="hidden lg:flex gap-1 w-full ">
        <Label htmlFor="y-coordinate-slider">Y:</Label>
        <Slider
          id="y-coordinate-slider"
          onValueChange={validateYSliderCoordinate}
          min={0}
          max={100}
          step={1}
        />
      </div>
    </>
  );
}
