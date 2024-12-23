import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Trash2, Plus } from "lucide-react";
import { useForm, useFieldArray } from "react-hook-form";
import { InventoryForm } from "@/types/variants";
import { useCreateOrUpdateInventory } from "@/features/api/inventory/inventory.";

export function InventoryFormDialog({
  data,
  variantId,
}: {
  data: InventoryForm[];
  variantId: string;
}) {
  const { control, register, handleSubmit } = useForm<{
    inventories: InventoryForm[];
  }>({
    defaultValues: {
      inventories:
        data.length > 0
          ? data
          : [
              {
                size: "",
                stock: 0,
                availableStock: 0,
                variantId,
              },
            ],
    },
  });

  const create = useCreateOrUpdateInventory(variantId);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "inventories",
  });

  const onSubmit = (formData: { inventories: InventoryForm[] }) => {
    console.log(formData.inventories);
    // Lakukan sesuatu de
    create.mutate(formData.inventories);
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
        {fields.map((field, index) => (
          <Card key={field.id} className="w-full">
            <CardContent className="pt-4 space-y-3">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-700">
                  Inventory {index + 1}
                </h3>
                {fields.length > 1 && (
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    onClick={() => remove(index)}
                    className="h-8 w-8">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Size</Label>
                  <Input
                    {...register(`inventories.${index}.size` as const)}
                    placeholder="Enter size"
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Stock</Label>
                  <Input
                    type="number"
                    {...register(`inventories.${index}.stock` as const, {
                      valueAsNumber: true,
                    })}
                    placeholder="Enter stock"
                    className="w-full"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Available Stock</Label>
                  <Input
                    type="number"
                    {...register(
                      `inventories.${index}.availableStock` as const,
                      {
                        valueAsNumber: true,
                      }
                    )}
                    placeholder="Enter available stock"
                    className="w-full"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        <div className="flex space-x-4">
          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={() =>
              append({
                size: "",
                stock: 0,
                availableStock: 0,
                variantId: "",
              })
            }>
            <Plus className="mr-2 h-4 w-4" /> Add Inventory
          </Button>
          <Button type="submit" className="w-full">
            Submit Inventory
          </Button>
        </div>
      </form>
    </div>
  );
}
