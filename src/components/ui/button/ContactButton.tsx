import * as React from "react";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

interface ContactButtonProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export const ContactButton: React.FC<ContactButtonProps> = ({
  href,
  children,
  className,
}) => {
  return (
    <a
      href={href}
      className={cn(
        "inline-flex items-center  justify-between gap-2 w-[calc(100%-70px)] px-4 py-2 rounded-md",
        "transition-all duration-300 ease-out",
        "border-2 bg-black  hover:border-white bg-transparent",
        "hover:bg-white hover:border-white",
        "group relative",
        "text-white hover:text-black font-medium",
        "shadow-[0px_0px_0px_black] hover:shadow-[8px_8px_8px_black]",
        "active:translate-x-[2px] active:translate-y-[2px]",
        "active:shadow-none",
        className
      )}>
      <div className="absolute left-4 transform -translate-x-8 opacity-0 transition-all duration-300 ease-out group-hover:translate-x-0 group-hover:opacity-100">
        <ArrowRight className="w-4 h-4" />
      </div>
      <span className="relative z-10 transform transition-all duration-300 ease-out group-hover:translate-x-6">
        {children}
      </span>
      <div className="transform translate-x-0 opacity-100 transition-all duration-300 ease-out group-hover:-translate-x-8 group-hover:opacity-0">
        <ArrowRight className="w-4 h-4" />
      </div>
    </a>
  );
};
