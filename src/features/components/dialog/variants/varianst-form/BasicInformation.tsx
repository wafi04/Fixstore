import { COLORS, SIZES } from "@/constants";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { VariantsForm } from "@/types/variants";

interface BasicInformationStepProps {
  register: UseFormRegister<VariantsForm>;
  errors: FieldErrors<VariantsForm>;
  setValue: (name: keyof VariantsForm, value: string) => void;
  watch: (name: keyof VariantsForm) => string;
}

export function BasicInformationStep({
  errors,
  setValue,
  watch,
}: BasicInformationStepProps) {
  return (
    <>
      <Label>Color</Label>
      <Select
        onValueChange={(value) => setValue("color", value)}
        value={watch("color")}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a color" />
        </SelectTrigger>
        <SelectContent>
          {COLORS.map((color) => (
            <SelectItem key={color} value={color}>
              {color}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {errors.color && (
        <p className="text-red-500 text-sm mt-1">{errors.color.message}</p>
      )}
    </>
  );
}
