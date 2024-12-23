"use client";
import { Fragment, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronDown, ChevronRight, Image as ImageIcon } from "lucide-react";
import { CategoryData } from "@/types/categories";
import { HandleOther } from "../../../features/components/dialog/categories/HandleActionsCategory";
import { useGetCategory } from "@/features/api/categories/category.query";

export function CategoriesDataPage() {
  const { category, error, isLoading } = useGetCategory();
  console.log(category);
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 p-6">
        Error loading categories: {error.message}
      </div>
    );
  }

  if (!category || category.length === 0) {
    return (
      <div className="text-center text-gray-500 p-6">No categories found</div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {category.map((category: CategoryData, index: number) => (
        <Fragment key={index}>
          <CategoryCard isChildren={false} category={category} depth={0} />
        </Fragment>
      ))}
    </div>
  );
}

const CategoryCard = ({
  category,
  depth,
  isChildren,
}: {
  category: CategoryData;
  depth: number;
  isChildren: boolean;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasChildren = category.children && category.children.length > 0;

  return (
    <>
      <Card
        className={`${
          isChildren ? "bg-gray-50" : "bg-white"
        } hover:shadow-lg transition-all`}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 p-3">
          <CardTitle className="text-lg font-medium flex items-center justify-between w-full">
            <div className="flex items-center gap-2 ">
              {hasChildren && (
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="focus:outline-none hover:bg-gray-100 rounded-full p-1">
                  {isExpanded ? (
                    <ChevronDown className="w-4 h-4" />
                  ) : (
                    <ChevronRight className="w-4 h-4" />
                  )}
                </button>
              )}
              {category.name}
            </div>
            <HandleOther
              id={category.id}
              description={category.description}
              image={category.image as string}
              metaDescription={category.metaDescription}
              metaTitle={category.metaTitle}
              name={category.name}
            />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {category.image && (
              <div className="relative w-full h-48 rounded-lg overflow-hidden">
                <img
                  src={category.image}
                  width={500}
                  height={500}
                  alt={category.name}
                  className="object-cover w-full h-full"
                />
              </div>
            )}
            {!category.image && (
              <div className="flex items-center justify-center w-full h-48 bg-gray-100 rounded-lg">
                <ImageIcon className="w-12 h-12 text-gray-400" />
              </div>
            )}
            <div className="space-y-2">
              <p className="text-sm text-gray-500">
                {category.description || "-"}
              </p>
              {category.metaTitle && (
                <p className="text-xs text-gray-400">
                  Meta Title: {category.metaTitle}
                </p>
              )}
              {category.metaDescription && (
                <p className="text-xs text-gray-400">
                  Meta Desc: {category.metaDescription}
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
      {isExpanded && hasChildren && (
        <div className="pl-4 space-y-4 mt-4">
          {category.children!.map((childCategory) => (
            <CategoryCard
              key={childCategory.id}
              isChildren={true}
              category={childCategory}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default CategoriesDataPage;
