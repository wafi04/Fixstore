"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { VariantsData } from "@/types/variants";
import { ColorDisplay } from "@/utils/ColorsDetails";
import { ButtonDialogVariants } from "../../dialog/variants/ButtonDialogVariants";

export function VariantsCard({ data }: { data: VariantsData }) {
  return (
    <Card className="w-full max-w-md">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4">
        <div className="flex-col">
          <h3 className="text-lg font-semibold">{data.product.name} </h3>
          <p>{data.product.subTitle}</p>
        </div>
        <ButtonDialogVariants inventory={data.inventory} variantId={data.id} />
      </CardHeader>

      <CardContent>
        {/* Image Carousel */}
        <Carousel className="w-full mb-2">
          <CarouselContent>
            {data.image.map((img) => (
              <CarouselItem key={img.id}>
                <div className="p-1  relative">
                  <Card>
                    <ColorDisplay
                      color={data.color}
                      className="absolute top-4 right-4 "
                    />
                    <img
                      src={img.url}
                      alt={`Variant image ${img.id}`}
                      width={400}
                      height={400}
                      className="rounded-md object-cover"
                    />
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          {data.image.length > 1 && (
            <>
              <CarouselPrevious />
              <CarouselNext />
            </>
          )}
        </Carousel>
        {/* Inventory Table */}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Size</TableHead>
              <TableHead className="text-right">Stock</TableHead>
              <TableHead className="text-right">Available</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.inventory.map((inv) => (
              <TableRow key={inv.size}>
                <TableCell className="font-medium">{inv.size}</TableCell>
                <TableCell className="text-right">{inv.stock}</TableCell>
                <TableCell className="text-right">
                  <Badge
                    variant={
                      inv.availableStock > 0 ? "default" : "destructive"
                    }>
                    {inv.availableStock}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>{" "}
      </CardContent>
    </Card>
  );
}
