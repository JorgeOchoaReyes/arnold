"use client";

import type React from "react";
import { useState, useRef, useEffect } from "react";

interface ResizableDivProps {
  initialWidth?: number
  initialHeight?: number
  minWidth?: number
  minHeight?: number
  className?: string
  children: React.ReactNode
}

export function ResizableDiv({
  initialWidth = 300,
  initialHeight = 200,
  minWidth = 100,
  minHeight = 100,
  className = "",
  children,
}: ResizableDivProps) {
  const [width, setWidth] = useState(initialWidth);
  const [height, setHeight] = useState(initialHeight);
  const [isResizing, setIsResizing] = useState(false);
  const [resizeType, setResizeType] = useState<"horizontal" | "vertical" | "both" | null>(null);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const divRef = useRef<HTMLDivElement>(null);
 
  const handleMouseDown = (e: React.MouseEvent, type: "horizontal" | "vertical" | "both") => {
    e.preventDefault();
    setIsResizing(true);
    setResizeType(type);
    setStartPos({ x: e.clientX, y: e.clientY });
  };
 
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing) return;

      const deltaX = e.clientX - startPos.x;
      const deltaY = e.clientY - startPos.y;

      if (resizeType === "horizontal" || resizeType === "both") {
        const newWidth = Math.max(width + deltaX, minWidth);
        setWidth(newWidth);
      }

      if (resizeType === "vertical" || resizeType === "both") {
        const newHeight = Math.max(height + deltaY, minHeight);
        setHeight(newHeight);
      }

      setStartPos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseUp = () => {
      setIsResizing(false);
      setResizeType(null);
    };

    if (isResizing) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isResizing, resizeType, startPos, width, height, minWidth, minHeight]);

  return (
    <div
      ref={divRef}
      className={`relative ${className}`}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        cursor: isResizing
          ? resizeType === "both"
            ? "nwse-resize"
            : resizeType === "horizontal"
              ? "ew-resize"
              : "ns-resize"
          : "default",
      }}
    >
      {children}

      {/* Right resize handle */}
      <div
        className="absolute top-0 right-0 w-2 h-full cursor-ew-resize hover:bg-gray-300/50"
        onMouseDown={(e) => handleMouseDown(e, "horizontal")}
      />

      {/* Bottom resize handle */}
      <div
        className="absolute bottom-0 left-0 w-full h-2 cursor-ns-resize hover:bg-gray-300/50"
        onMouseDown={(e) => handleMouseDown(e, "vertical")}
      />

      {/* Bottom-right corner resize handle */}
      <div
        className="absolute bottom-0 right-0 w-4 h-4 cursor-nwse-resize bg-gray-300 hover:bg-gray-400 rounded-bl"
        onMouseDown={(e) => handleMouseDown(e, "both")}
      />
    </div>
  );
}
