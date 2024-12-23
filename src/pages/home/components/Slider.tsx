"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ProductWithCategory } from "@/types/products";
import EachUtils  from "@/utils/EachUtils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export function Slider({ data }: { data: ProductWithCategory[] }) {
  const [startIndex, setStartIndex] = useState(0);

  const nextSlide = () => {
    setStartIndex((prevIndex) =>
      prevIndex + 4 >= data.length ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setStartIndex((prevIndex) =>
      prevIndex === 0 ? Math.max(0, data.length - 4) : prevIndex - 1
    );
  };

  const visibleItems = data.slice(startIndex, startIndex + 4);
  return (
    <div className="relative w-full py-8">
      <div className="flex space-x-6">
        <EachUtils
          of={visibleItems}
          render={(item) => <SliderData key={item.id} item={item} />}
        />
      </div>

      <Button
        variant="outline"
        size="icon"
        className="absolute top-1/2 -left-4 transform -translate-y-1/2 rounded-full shadow-md"
        onClick={prevSlide}
        disabled={startIndex === 0}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="absolute top-1/2 -right-4 transform -translate-y-1/2 rounded-full shadow-md"
        onClick={nextSlide}
        disabled={startIndex + 4 >= data.length}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}

export function SliderData({ item }: { item: ProductWithCategory }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card
      className="w-[280px] overflow-hidden rounded-xl shadow-sm transition-all duration-300 hover:shadow-lg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardContent className="p-0">
        <Link href={`/p/${item.id}`}>
        <div className="relative h-[280px] w-full overflow-hidden">
          <Image
            src={item.images[0]}
            alt={item.name}
            layout="fill"
            objectFit="cover"
            className="transform transition-transform duration-500 ease-out"
            style={{ transform: isHovered ? "scale(1.2)" : "scale(1)" }}
            />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-white/500" />
          <h3 className="absolute bottom-4 left-4 text-md text-white">
            {item.name}
          </h3>
        </div>
            </Link>
      </CardContent>
    </Card>
  );
}
