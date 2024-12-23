"use client";

interface CategoryPathProps {
  path: string;
}

const CategoryPath = ({ path }: CategoryPathProps) => {
  const segments = path.split("/").filter(Boolean);

  const mainCategory = segments[0]?.toLowerCase();
  const subCategory = segments[1]?.toLowerCase();

  const formatCategory = () => {
    if (!mainCategory) return "";

    let formatted =
      mainCategory === "women"
        ? "Women's"
        : mainCategory === "men"
        ? "Men's"
        : mainCategory.charAt(0).toUpperCase() + mainCategory.slice(1);

    if (subCategory) {
      formatted +=
        " " + subCategory.charAt(0).toUpperCase() + subCategory.slice(1);
    }

    return formatted;
  };

  return (
    <div className="text-[20px]  text-slate-900 mb-4">{formatCategory()}</div>
  );
};

export default CategoryPath;
