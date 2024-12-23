import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";
import { Input } from "./input";

interface FormInputProps {
  label: string;
  type?: "input" | "textarea";
  register?: UseFormRegisterReturn;
  error?: FieldError;
  placeholder: string;
  className?: string;
  id?: string;
}

export function FormInput({
  label,
  type = "input",
  register,
  error,
  placeholder,
  className = "",
  ...props
}: FormInputProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={props.id}>{label}</Label>
      {type === "input" ? (
        <Input
          type="text"
          {...props}
          {...register}
          placeholder={placeholder}
          className={`${className} ${error ? "border-red-500" : ""}`}
        />
      ) : (
        <Textarea
          {...props}
          {...register}
          placeholder={placeholder}
          className={`${className} ${error ? "border-red-500" : ""}`}
        />
      )}
      {error && (
        <Alert variant="destructive" className="p-2 space-x-5">
          <AlertCircle className="size-5" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error.message}</AlertDescription>
        </Alert>
      )}
    </div>
  );
}
