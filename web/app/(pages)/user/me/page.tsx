"use client";

import Header from "@/components/Header";
import api from "@/lib/axios";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Input } from "@/components/ui/input";

type UserDataType = {
  user: {
    name: string;
    email: string;
    created_at: string;
  };
  historicCount: number;
  favoriteWordCount: number;
};

export default function Page() {
  const [userData, setUserData] = useState<UserDataType>();

  const fetchUserData = async () => {
    const response = await api.get(`/user/${localStorage.getItem("userId")}`);

    setUserData(response.data);
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <>
      <Header />
      <div className="flex flex-col justify-center w-full h-full px-3 mt-2 md:flex-row md:space-x-6">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Perfil</CardTitle>
            <CardDescription>
              Visualize algumas informações sobre sua conta
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col space-y-4 md:flex-row lg:flex-row xl:flex-row">
            <div className="flex flex-col w-[100%] md:w-[50%] lg:w-[50%] xl:w-[50%] h-full space-y-6">
              <div>
                <Label>Nome</Label>
                <Input value={userData?.user.name} disabled />
              </div>
              <div>
                <Label>E-mail</Label>
                <Input value={userData?.user.email} disabled />
              </div>
              <div>
                <Label>Primeiro acesso em</Label>
                <Input value={userData?.user.created_at} disabled />
              </div>
            </div>

            <div className="flex w-[100%] md:w-[50%] lg:w-[50%] xl:w-[50%] justify-end space-x-8">
              <Card className="flex w-[50%] md:w-[40%] lg:w-[40%] xl:w-[40%] justify-center p-6 flex-col ">
                <CardTitle className="flex justify-center w-full text-2xl text-center">
                  Palavras Favoritadas
                </CardTitle>
                <Label className="flex justify-center w-full mt-4 text-8xl">
                  {userData?.favoriteWordCount}
                </Label>
              </Card>
              <Card className="flex w-[50%] md:w-[40%] lg:w-[40%] xl:w-[40%] justify-center p-6 flex-col ">
                <CardTitle className="flex justify-center w-full text-2xl text-center">
                  Palavras Visualizadas
                </CardTitle>
                <Label className="flex justify-center w-full mt-4 text-8xl">
                  {userData?.historicCount}
                </Label>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
