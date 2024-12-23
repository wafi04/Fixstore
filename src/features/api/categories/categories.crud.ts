import { BASE_URL } from "@/constants";
// import { storage } from "@/lib/firebase";
import { CategoryForm } from "@/types/categories";
// import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { toast } from "sonner";
export class CategoriesService {
  // private async uploadImage(file: File): Promise<string> {
  //   try {
  //     const storageRef = ref(storage, `images/${file.name}`);
  //     await uploadBytes(storageRef, file);
  //     const downloadURL = await getDownloadURL(storageRef);
  //     return downloadURL;
  //   } catch (error) {
  //     toast.error("Error uploading image");
  //     throw error;
  //   }
  // }

  // private async getImageUrl(
  //   image: string | File | null
  // ): Promise<string | null> {
  //   if (image instanceof File) {
  //     return this.uploadImage(image);
  //   } else if (typeof image === "string") {
  //     return image;
  //   }
  //   return null;
  // }

  async create(create: CategoryForm) {
    const processedData = { ...create };

    // Process image upload first
    // let imageUrl: string | null = null;
    // if (processedData.image) {
    //   imageUrl = await this.getImageUrl(processedData.image);
    // }

    const req = await fetch(`${BASE_URL}/api/category`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        parentId: processedData.parentId,
        name: processedData.name,
        description: processedData.description,
        // image: imageUrl,
        metaDescription: processedData.metaDescription,
        metaTitle: processedData.metaTitle,
      }),
    });

    if (!req.ok) {
      toast.error("Error creating category");
      throw new Error("Failed to create category");
    }

    return await req.json();
  }

  async getCategory() {
    const res = await fetch(`${BASE_URL}/api/category`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      toast.error("Error fetching categories");
      throw new Error("Failed to fetch categories");
    }

    return await res.json();
  }

  async updateCategory(category: CategoryForm) {
    const processedData = { ...category };
    console.log(category);

    // Process image upload first
    // let imageUrl: string | null = null;
    // if (processedData.image) {
    //   imageUrl = await this.getImageUrl(processedData.image);
    // }

    const req = await fetch(`${BASE_URL}/api/category/${category.id}`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: processedData.name,
        description: processedData.description,
        // image: imageUrl,
        metaDescription: processedData.metaDescription,
        metaTitle: processedData.metaTitle,
      }),
    });

    if (!req.ok) {
      toast.error("Error updating category");
      throw new Error("Failed to update category");
    }

    return await req.json();
  }

  async Delete(categoryId: string) {
    const req = await fetch(`${BASE_URL}/api/category/${categoryId}`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!req.ok) {
      toast.error("Error updating category");
      throw new Error("Failed to update category");
    }

    return await req.json();
  }
}
