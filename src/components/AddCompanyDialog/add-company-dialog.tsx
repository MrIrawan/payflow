import { Building2, PlusIcon } from "lucide-react"
import { Button } from "../ui/button"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../ui/dialog"
import { Label } from "../ui/label"
import { InputGroup, InputGroupAddon, InputGroupInput } from "../ui/input-group"
import { Input } from "../ui/input"
import { Avatar } from "../ui/avatar"

export function AddCompanyDialog() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="min-w-32 flex flex-row items-center gap-1.5 ring-1 ring-green-500 bg-green-500 text-white hover:bg-green-600">
                    <PlusIcon />
                    <p className="text-sm">Add Company</p>
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add New Company</DialogTitle>
                    <DialogDescription>
                        Fill in the details for the new company you want to add. Click save when you&apos;re done.
                    </DialogDescription>
                </DialogHeader>
                <div className="w-full flex flex-col gap-4">
                    <div className="w-full flex flex-col gap-2">
                        <Label className="text-sm font-medium">Company Name & Avatar</Label>
                        <div className="flex flex-row gap-3">
                            <div className="relative">
                                <Avatar className="bg-gray-300 rounded-md"></Avatar>
                                <Input type="file" accept="image/*" className="absolute top-0 left-0 opacity-0" />
                            </div>
                            <InputGroup>
                                <InputGroupInput placeholder="Enter company name..." />
                                <InputGroupAddon>
                                    <Building2 className="size-4" />
                                </InputGroupAddon>
                            </InputGroup>
                        </div>
                    </div>
                    <div className="w-full flex flex-col gap-2">
                        <Label className="text-sm font-medium">Company Description</Label>
                        <InputGroup>
                            <InputGroupInput placeholder="Enter company description..." />
                            <InputGroupAddon>
                                <Building2 className="size-4" />
                            </InputGroupAddon>
                        </InputGroup>
                    </div>
                    <div className="w-full flex flex-col gap-2">
                        <Label className="text-sm font-medium">Total Company Members</Label>
                        <InputGroup>
                            <InputGroupInput placeholder="Enter total company members..." />
                            <InputGroupAddon>
                                <Building2 className="size-4" />
                            </InputGroupAddon>
                        </InputGroup>
                    </div>
                    <div className="w-full flex flex-col gap-2">
                        <Label className="text-sm font-medium">Company Field</Label>
                        <InputGroup>
                            <InputGroupInput placeholder="Enter company field..." />
                            <InputGroupAddon>
                                <Building2 className="size-4" />
                            </InputGroupAddon>
                        </InputGroup>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}