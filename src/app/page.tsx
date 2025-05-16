import { Slider } from "@/components/ui/slider";

export default function Home() {
  return (
    <div>
      <h1>Select a file:</h1>

      <Slider 
        defaultValue={[50]}
        max={100}
        step={1}
      />
    </div>
  );
}
