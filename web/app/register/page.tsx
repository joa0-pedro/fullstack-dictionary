'use client'
import { useAuth } from "../provider/AuthProvider"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import handleError from "@/lib/handleError"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { z } from "zod"

 const signUpFormSchema = z.object({
	name: z
	  .string()
	  .min(2, { message: 'Nome deve conter no mínimo 2 caracteres.' })
	  .trim(),
	email: z.string().email({ message: 'Insira um email valido.' }).trim(),
	password: z
	  .string()
	  .min(8, { message: 'A senha deve conter no mínimo 8 caracteres' })
	  .regex(/[a-zA-Z]/, { message: 'Deve conter ao menos 1 letra.' })
	  .regex(/[0-9]/, { message: 'Deve conter ao menos 1 numero.' })
	  .regex(/[^a-zA-Z0-9]/, {
		message: 'Deve conter ao menos 1 caractere especial.',
	  })
	  .trim(),
  })

  type LoginFormData = z.infer<typeof signUpFormSchema>;


export default function Register() {
	const { registerUser } = useAuth();
	const router = useRouter();

	const {
	  register,
	  handleSubmit,
	  formState: { errors },
	} = useForm<LoginFormData>({
	  resolver: zodResolver(signUpFormSchema),
	});
	const handleRegister = async (data: LoginFormData) => {
		try {
		  await registerUser(data.name, data.email, data.password);
		} catch (e) {
		   handleError(e)
		}
	  };

	  const handleRedirectToRegister = () => {
		router.push('/login');
	}

  return (
  <div className="flex justify-center flex-col items-center">
	<div className="flex flex-col items-center mt-8 mb-36">
	    <Label className="text-5xl mb-5">Dictionary</Label>
	    <Label className="text-3xl ">O seu dicionário ingles online</Label>
	</div>
    <Card className="w-[25%] ">
      <CardHeader>
        <CardTitle className="text-2xl">Cadastrar</CardTitle>
        <CardDescription>
          Insira os dados necessários para cadastrar sua conta.
        </CardDescription>
      </CardHeader>
	  <CardContent className="grid gap-4">
	  <div className="grid gap-2">
          <Label>Nome</Label>
          <Input type="text" required {...register('name')}/>
          {errors.name && <Label className="text-red-500">{errors.name.message}</Label>}
        </div>
        <div className="grid gap-2">
          <Label >Email</Label>
          <Input type="email" placeholder="m@example.com" required {...register('email')}/>
          {errors.email && <Label className="text-red-500">{errors.email.message}</Label>}
        </div>
        <div className="grid gap-2">
          <Label {...register('password')}>Senha</Label>
          <Input type="password" required {...register('password')}/>
		  {errors.password && <Label className="text-red-500">{errors.password.message}</Label>}
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-2">
        <Button className="w-full" onClick={handleSubmit(handleRegister)}>Cadastrar</Button>
		<div className="w-full border-y border-[#D1D5DB] my-2"/>
		<Label>Já possui uma conta?</Label>
        <Button className="w-full" onClick={handleRedirectToRegister}>Fazer login</Button>
      </CardFooter>
    </Card>
  </div>
  )
}
