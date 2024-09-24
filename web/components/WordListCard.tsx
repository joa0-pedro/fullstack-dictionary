import * as React from "react"
import { Card } from "@/components/ui/card"
import { Label } from "./ui/label"
import { WordBox } from "./WordBox"

type WordDataProps = {
  results?: string[]
  title: string
  onWordSelect: (word: string) => void
  onLoadMore: () => void
  hasNextPage: boolean
}

export function WordListCard({ results, title, onWordSelect, onLoadMore, hasNextPage }: WordDataProps) {
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget

    if (scrollTop + clientHeight >= scrollHeight - 10 && hasNextPage) {
      onLoadMore()
    }
  }

  return (
    <Card className="md:w-[60%] md:h-[75vh] h-[45vh] mt-7 px-5 pt-4 py-3">
      <Label className="flex justify-center text-lg mb-4 md:text-2xl">{title}</Label>
      <div className="h-[90%] w-[100%] rounded-md border p-4 overflow-auto" onScroll={handleScroll}>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2">
          {results?.map((word, key) => (
            <div key={key}>
              <WordBox word={word} onWordSelect={onWordSelect} />
            </div>
          ))}
        </div>
      </div>
    </Card>
  )
}
