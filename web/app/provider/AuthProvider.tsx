import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '@/lib/axios';
import { useRouter } from 'next/navigation';
import handleError from '@/lib/handleError';
import { toast } from "react-toastify";

interface AuthContextData {
  isAuthenticated: boolean;
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
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setIsAuthenticated(true);
    }

    router.push("/login");
  }, [router]);

  const login = async (email: string, password: string) => {
    try {
      const response = await api.post("auth/signIn", { email, password });
      const { token, id } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("userId", id);
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

      setIsAuthenticated(true);

      toast.success("Conta criada com sucesso!");

      router.push("/login");
    } catch (error) {
      handleError(error);
    }
  };

  const logout = async () => {
	  router.push("/login");
    await api.post("auth/logout", {
      userId: localStorage.getItem("userId"),
    });
    localStorage.removeItem("token");
    localStorage.removeItem("userId");

    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        registerUser,
        login,
        logout,
        setIsAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => useContext(AuthContext)
