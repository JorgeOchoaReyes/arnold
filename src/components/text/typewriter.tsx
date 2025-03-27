"use client";

import { useEffect, useState } from "react";

interface TypewriterProps {
  text: string
  speed?: number
  delay?: number
  onComplete?: () => void
  className?: string
  cursor?: boolean
}

export function Typewriter({
  text,
  speed = 50,
  delay = 0,
  onComplete,
  className = "",
  cursor = true,
}: TypewriterProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [startTyping, setStartTyping] = useState(false);

  useEffect(() => {
    // Reset when text changes
    setDisplayedText("");
    setCurrentIndex(0);

    // Delay before starting to type
    const startTimeout = setTimeout(() => {
      setStartTyping(true);
    }, delay);

    return () => clearTimeout(startTimeout);
  }, [text, delay]);

  useEffect(() => {
    if (!startTyping) return;

    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, speed);

      return () => clearTimeout(timeout);
    } else if (onComplete) {
      onComplete();
    }
  }, [currentIndex, text, speed, startTyping, onComplete]);

  return (
    <div className={className}>
      <span>{displayedText}</span>
      {cursor && currentIndex < text.length && (
        <span className="inline-block w-[2px] h-5 ml-[1px] bg-current animate-blink" />
      )}
    </div>
  );
}

