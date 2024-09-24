"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

interface SearchBarProps {
	onSearchWords: (search?: string) => void
}

const formSchema = z.object({
	search: z.string().max(50),
  })

  type SearchFormData = z.infer<typeof formSchema>;

export default function SearchBar({onSearchWords }: SearchBarProps) {

	  const {
		register,
		handleSubmit,
	  } = useForm<SearchFormData>({
		resolver: zodResolver(formSchema),
	  });

	async function handleSearch(data: SearchFormData) {
		onSearchWords(data.search)
	}

	return (
			<div className="flex  pt-10 items-center justify-center space-x-2 ">
			<Input
				type="text"
				placeholder="Buscar uma palavra"
				className=" md:w-[40rem] lg:w-[55rem] xl:w-[65rem] sm:h-10 md:h-10 lg:h-10 xl:h-12 text-[#020817] dark:text-[#F8FAFC]"
				{...register('search')}
				/>
		<Button
				type="submit"
				onClick={handleSubmit(handleSearch)}
				className="ml-4 md:w-20 md:h-8 lg:w-24 lg:h-10 xl:w-36 xl:h-12">
				Buscar
			</Button>
	</div>

	)
}
