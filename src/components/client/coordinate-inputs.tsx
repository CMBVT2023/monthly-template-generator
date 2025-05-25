import type { ChangeEvent, Dispatch, SetStateAction } from "react";
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
  function validateCoordinate(e: ChangeEvent<HTMLInputElement>) {
    let value = parseInt(e.target.value);

    if (value < 0 || Number.isNaN(value)) {
      value = 0;
    } else if (value > 100) {
      value = 100;
    }

    console.log(e)

    if (e.target.id === "x-coordinate" || e.target.id === "x-coordinate-slider") {
      setXCoordinate(value);
    } else if (e.target.id === "y-coordinate" || e.target.id === "y-coordinate-slider") {
      setYCoordinate(value);
    }
  }

  return (
    <>
        <div className="flex gap-1 w-full lg:hidden">
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
        <div className="flex gap-1 w-full lg:hidden">
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

        <div className="hidden lg:flex gap-1 w-full">
          <Label htmlFor="x-coordinate-slider">X:</Label>
          <Slider id="x-coordinate-slider" onChange={validateCoordinate} min={0} max={100} step={1}/>
        </div>


        <div className="hidden lg:flex gap-1 w-full ">
          <Label htmlFor="y-coordinate-slider">Y:</Label>
          <Slider id="y-coordinate-slider" onChange={validateCoordinate} min={0} max={100} step={1}/>
        </div>
    </>
  );
}
