import { Input } from "@/components/ui/input";
import { FieldErrors, UseFormSetValue, UseFormWatch } from "react-hook-form";
import { useState } from "react";
import { X } from "lucide-react";
import { VariantsForm } from "@/types/variants";

interface ImageStepProps {
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errors: FieldErrors<VariantsForm>;
  images?: File[];
  watch: UseFormWatch<VariantsForm>;
  setImages?: (images: File[]) => void;
  setValue: UseFormSetValue<VariantsForm>;
}

export function ImageStep({
  handleImageUpload,
  errors,
  images = [],
  watch,
  setImages,
  setValue, // Make sure this is passed
}: ImageStepProps) {
  const [previews, setPreviews] = useState<string[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];

    // Create preview URLs
    const newPreviews = files.map((file) => URL.createObjectURL(file));

    // Update previews
    setPreviews(newPreviews);

    // Directly set files in form state
    if (setValue) {
      setValue("images", files, {
        shouldValidate: true,
        shouldDirty: true,
      });
    }

    // If setImages is provided, update the images
    if (setImages) {
      setImages(files);
    }

    // Call the original handleImageUpload if needed
    handleImageUpload(e);
  };

  const removeImage = (indexToRemove: number) => {
    // Remove preview
    const newPreviews = previews.filter((_, index) => index !== indexToRemove);
    setPreviews(newPreviews);

    // Get current images from form state
    const currentImages = watch("images") || [];
    const newImages = currentImages.filter(
      (_, index) => index !== indexToRemove
    );

    // Update form state
    if (setValue) {
      setValue("images", newImages, {
        shouldValidate: true,
        shouldDirty: true,
      });
    }

    // Update local state if setImages exists
    if (setImages) {
      setImages(newImages);
    }
  };

  return (
    <div>
      <Input
        type="file"
        multiple
        accept="image/*"
        onChange={handleFileChange}
        className="w-full border rounded p-2 mb-4"
      />

      {errors.images && (
        <p className="text-red-500 text-sm mt-1">{errors.images.message}</p>
      )}

      {previews.length > 0 && (
        <div className="grid grid-cols-4 gap-4 mt-4">
          {previews.map((preview, index) => (
            <div key={index} className="relative">
              <img
                src={preview}
                alt={`Preview ${index + 1}`}
                width={100}
                height={100}
                className="w-full h-24 object-cover rounded"
              />
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1">
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
