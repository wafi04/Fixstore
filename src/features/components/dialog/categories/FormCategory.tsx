import { useState } from "react";
import { useForm } from "react-hook-form";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ImageIcon } from "lucide-react";
import { CategoryForm, CategoryUpdate } from "@/types/categories";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  useCreateCategory,
  useUpdateCategory,
} from "@/features/api/categories/category.query";
import { FormInput } from "@/components/ui/FormInput";

export function FormCategory({
  initialData,
  title,
  subTitle,
  open,
  onClose,
}: {
  initialData?: CategoryUpdate;
  title: string;
  parentId?: string;
  open: boolean;
  onClose: () => void;
  subTitle: string;
}) {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(
    (initialData?.image as string) || ""
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CategoryForm>({
    defaultValues: {
      name: initialData?.name || "",
      description: initialData?.description || "",
      images: null,
    },
  });

  const create = useCreateCategory();
  const update = useUpdateCategory(initialData?.id as string);
  const disabledButton = initialData ? update.isPending : create.isPending;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    console.log(file);
    if (file) {
      setImageFile(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  const onSubmit = async (data: CategoryForm) => {
    try {
      const formData = new FormData();

      const payload = {
        name: data.name,
        description: data.description,
      };

      formData.append("payload", JSON.stringify(payload));

      if (data.images || imageFile) {
        formData.append("images", imageFile as File, imageFile?.name);
      }
      if (initialData) {
        update.mutate(formData);
      } else {
        create.mutate(formData);
      }
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{subTitle}</DialogDescription>
        </DialogHeader>

        <Card className="w-full max-w-2xl mx-auto p-4 max-h-[50vh] overflow-y-auto">
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <FormInput
                  label="Name"
                  id="name"
                  register={register("name", {
                    required: "Name is required",
                    minLength: {
                      value: 2,
                      message: "Name must be at least 2 characters",
                    },
                  })}
                  error={errors.name}
                  placeholder="Category name"
                />

                <FormInput
                  label="Description"
                  id="description"
                  register={register("description", {
                    required: "Description is required",
                    minLength: {
                      value: 10,
                      message: "Description must be at least 10 characters",
                    },
                  })}
                  error={errors.description}
                  placeholder="Category Description"
                />
              </div>

              {/* Image Upload */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Image Upload</h3>
                <div className="space-y-2">
                  <Label htmlFor="image">Image</Label>
                  <div className="flex items-center gap-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => document.getElementById("image")?.click()}
                      className="w-full">
                      <ImageIcon className="w-4 h-4 mr-2" />
                      Select Image
                    </Button>
                    <Input
                      id="image"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageChange}
                    />
                  </div>
                  {imagePreview && (
                    <div className="mt-2">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        width={300}
                        height={200}
                        className="max-w-full h-48 object-cover rounded-md"
                      />
                    </div>
                  )}
                </div>
              </div>
              <Button
                type="submit"
                className="w-full"
                disabled={isSubmitting || disabledButton}>
                {isSubmitting
                  ? "Saving..."
                  : initialData
                  ? "Update Category"
                  : "Create Category"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
}
