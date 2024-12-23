import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SIZES } from "@/constants";
import {
  UseFormRegister,
  FieldErrors,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import { UseFieldArrayAppend, FieldArrayWithId } from "react-hook-form";
import { Trash2 } from "lucide-react";
import { VariantsForm } from "@/types/variants";

interface InventoryStepProps {
  inventoryFields: FieldArrayWithId<VariantsForm, "inventory", "id">[];
  appendInventory: UseFieldArrayAppend<VariantsForm>;
  register: UseFormRegister<VariantsForm>;
  setValue: UseFormSetValue<VariantsForm>;
  errors: FieldErrors<VariantsForm>;
  remove: (index: number) => void;
  watch: UseFormWatch<VariantsForm>;
}

export function InventoryStep({
  inventoryFields,
  appendInventory,
  register,
  setValue,
  errors,
  remove,
  watch,
}: InventoryStepProps) {
  const watchInventory = watch("inventory");

  return (
    <div className="space-y-4">
      <Button
        type="button"
        variant="outline"
        onClick={() =>
          appendInventory({
            size: "",
            stock: 0,
            availableStock: 0,
            variantId: "",
          })
        }>
        Add Inventory
      </Button>

      {inventoryFields.map((field, index) => (
        <div
          key={field.id}
          className="border rounded-lg p-4 relative grid grid-cols-2 gap-4">
          <div>
            <Label className="mb-2 block">Size</Label>
            <Select
              value={watchInventory?.[index]?.size || ""}
              onValueChange={(value) => {
                setValue(`inventory.${index}.size`, value, {
                  shouldValidate: true,
                });
              }}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select size" />
              </SelectTrigger>
              <SelectContent>
                {SIZES.map((size) => (
                  <SelectItem
                    key={size}
                    value={size}
                    disabled={watchInventory?.some(
                      (inv, idx) => inv.size === size && idx !== index
                    )}>
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.inventory?.[index]?.size && (
              <p className="text-red-500 text-sm mt-1">
                {errors.inventory[index]?.size?.message}
              </p>
            )}
          </div>

          <div className="mr-5">
            <Label className="mb-2 block">Stock</Label>
            <Input
              type="number"
              {...register(`inventory.${index}.stock` as const, {
                setValueAs: (v) => (v === "" ? 0 : parseInt(v, 10)),
                min: {
                  value: 0,
                  message: "Stock cannot be negative",
                },
              })}
              placeholder="Enter stock"
              className="w-full "
              min={0}
            />
            {errors.inventory?.[index]?.stock && (
              <p className="text-red-500 text-sm mt-1">
                {errors.inventory[index]?.stock?.message}
              </p>
            )}
          </div>

          {inventoryFields.length > 1 && (
            <button
              type="button"
              onClick={() => remove(index)}
              className="absolute bottom-5 right-2 text-red-500 hover:text-red-700"
              title="Remove inventory">
              <Trash2 className="w-5 h-5" />
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
