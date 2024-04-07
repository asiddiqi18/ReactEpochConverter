import React from "react";

interface ArrowIconProps {
  flip: boolean;
  onClick?: React.MouseEventHandler<SVGSVGElement>;
}

const ArrowIcon: React.FC<ArrowIconProps> = ({ flip, onClick }) => {
  let transformClass = flip ? "scaleY(-1)" : "";

  return (
    <div className="cursor-pointer absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
      <svg
        className={`fill-current h-4 w-4 ${transformClass}`}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        style={{ transform: transformClass }}
        onClick={onClick}
      >
        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
      </svg>
    </div>
  );
};

export default ArrowIcon;
