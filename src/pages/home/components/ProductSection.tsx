"use client";
import { Button } from "@/components/ui/button";
import { Slider } from "./Slider";
import { Link } from "react-router-dom";

export function ProductSection() {
  const { data: product } = useGetAllProductsBySearch();
  return (
    <section className="px-[72px]  w-full h-full ">
      <HeaderMainPage title={"Featured Products"}>
        <Link to="/p">
          <Button>All Products</Button>
        </Link>
      </HeaderMainPage>

      <Slider data={product} />
    </section>
  );
}
