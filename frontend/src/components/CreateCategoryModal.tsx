import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useCreateCategory } from "@/hooks/useCreateCategory";
import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Tag } from "lucide-react";

export function CreateCategoryModal() {

    const [name, setName] = useState("");
    const { mutate: createCategory } = useCreateCategory();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        createCategory({ name: name.toLowerCase() });
        setName("");
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant={"outline"} size={"lg"}>
                    <Tag />
                    Create Category
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create a Transaction Category</DialogTitle>
                    <DialogDescription>
                        Create a Category to organize your Transactions
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} >
                    <div className="flex gap-2">
                        <Input type="text" placeholder="Category Name" value={name} onChange={(e) => setName(e.target.value)} />
                        <Button type="submit" variant="outline">
                            Submit
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>


    )
}
export default CreateCategoryModal