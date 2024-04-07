// Card.tsx
import React from "react";

// Define the props type
type CardProps = {
  InnerComponent: React.ComponentType;
};

const Card: React.FC<CardProps> = ({ InnerComponent }) => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="flex flex-col justify-center items-center w-5/6 sm:w-3/4 lg:w-2/3 xl:w-1/2 bg-purple-500 z-10 shadow-xl min-h-[25%]">
        <div className="relative w-full bg-purple-300 bottom-[16px] right-[16px] p-[16px]">
          <InnerComponent />
        </div>
      </div>
    </div>
  );
};

export default Card;
