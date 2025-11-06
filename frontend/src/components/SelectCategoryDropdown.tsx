import * as React from "react"

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export function SelectOptionsDropdown({ label, placeholder, options, setCategory }: { label: string, placeholder: string, options: { value: number, label: string }[], setCategory: React.Dispatch<React.SetStateAction<string>> }) {


    return (
        <div>
            <Select onValueChange={setCategory}>
                <SelectTrigger className="w-full">
                    <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>{label}</SelectLabel>
                        {options.map(({ value, label }) => (
                            <SelectItem key={value} value={value.toString()}>
                                {label}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    )
}
export default SelectOptionsDropdown