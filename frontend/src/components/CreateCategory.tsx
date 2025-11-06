import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useCreateCategory } from "@/hooks/useCreateCategory";
import { useState } from "react";


export function CreateCategory() {

    const [name, setName] = useState("");
    const { mutate: createCategory } = useCreateCategory();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        createCategory({ name: name.toLowerCase() });
        setName("");
    }

    return (
        <div className="flex w-lg gap-2 flex-col mx-auto p-4 border-dashed border-2 border-gray-300 rounded-md  my-4">
            <h3 className=" text-lg font-semibold tracking-tight">Create A Category</h3>
            <form onSubmit={handleSubmit} >
                <div className="flex gap-2">
                    <Input type="text" placeholder="Category Name" value={name} onChange={(e) => setName(e.target.value)} />
                    <Button type="submit" variant="outline">
                        Submit
                    </Button>
                </div>
            </form>

        </div>

    )
}
export default CreateCategory