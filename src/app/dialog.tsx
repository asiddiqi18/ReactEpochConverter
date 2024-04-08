import React, { CSSProperties, useEffect, useRef } from "react";

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  positionStyle?: CSSProperties; // Add this line
  summonerRef: React.RefObject<HTMLElement>; // Now more generic
}

const Dialog: React.FC<DialogProps> = ({
  isOpen,
  onClose,
  children,
  positionStyle,
  summonerRef,
}) => {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        !dialogRef?.current?.contains(event.target as Node) &&
        !summonerRef?.current?.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose, summonerRef]);

  if (!isOpen) return null;

  return (
    <div style={{ position: "absolute", ...positionStyle, zIndex: 1000 }}>
      <div className="bg-white rounded-lg shadow-lg" ref={dialogRef}>
        {children}
      </div>
    </div>
  );
};

export default Dialog;
