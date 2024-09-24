import * as React from "react"
import { Label } from "./ui/label"

type WordBoxProps = {
	word: string
	onWordSelect: (word: string) => void // Recebe a função callback
}
export function WordBox({word, onWordSelect}: WordBoxProps) {

	const handleClick = () => {
		onWordSelect(word)
	}

	return (
	<div className="flex h-14 border-2 items-center justify-center px-3 cursor-pointer" onClick={handleClick}>
		<Label className="cursor-pointer">{word}</Label>
	</div>
	)
}

