"use client";

import { useState } from "react";
import Card from "./card";
import { EpochCardContent } from "./card-content/epoch-card-content";
import { DateCardContent } from "./card-content/date-card-content";

export default function Home() {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleCardFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div>
      <div className={`card ${isFlipped ? "flipped" : ""}`}>
        <div className="card-inner">
          <div
            className="card-front"
            style={{ pointerEvents: isFlipped ? "none" : "auto" }}
          >
            <Card
              InnerComponent={EpochCardContent}
              onFlip={handleCardFlip}
              foregroundColor={"rgb(216, 180, 254)"}
              backgroundColor={"rgb(168, 85, 247)"}
              flipButtonClasses="bg-purple-400 hover:bg-purple-500 active:bg-purple-600"
            />
          </div>
          <div
            className="card-back"
            style={{ pointerEvents: isFlipped ? "auto" : "none" }}
          >
            <Card
              InnerComponent={DateCardContent}
              onFlip={handleCardFlip}
              foregroundColor={"rgb(147, 197, 253)"}
              backgroundColor={"rgb(59, 130, 246)"}
              flipButtonClasses="bg-blue-400 hover:bg-blue-500 active:bg-blue-600"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
