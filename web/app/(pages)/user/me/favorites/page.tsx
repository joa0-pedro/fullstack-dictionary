"use client"

import Header from "@/components/Header"
import SearchBar from "@/components/SearchBar"
import { WordInfoCard, WordInfoCardProps } from "@/components/WordInfoCard"
import { WordListCard } from "@/components/WordListCard"
import { useEffect, useState } from "react"
import api from "@/lib/axios"
import handleError from "@/lib/handleError"

type SearchParams = {
  search?: string
  cursor?: string
  limit: number
}

type SearchResults = {
  results?: string[]
  cursor?: string
  hasNext: boolean
}

export default function Homes() {
  const [searchResults, setSearchResults] = useState<SearchResults>({ results: [], cursor: "", hasNext: false })
  const [selectedWordData, setSelectedWordData] = useState<WordInfoCardProps>()
  const [searchParams, setSearchParams] = useState<SearchParams>({ search: "", cursor: "", limit: 80 })
  const [loading, setLoading] = useState(false)

  const searchWords = async (searchTerm: string = "") => {
    const params: SearchParams = {
      search: searchTerm,
      cursor: "",
      limit: searchParams.limit,
    }

    try {
      const response = await fetchWords(params)
      setSearchResults({ results: response.results, cursor: response.next, hasNext: response.hasNext })
      setSearchParams(params)
    } catch (error) {
		handleError(error)
    }
  }

  const loadMoreWords = async () => {
    if (loading || !searchResults.cursor) return

    setLoading(true)
    try {
      const response = await fetchWords({ ...searchParams, cursor: searchResults.cursor })

      setSearchResults(prev => ({
        results: [...(prev.results || []), ...response.results],
        cursor: response.next,
        hasNext: response.hasNext,
      }))
    } catch (error) {
		handleError(error)
    } finally {
      setLoading(false)
    }
  }

  const handleWordSelect = async (word: string) => {
    try {
      const response = await api.get(`entries/en/${word}`)
      setSelectedWordData(response.data[0])
    } catch (error) {
      handleError(error)
    }
  }

  useEffect(() => {
    searchWords("")
  }, [])

  return (
    <>
      <Header />
      <SearchBar onSearchWords={searchWords} />
      <div className="flex flex-col w-full h-full md:flex-row justify-center md:space-x-6 mt-2 px-3">
        <WordInfoCard meanings={selectedWordData?.meanings} phonetics={selectedWordData?.phonetics} word={selectedWordData?.word} onFavoritePage={true}/>
        <WordListCard
          results={searchResults?.results}
          title="Palavras Favoritadas"
          onWordSelect={handleWordSelect}
          onLoadMore={loadMoreWords}
		  hasNextPage={searchResults.hasNext}

        />
      </div>
    </>
  )
}

async function fetchWords(params: SearchParams) {
  const { search, cursor, limit } = params
  const response = await api.get(`user/me/favorites/?search=${search}&cursor=${cursor}&limit=${limit}`)

  return response.data
}

