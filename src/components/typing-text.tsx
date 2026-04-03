"use client";

import { useEffect, useState } from "react";

export function TypingText({ words }: { words: string[] }) {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[index] ?? "";
    const timeout = setTimeout(
      () => {
        if (!deleting && subIndex < word.length) return setSubIndex((v) => v + 1);
        if (deleting && subIndex > 0) return setSubIndex((v) => v - 1);
        if (!deleting) return setDeleting(true);
        setDeleting(false);
        setIndex((v) => (v + 1) % words.length);
      },
      deleting ? 50 : 120,
    );
    return () => clearTimeout(timeout);
  }, [deleting, index, subIndex, words]);

  return (
    <span className="text-cyan-400">
      {words[index]?.slice(0, subIndex)}
      <span className="animate-pulse">|</span>
    </span>
  );
}
