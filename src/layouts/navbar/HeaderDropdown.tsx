import { useState, ReactNode } from "react";
import { motion } from "framer-motion";
import { WithChildren } from "@/types/interfaces";
import { CategoryData } from "@/types/categories";
interface HeaderDropdownProps {
  children: ReactNode;
  categories: CategoryData;
}
const HeaderDropdown = ({ children, categories }: HeaderDropdownProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className=" flex items-center "
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>
      {children}
      {isHovered && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="font-monserrat  uppercase absolute left-0 top-full w-[calc(100vw-17px)] bg-white shadow-lg z-50">
          <div className="container mx-auto py-8 px-4 ">
            <div className="grid grid-cols-4 gap-8">
              <div className="col-span-1">
                <a
                  href={`/${categories.name}`}
                  className="text-md hover:underline">
                  All Categories
                </a>
              </div>
              <div className="col-span-3">
                <div className="grid grid-cols-3 gap-4">
                  {categories.children &&
                    categories.children.map((category) => (
                      <div key={category.id}>
                        <a
                          href={`/c/${category.name}`}
                          className=" hover:underline">
                          {category.name}
                        </a>
                        {category.children && (
                          <ul className="">
                            {category.children.map((subCategory) => (
                              <li key={subCategory.id}>
                                <a
                                  href={`/c/${subCategory.name}`}
                                  className={`${
                                    subCategory.depth === 1
                                      ? "text-md"
                                      : "text-sm"
                                  } hover:underline  h-fit`}>
                                  {subCategory.name}
                                </a>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default HeaderDropdown;
