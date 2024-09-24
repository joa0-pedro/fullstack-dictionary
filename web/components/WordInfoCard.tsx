import * as React from "react"
import { Card } from "@/components/ui/card"
import { Label } from "./ui/label"
import { Play } from "lucide-react"
import { Progress } from "./ui/progress"
import { Button } from "./ui/button"
import api from "@/lib/axios"
import handleError from "@/lib/handleError"
import { useEffect, useState, useRef } from "react";

export interface WordInfoCardProps {
  word?: string
  phonetics?: Phonetic[]
  meanings?: Meaning[]
  onFavoritePage?: boolean
}

interface Phonetic {
  audio: string
  text?: string
}

interface Meaning {
  partOfSpeech: string
  definitions: Definition[]
  synonyms: string[]
  antonyms: string[]
}

interface Definition {
  definition: string
  synonyms: string[]
  antonyms: string[]
  example?: string
}

export function WordInfoCard({ word, phonetics, meanings, onFavoritePage }: WordInfoCardProps) {
  const [meaningIndex, setMeaningIndex] = useState(0);
  const [definitionIndex, setDefinitionIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [isFavorite, setIsFavorite] = useState(onFavoritePage);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    setIsFavorite(false);
  }, [word]);

  if (!word || !phonetics || !meanings) {
    return null;
  }

  const currentMeaning = meanings?.[meaningIndex];
  const currentDefinition = currentMeaning?.definitions?.[definitionIndex];
  const currentAudio =
    phonetics?.find((phonetic) => phonetic.audio)?.audio || "";

  const handlePlayAudio = () => {
    if (audioRef.current) {
      if (!audioPlaying) {
        audioRef.current.play();
        setAudioPlaying(true);
        return;
      }
      audioRef.current.pause();
      setAudioPlaying(false);
    }
  };

  const handleAudioTimeUpdate = () => {
    if (audioRef.current) {
      const duration = audioRef.current.duration;
      const currentTime = audioRef.current.currentTime;
      const progressValue = (currentTime / duration) * 100;
      setProgress(progressValue);
    }
  };

  const handleAudioEnded = () => {
    setProgress(0);
    setAudioPlaying(false);
  };

  const handleNextDefinition = () => {
    if (definitionIndex < currentMeaning.definitions.length - 1) {
      setDefinitionIndex(definitionIndex + 1);
    } else if (meaningIndex < meanings.length - 1) {
      setMeaningIndex(meaningIndex + 1);
      setDefinitionIndex(0);
    }
  };

  const handlePrevDefinition = () => {
    if (definitionIndex > 0) {
      setDefinitionIndex(definitionIndex - 1);
    } else if (meaningIndex > 0) {
      setMeaningIndex(meaningIndex - 1);
      setDefinitionIndex(meanings[meaningIndex - 1].definitions.length - 1);
    }
  };

  const handleFavoriteWord = async () => {
    try {
      if (isFavorite) {
        await api.delete(`entries/en/${word}/unfavorite`);
        setIsFavorite(false);
      }

      await api.post(`entries/en/${word}/favorite`);
      setIsFavorite(true);
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <>
      {word && (
        <Card className="md:w-[40%] md:h-[75vh] mt-7 px-9 space-y-3 py-3">
          <Card className="flex flex-col text-center py-6 justify-center md:h-[50%]">
            <Label className="text-2xl md:text-4xl">{word}</Label>
            <Label className="text-lg md:text-2xl">{phonetics[1]?.text}</Label>
          </Card>
          {currentAudio ? (
            <div className="flex flex-row items-center space-x-4 md:h-[10%]">
              <Play color="#3B82F6" onClick={handlePlayAudio} />
              <Progress value={progress} />
            </div>
          ) : (
            <div className="md:h-[10%] sm:h-0" />
          )}
          <audio
            ref={audioRef}
            src={currentAudio}
            onTimeUpdate={handleAudioTimeUpdate}
            onEnded={handleAudioEnded}
          />
          {currentMeaning && currentDefinition && (
            <div className="flex flex-col md:h-[25%]">
              <Label className="text-lg md:text-2xl">Meanings</Label>
              <Label className="text-sm md:text-lg">
                {currentMeaning.partOfSpeech} - {currentDefinition.definition}
              </Label>
              {currentDefinition.example && (
                <Label className="text-sm italic md:text-lg">
                  {currentDefinition.example}
                </Label>
              )}
            </div>
          )}
          <div className="flex justify-between">
            <Button
              className="md:w-20 md:h-8 lg:w-24 lg:h-10 xl:w-36 xl:h-14"
              onClick={handlePrevDefinition}
              disabled={meaningIndex === 0 && definitionIndex === 0}
            >
              Voltar
            </Button>
            <Button
              className="p-4 md:w-20 md:h-8 lg:w-24 lg:h-10 xl:w-36 xl:h-14"
              onClick={handleFavoriteWord}
            >
              {isFavorite ? "Desfavoritar" : "Favoritar"}
            </Button>
            <Button
              className="md:w-20 md:h-8 lg:w-24 lg:h-10 xl:w-36 xl:h-14"
              onClick={handleNextDefinition}
              disabled={
                meaningIndex === meanings.length - 1 &&
                definitionIndex === currentMeaning.definitions.length - 1
              }
            >
              Próximo
            </Button>
          </div>
        </Card>
      )}
    </>
  );
}
