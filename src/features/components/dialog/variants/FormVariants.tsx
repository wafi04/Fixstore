import { useCreateVariants } from "@/features/api/variants/variants.query";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { STEPS_VARIANST_FORM } from "@/constants";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { BasicInformationStep } from "./varianst-form/BasicInformation";
import { ImageStep } from "./varianst-form/ImageVariants";
import { InventoryStep } from "./varianst-form/InventoryStep";
import { VariantsForm } from "@/types/variants";

export function FormVariants({
  productId,
  open,
  onClose,
  title,
  subTitle,
}: {
  productId: string;
  title: string;
  subTitle: string;
  open: boolean;
  onClose: () => void;
}) {
  const [currentStep, setCurrentStep] = useState(
    STEPS_VARIANST_FORM.BASIC_INFORMATION
  );
  const [images, setImages] = useState<File[]>([]);
  const create = useCreateVariants();

  const {
    register,
    control,
    trigger,
    setValue,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<VariantsForm>({
    mode: "onChange",
    defaultValues: {
      color: "",
      images: [],
      inventory: [],
      productId: productId.toString(),
    },
  });

  const {
    fields: inventoryFields,
    append: appendInventory,
    remove,
  } = useFieldArray({
    control,
    name: "inventory",
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    return files;
  };

  const onSubmit = async (data: VariantsForm) => {
    const formData = new FormData();

    // Prepare JSON payload for other data
    const payload = {
      productId: data.productId,
      color: data.color,
      inventory: data.inventory.map((item) => ({
        size: item.size,
        stock: item.stock,
        availableStock: item.availableStock || 0,
      })),
    };

    // Stringify the payload and append as a JSON field
    formData.append("payload", JSON.stringify(payload));

    // Add image files to FormData
    data.images.forEach((file) => {
      formData.append(`images`, file, file.name);
    });

    // Mutate with the formData
    const result = create.mutate(formData);
    console.log("Submission result:", result);
  };
  // Next step handler
  const handleNextStep = async () => {
    let isStepValid = false;

    switch (currentStep) {
      case STEPS_VARIANST_FORM.BASIC_INFORMATION:
        // Allow empty color by making it optional
        isStepValid = await trigger(["color"]);
        break;
      case STEPS_VARIANST_FORM.IMAGE:
        // Allow empty images
        isStepValid = true;
        break;
      case STEPS_VARIANST_FORM.INVENTORY:
        // Ensure at least one inventory item exists
        isStepValid = watch("inventory").length > 0;
        break;
    }

    if (isStepValid) {
      setCurrentStep((prev) =>
        prev < Object.keys(STEPS_VARIANST_FORM).length / 2 ? prev + 1 : prev
      );
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case STEPS_VARIANST_FORM.BASIC_INFORMATION:
        return (
          <BasicInformationStep
            register={register}
            errors={errors}
            setValue={setValue}
            watch={watch}
          />
        );
      case STEPS_VARIANST_FORM.IMAGE:
        return (
          <ImageStep
            handleImageUpload={handleImageUpload}
            errors={errors}
            watch={watch}
            setValue={setValue}
            images={images}
            setImages={setImages}
          />
        );
      case STEPS_VARIANST_FORM.INVENTORY:
        return (
          <InventoryStep
            remove={remove}
            watch={watch}
            setValue={setValue}
            inventoryFields={inventoryFields}
            appendInventory={appendInventory}
            register={register}
            errors={errors}
          />
        );
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{subTitle}</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {renderStep()}
          <div className="flex">
            {currentStep > STEPS_VARIANST_FORM.BASIC_INFORMATION && (
              <Button
                type="button"
                className="w-full mr-2"
                onClick={() => setCurrentStep((prev) => prev - 1)}>
                Previous
              </Button>
            )}

            {currentStep < STEPS_VARIANST_FORM.INVENTORY ? (
              <Button type="button" className="w-full" onClick={handleNextStep}>
                Next
              </Button>
            ) : (
              <Button type="submit" className="w-full">
                Submit
              </Button>
            )}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
