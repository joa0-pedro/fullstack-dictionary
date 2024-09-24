import { AxiosError } from "axios";
import { toast } from "react-toastify";

export default function handleError(error: unknown) {
	let message = "Erro inesperado"

	if(error instanceof AxiosError){
		const err = error as AxiosError<{ message: string}>;
		message = err.response?.data.message || ""
	}

	if(error instanceof AxiosError && error.response?.status === 401){
		localStorage.removeItem('token')

		message = error.response?.data.message
	}

    toast.error(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
    })
}
