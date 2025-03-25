import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AuthFormFieldProps {
  id: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  required?: boolean;
}

export function AuthFormField({
  id,
  label,
  placeholder,
  value,
  onChange,
  type = "text",
  required = true,
}: AuthFormFieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
      />
    </div>
  );
}
