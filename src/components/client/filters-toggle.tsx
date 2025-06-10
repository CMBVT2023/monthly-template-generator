import React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";

interface FiltersToggleProps {
    children: React.ReactNode;
}

export default function FiltersToggle({children}: FiltersToggleProps) {
    return (
        <Accordion type="single" collapsible>
            <AccordionItem value="main-item">
                <AccordionTrigger>Filters</AccordionTrigger>
                <AccordionContent>
                    {children}
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    )
}