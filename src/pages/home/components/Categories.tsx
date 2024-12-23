"use client";
import { useGetCategory } from "@/features/api/categories/category.query";
import { ContactButton } from "@/components/ui/button/ContactButton";
import { CategoryData } from "@/types/categories";

const Categories = () => {
  const { category } = useGetCategory();

  return (
    <section className="px-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {category &&
        category.map((item: CategoryData, index: number) => (
          <div key={index} className="relative group overflow-hidden">
            <img
              src={item.image as string}
              alt={item.name}
              width={500}
              height={500}
              className="h-[70vh] object-cover w-full transition-transform duration-500 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-black/20 transition-opacity duration-300 group-hover:opacity-40" />

            <div className="absolute inset-x-0 bottom-0 flex justify-center pb-10">
              <ContactButton href={`${item.name}`}>{item.name}</ContactButton>
            </div>
          </div>
        ))}
    </section>
  );
};

export default Categories;
