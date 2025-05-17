'use client'

import { Input } from "@/components/ui/input";
import { useState } from "react"

export default function MainPage() {
    const [ xCoordinate, setXCoordinate ] = useState<number>(0);
    const [ yCoordinate, setYCoordinate ] = useState<number>(0);

    const [ templateFile, setTemplateFile ] = useState<File | null>(null);

    

    const [ isExcluding, setIsExcluding ] = useState<boolean>(false);
    
    const [ selectedDaysOfWeek, setSelectedDaysOfWeek ] = useState<string[]>([]);

    return (
        <div>
            <Input value={xCoordinate} onChange={(e) => setXCoordinate(parseInt(e.target.value))} type="number" min={0} max={100} />
            <Input value={yCoordinate} onChange={(e) => setYCoordinate(parseInt(e.target.value))} type="number" min={0} max={100} />

            <Input onChange={(e) => setTemplateFile(e.target.files[0])} type="file" accept="application/pdf"/>

            

        </div>
    )
}