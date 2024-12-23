import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
export function Loading() {
  return (
    <motion.div
      className="h-screen w-full flex justify-center items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}>
      <Loader2 className="text-4xl text-blue-500 animate-spin" />
    </motion.div>
  );
}
