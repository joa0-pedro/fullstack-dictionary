"use client"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useTheme } from "next-themes"
import { Laptop, Menu, MoonIcon, SunIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/app/provider/AuthProvider"

export default function DropdownIconMenu() {
	const {logout } = useAuth()
	const { setTheme } = useTheme()
	const router = useRouter()

	const handleRedirect = (route: string) => {
		router.push(route)
	}

	const handleLogout =  () => {
		logout()
	}

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Menu className=" cursor-pointer text-[#020817] dark:text-[#F8FAFC]" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
        <DropdownMenuItem onClick={() => handleRedirect("/user/me")}>
          Perfil
        </DropdownMenuItem>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <span>Tema</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuItem onClick={() => setTheme("light")}>
                <div className="flex flex-row gap-x-2">
                  <SunIcon className="h-[1.2rem] w-[1.2rem]" />
                  Light
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                <div className="flex flex-row gap-x-2">
                  <MoonIcon className="h-[1.2rem] w-[1.2rem]" />
                  Dark
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                <div className="flex flex-row gap-x-2">
                  <Laptop />
                  Padrão do Sistema
                </div>
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => handleRedirect("/entries/en")}>
            Lista de Palavras
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleRedirect("/user/me/history")}>
            Histórico
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => handleRedirect("/user/me/favorites")}
          >
            Palavras Favoritas
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => handleLogout()}>Sair</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
