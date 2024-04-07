// Card.tsx
import React from "react";

// Define the props type
type CardProps = {
  InnerComponent: React.ComponentType;
};

const Card: React.FC<CardProps> = ({ InnerComponent }) => {
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="relative flex flex-col justify-center items-center h-5/6 w-5/6 sm:h-3/4 sm:w-3/4 lg:h-2/3 lg:w-2/3 xl:w-1/2 2xl:h-1/2 bg-purple-500 z-10 shadow-xl">
        <div className="absolute w-full h-full bg-purple-300 bottom-[16px] right-[16px]">
          <InnerComponent />
        </div>
      </div>
    </div>
  );
};

export default Card;
