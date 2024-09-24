import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import { useForm } from "react-hook-form"
import { Input } from "./ui/input"

type FormItemControlProps = {
	name: string
	placeholder?: string
	type?: string
	form?: any
}
export default function FormItemControl({name, placeholder, type, form}:FormItemControlProps) {



	return (
		<FormField
		control={form.control}
		name={name}
		render={({ field }) => (
			<FormItem>
			<FormLabel>Username</FormLabel>
			<FormControl>
			  <Input type={type ?? "text"} placeholder={placeholder} {...field}/>
			</FormControl>
			<FormMessage />
		  </FormItem>
		)}
		/>
	)
}

