import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '@/lib/axios';
import { useRouter } from 'next/navigation';
import handleError from '@/lib/handleError';
import { toast } from "react-toastify";

interface AuthContextData {
  user: string | null;
  isAuthenticated: boolean;
  setUser: React.Dispatch<React.SetStateAction<string | null>>;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  registerUser: (
    name: string,
    email: string,
    password: string
  ) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setUser("user");
      setIsAuthenticated(true);
    }
    console.log("auth ");

    router.push("/login");
  }, [router]);

  const login = async (email: string, password: string) => {
    try {
      const response = await api.post("auth/signIn", { email, password });
      const { token } = response.data;

      localStorage.setItem("token", token);
      setUser("user");
      setIsAuthenticated(true);
      router.push("/entries/en");
    } catch (error) {
      handleError(error);
    }
  };

  const registerUser = async (
    name: string,
    email: string,
    password: string
  ) => {
    try {
      const response = await api.post("auth/signUp", { name, email, password });

      const { token } = response.data;
      localStorage.setItem("token", token);

      setUser(email);
      setIsAuthenticated(true);

      toast.success("Conta criada com sucesso!");

      router.push("/login");
    } catch (error) {
      handleError(error);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setUser(null);
    router.push("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        registerUser,
        login,
        logout,
        setUser,
        setIsAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => useContext(AuthContext)
