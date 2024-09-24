import * as React from "react"
import { Label } from "./ui/label"

type WordBoxProps = {
  word: string;
  onWordSelect: (word: string) => void;
};
export function WordBox({word, onWordSelect}: WordBoxProps) {

	const handleClick = () => {
		onWordSelect(word)
	}

	return (
    <div
      className="flex items-center justify-center px-3 border-2 cursor-pointer h-14"
      onClick={handleClick}
    >
      <Label className="cursor-pointer">{word}</Label>
    </div>
  );
}

