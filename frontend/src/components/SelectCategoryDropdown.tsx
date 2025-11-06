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

export function SelectOptionsDropdown({ label, placeholder, options, setCategory }: { label: string, placeholder: string, options: string[], setCategory: React.Dispatch<React.SetStateAction<string>> }) {


    return (
        <Select>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>{label}</SelectLabel>
                    {options.map((category) => (
                        <SelectItem key={category} value={category} onKeyDown={() => setCategory(category)}>
                            {category}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}
export default SelectOptionsDropdown