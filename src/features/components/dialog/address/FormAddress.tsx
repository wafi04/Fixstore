import { useState } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddressSchema, AddressDto } from "@/schema/address";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  useGetProvincies,
  useGetCities,
  useCreateAddress,
} from "@/features/api/address/address";
import { COUNTRIES } from "@/constants";
import { FormInput } from "@/components/ui/FormInput";

export default function FormAddress() {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedProvince, setSelectedProvince] = useState("");

  const provincies = useGetProvincies();
  const create = useCreateAddress();
  const cities = useGetCities(selectedProvince);

  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<AddressDto>({
    resolver: zodResolver(AddressSchema),
    defaultValues: {
      country: "",
      state: "",
      city: "",
      street: "",
      postalCode: "",
      isDefault: false,
    },
  });

  const onSubmit: SubmitHandler<AddressDto> = (data) => {
    console.log(data);
    create.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Country</label>
        <Controller
          name="country"
          control={control}
          render={({ field }) => (
            <Select
              onValueChange={(value) => {
                field.onChange(value);
                setSelectedCountry(value);
                setValue("state", "");
                setValue("city", "");
                setSelectedProvince("");
              }}
              value={field.value}>
              <SelectTrigger>
                <SelectValue placeholder="Select country" />
              </SelectTrigger>
              <SelectContent>
                {COUNTRIES.map((country) => (
                  <SelectItem key={country.id} value={country.id}>
                    {country.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Province/State</label>
        <Controller
          name="state"
          control={control}
          render={({ field }) => (
            <Select
              onValueChange={(value) => {
                field.onChange(value);
                setSelectedProvince(value);
                setValue("city", "");
              }}
              value={field.value}
              disabled={!selectedCountry || provincies.isLoading}>
              <SelectTrigger>
                <SelectValue placeholder="Select province" />
              </SelectTrigger>
              <SelectContent>
                {provincies.data.map((province) => (
                  <SelectItem key={province.id} value={province.id}>
                    {province.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        {provincies.isLoading && <p>Loading provinces...</p>}
        {provincies.error && <p>Error loading provinces</p>}
      </div>
      {cities && (
        <div className="space-y-2">
          <label className="text-sm font-medium">City</label>
          <Controller
            name="city"
            control={control}
            render={({ field }) => (
              <Select
                onValueChange={field.onChange}
                value={field.value}
                disabled={!selectedProvince || cities.isLoading}>
                <SelectTrigger>
                  <SelectValue placeholder="Select city" />
                </SelectTrigger>
                <SelectContent>
                  {cities.data.map((city) => (
                    <SelectItem key={city.id} value={city.id}>
                      {city.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {cities.isLoading && <p>Loading cities...</p>}
          {cities.error && <p>Error loading cities</p>}
        </div>
      )}
      <FormInput
        label="Street"
        placeholder="Enter Street Place"
        {...register("street")}
        error={
          errors.street && (
            <p className="text-sm text-red-500">{errors.street.message}</p>
          )
        }
      />
      <FormInput
        label="Postal Code"
        placeholder="Enter postal code"
        {...register("postalCode")}
        error={
          errors.postalCode && (
            <p className="text-sm text-red-500">{errors.postalCode.message}</p>
          )
        }
      />

      <Button type="submit" className="w-full">
        Save Address
      </Button>
    </form>
  );
}
