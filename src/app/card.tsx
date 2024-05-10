// Card.tsx
import React from "react";

// Define the props type
type CardProps = {
  InnerComponent: React.ComponentType;
  onFlip: () => void;
  foregroundColor: React.CSSProperties["backgroundColor"];
  backgroundColor: React.CSSProperties["backgroundColor"];
  flipButtonClasses: string;
};

const Card: React.FC<CardProps> = ({
  InnerComponent,
  backgroundColor,
  foregroundColor,
  onFlip,
  flipButtonClasses,
}) => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div
        style={{ backgroundColor: backgroundColor }}
        className="flex flex-col justify-center items-center w-5/6 sm:w-3/4 lg:w-2/3 xl:w-1/2 z-10 shadow-xl min-h-[25%]"
      >
        <div
          style={{ backgroundColor: foregroundColor }}
          className="relative w-full bottom-[16px] right-[16px] p-[16px]"
        >
          <button
            className={`flex justify-end ${flipButtonClasses} p-3 rounded shadow-sm`}
            onClick={onFlip}
          >
            <img
              src={"/icons8-flip.svg"}
              alt="Flip icon by Icons8"
              className="h-6"
            />
          </button>
          <InnerComponent />
        </div>
      </div>
    </div>
  );
};

export default Card;
