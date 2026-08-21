import React, { useEffect, useState } from "react";
import { Button } from "../../../../../components/ui/button";
import ReactCardFlip from "react-card-flip";

function FlashCard({ active2 }) {
  const [isFlipped, setIsFlipped] = useState();
  const [cards, setCards] = useState(
    JSON.parse(localStorage.getItem("combinedChapterFlashCard"))
  );
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  const handleNextCard = () => {
    setCurrentCardIndex(
      (prevIndex) => (prevIndex + 1) % cards?.[active2]?.length
    );
    setIsFlipped(false);
  };

  const handlePrevCard = () => {
    setCurrentCardIndex((prevIndex) =>
      prevIndex === 0 ? cards?.[active2]?.length - 1 : prevIndex - 1
    );
    setIsFlipped(false);
  };

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <>
      {cards ? (
        <>
          <div className="flex flex-col items-center justify-center p-4">
            <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical">
              <div
                className="text-center p-4 bg-blue-500 text-foreground flex items-center justify-center rounded-lg curser-pointer shadow-lg h-[250px] w-[200px] md:h-[350px] md:w-[300px]"
                onClick={() => handleClick()}
              >
                <p className="curser-pointer">
                  {cards?.[active2]?.[currentCardIndex]?.front ||
                    "Content not available"}
                </p>
              </div>

              <div
                className="text-center p-4 bg-white text-blue-500 flex items-center justify-center rounded-lg curser-pointer shadow-lg h-[250px] w-[200px] md:h-[350px] md:w-[300px]"
                onClick={() => handleClick()}
              >
                <p className="curser-pointer">
                  {cards?.[active2]?.[currentCardIndex]?.back ||
                    "Content not available"}
                </p>
              </div>
            </ReactCardFlip>

            <div className="flex space-x-4 mt-6">
              <Button
                variant="outline"
                onClick={handlePrevCard}
                className="px-6 py-2"
              >
                Prev Card
              </Button>
              <Button
                variant="default"
                onClick={handleNextCard}
                className="px-6 py-2"
              >
                Next Card
              </Button>
            </div>

            <div className="mt-4 text-center text-gray-500">
              Card {currentCardIndex + 1} of {cards?.[active2]?.length}
            </div>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center p-4">
          <p className="text-center text-gray-500">No Cards Available</p>
          <Button
            onClick={() => (window.location.href = "/learn/recall")}
          >
            Go Back
          </Button>
        </div>
      )}
    </>
  );
}

export default FlashCard;
