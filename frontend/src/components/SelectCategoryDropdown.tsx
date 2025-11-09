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
import { capitalizeFirstLetter } from "@/lib/utils"

export function SelectOptionsDropdown({ value, isLoading = false, label, placeholder, options, setCategory }: { value: string, isLoading: boolean, label: string, placeholder: string, options: { value: number, label: string, }[], setCategory: React.Dispatch<React.SetStateAction<string>> }) {

    return (
        <div>
            <Select value={value ? String(value) : undefined} onValueChange={setCategory}>
                <SelectTrigger className="w-full">
                    <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent>
                    {isLoading ? (
                        <div className="p-4 text-center">Loading...</div>
                    ) :
                        <SelectGroup>
                            <SelectLabel>{label}</SelectLabel>
                            {options.map(({ value, label }) => (
                                <SelectItem key={value} value={value.toString()}>
                                    {capitalizeFirstLetter(label)}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    }
                </SelectContent>
            </Select>
        </div>
    )
}
export default SelectOptionsDropdown