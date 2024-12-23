"use client";
import { ReactNode } from "react";

import { motion } from "framer-motion";
import { DynamicBreadcrumb } from "./DynamicBreadcumb";

interface HeaderDashboardProps {
  title: string;
  subTitle: string;
  children?: ReactNode;
}

export function HeaderDashboard({
  subTitle,
  title,
  children,
}: HeaderDashboardProps) {
  return (
    <section className="w-full bg-white/60 backdrop-blur-sm ">
      <div className="flex justify-between items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}>
          <DynamicBreadcrumb title={title} />

          <h1 className="text-3xl font-bold text-gray-800 mt-2">{title}</h1>
          <p className="text-muted-foreground">{subTitle}</p>
        </motion.div>

        {children && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}>
            {children}
          </motion.div>
        )}
      </div>
    </section>
  );
}
