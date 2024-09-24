import { useAuth } from "@/app/provider/AuthProvider";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function useAuthenticated(){
  const { isAuthenticated, setIsAuthenticated } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (!isAuthenticated && token) {
      setIsAuthenticated(true);
    }

    if (!token && pathname !== "/register") {
      router.push("/login");
      return;
    }

    if (token && userId && isAuthenticated && pathname === "/login") {
      router.push("/entries/en");
    }
  }, [isAuthenticated, pathname]);
}
