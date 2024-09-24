import { useAuth } from "@/app/provider/AuthProvider";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function useAuthenticated(){
  const { isAuthenticated, setIsAuthenticated, setUser } = useAuth(); // Atualizando o hook useAuth
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!isAuthenticated && token) {
      setUser('user');
      setIsAuthenticated(true);
    }

    if (!token) {
      router.push('/login');
      return;
    }

    if (isAuthenticated && pathname === '/login') {
      router.push('/entries/en');
    }

  }, [isAuthenticated, pathname]);
}
