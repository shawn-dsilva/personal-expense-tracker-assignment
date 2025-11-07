"use client"

import * as React from "react"
import { ChevronDownIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Label } from "@/components/ui/label"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { DateRange } from "react-day-picker"

export function DatePicker({ date, setDate, mode = "single" }: { date: Date | undefined, setDate: (date: Date | undefined) => void }) {
    const [open, setOpen] = React.useState(false)

    return (
        <div className="flex flex-col gap-3 w-full">
            <Label htmlFor="date" className="px-1">
                Date
            </Label>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        id="date"
                        className="w-full justify-between font-normal"
                    >
                        {
                            mode === "range" ? `${date.from.toDateString()} To ${date.to ? date.to.toDateString() : "Select end date"}` : (date ? date.toDateString() : "Select date")
                        }

                        <ChevronDownIcon />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                    <Calendar
                        mode="range"
                        defaultMonth={date?.from}
                        selected={date}
                        onSelect={setDate}
                        className="rounded-lg border shadow-sm"
                    />
                </PopoverContent>
            </Popover>
        </div>
    )
}
