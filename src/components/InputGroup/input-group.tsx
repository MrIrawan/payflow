import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { InputGroupProps } from "@/types/types";

export function InputGroup({ label, htmlFor, ...props }: InputGroupProps) {
  return (
    <div className="w-full flex flex-col gap-2">
      <Label htmlFor={htmlFor}>{label}</Label>
      <Input id={htmlFor} name={htmlFor} {...props} />
    </div>
  );
}
