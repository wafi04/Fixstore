import { Button } from "@/components/ui/button";
import { useGetAddress } from "@/features/api/address/address";
import { DialogAddress } from "@/features/components/dialog/address/Address";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trash2, MapPin } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { AddressData } from "@/types/user";
import { ScrollArea } from "@/components/ui/scroll-area";

export function AddressPage() {
  const { data, error, isLoading } = useGetAddress();

  const formatAddress = (address: AddressData) => {
    return `${address.street}, ${address.city}, ${address.state}, ${address.country} ${address.postalCode}`;
  };

  if (isLoading) {
    return (
      <div className="col-span-3 flex flex-col space-y-4">
        <div className="flex w-full justify-between items-center">
          <h1 className="text-2xl font-bold">Address</h1>
          <Button>Create</Button>
        </div>
        <div className="space-y-4 max-h-[500px] overflow-y-auto">
          {[1, 2, 3].map((_, index) => (
            <Skeleton key={index} className="h-[150px] w-full" />
          ))}
        </div>
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div className="col-span-3 flex flex-col items-center justify-center space-y-4">
        <h1 className="text-2xl font-bold">Address</h1>
        <p className="text-red-500">
          Failed to load addresses. Please try again.
        </p>
        <Button>Retry</Button>
      </div>
    );
  }

  return (
    <div className="col-span-3 flex flex-col space-y-4">
      <div className="flex w-full justify-between items-center">
        <h1 className="text-2xl font-bold">Address</h1>
        <DialogAddress>
          <Button>Create New Address</Button>
        </DialogAddress>
      </div>

      {data && data.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center py-8 border rounded-lg">
          <MapPin className="mx-auto mb-4 h-12 w-12 text-gray-400" />
          <p className="text-gray-600">No addresses found</p>
          <p className="text-sm text-gray-500">Add your first address</p>
        </div>
      ) : (
        <ScrollArea className="h-[500px] w-full">
          <div className="flex flex-col space-y-4 ">
            {data?.map((address) => (
              <Card key={address.id} className="relative w-full">
                {address.isDefault && (
                  <Badge
                    variant="outline"
                    className="absolute top-2 right-2 bg-green-100 text-green-800">
                    Default
                  </Badge>
                )}
                <CardHeader>
                  <CardTitle className="text-lg">
                    {address.country === "ID" && "INDONESIA"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600">
                      {formatAddress(address)}
                    </p>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  {/* <DialogAddress address={address}>
                    <Button variant="outline" size="icon" className="mr-2">
                      <Pencil className="h-4 w-4" />
                    </Button>
                  </DialogAddress> */}
                  <Button
                    variant="destructive"
                    size="icon"
                    // Tambahkan fungsi delete
                    // onClick={() => handleDeleteAddress(address.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </ScrollArea>
      )}
    </div>
  );
}
