"use client";

import React, { useState } from "react";
import { useAuth } from "../provider/AuthProvider";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { Form } from "@/components/ui/form";
import { Eye, EyeOff } from "lucide-react";

const LoginSchema = z.object({
  email: z.string().email({ message: "Insira um email valido." }).trim(),
  password: z
    .string()
    .min(8, { message: "A senha deve conter no mínimo 8 caracteres" })
    .trim(),
});

type LoginFormData = z.infer<typeof LoginSchema>;

export default function Page() {
  const { login } = useAuth();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(LoginSchema),
  });

  const handleLogin = async (data: LoginFormData) => {
    return login(data.email, data.password);
  };

  const handleRedirectToRegister = () => {
    router.push("/register");
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-col items-center mt-8 mb-36">
        <Label className="mb-5 text-5xl text-[#020817] dark:text-[#F8FAFC]">
          Dictionary
        </Label>
        <Label className="text-3xl text-[#020817] dark:text-[#F8FAFC]">
          O seu dicionário ingles online
        </Label>
      </div>
      <Card className="w-[25%] ">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Insira um email para entrar na sua conta.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleLogin)}>
              <div className="grid gap-2">
                <Label>E-mail</Label>
                <Input type="email" {...register("email")} />
                {errors.email && (
                  <Label className="text-red-500">{errors.email.message}</Label>
                )}
                <Label>Senha</Label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    {...register("password")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute text-gray-500 right-2 top-2 dark:text-gray-400"
                  >
                    {showPassword ? <EyeOff /> : <Eye />}
                  </button>
                </div>
                {errors.password && (
                  <Label className="text-red-500">
                    {errors.password.message}
                  </Label>
                )}
              </div>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          <Button className="w-full" onClick={handleSubmit(handleLogin)}>
            Entrar
          </Button>
          <div className="w-full border-y border-[#D1D5DB] my-2" />
          <Label>Novo aqui?</Label>
          <Button className="w-full bg" onClick={handleRedirectToRegister}>
            Cadastrar
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
