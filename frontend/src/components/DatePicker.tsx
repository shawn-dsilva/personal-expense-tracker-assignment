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
import dayjs from "dayjs"

const toHumanReadableDate = (date: Date) => {
    return dayjs(date).format("MMM D, YYYY")
}


export function DatePicker({ label = "Date", date, setDate, mode = "single" }: { date: Date | undefined, setDate: (date: Date | undefined) => void }) {
    const [open, setOpen] = React.useState(false)

    return (
        <div className="flex flex-col gap-1 w-full">
            <Label className="text-base">
                {label}
            </Label>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        id="date"
                        className="w-full justify-between font-normal"
                    >
                        {
                            mode === "range" ? `${toHumanReadableDate(date.from)} To ${date.to ? toHumanReadableDate(date.to) : "Selected End Date"}` : (date ? toHumanReadableDate(date) : "Select Date")
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
