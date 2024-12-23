"use client";
import { useForm } from "react-hook-form";
import { InitialDataRegister, InitialRegister } from "@/schema/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/PasswordInput";
import { Link } from "react-router-dom";
import { useRegisterMutation } from "@/features/api/auth/auth";

export function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InitialDataRegister>({
    resolver: zodResolver(InitialRegister),
    defaultValues: {
      email: "",
      name: "",
      password: "",
    },
  });

  const { mutate: registerUser, isPending } = useRegisterMutation();

  const onSubmit = (data: InitialDataRegister) => {
    registerUser(data);
  };

  return (
    <div className="relative h-screen  w-full overflow-hidden">
      <img
        src="/image1.avif"
        alt="Login background"
        width={500}
        height={500}
        className="absolute inset-0 w-full h-full object-cover brightness-75"
      />
      <div className="relative w-full justify-center h-full flex items-center">
        <Card className="w-full shadow-xl max-w-md p-8 bg-white/10 backdrop-blur-sm border-none">
          <CardHeader className="text-center space-y-1">
            <CardTitle className="text-3xl font-bold">Create Account</CardTitle>
            <p className="text-sm text-gray-400">
              Please sign up for an account
            </p>
          </CardHeader>
          <CardContent>
            <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
              <Input
                id="name"
                type="string"
                placeholder="Enter your name"
                {...register("name")}
                className={cn(
                  "text-white placeholder:pl-2",
                  errors && "border-red-500 focus:ring-red-500"
                )}
              />
              <Input
                id="email"
                type="string"
                placeholder="Enter your email"
                {...register("email")}
                className={cn(
                  "text-white placeholder:pl-2",
                  errors && "border-red-500 focus:ring-red-500"
                )}
              />
              <PasswordInput
                {...register("password")}
                placeholder="Enter Your Password"
                className={cn(
                  "text-white placeholder:pl-2",
                  errors && "border-red-500 focus:ring-red-500"
                )}
              />
              <Button type="submit" className="w-full" disabled={isPending}>
                {!isPending ? "loading...." : "Sign up"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="text-center">
            <p className="text-sm text-gray-400">
              Already have an account?{" "}
              <Link to="/auth/login" className="text-blue-400 hover:underline">
                Sign in
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
