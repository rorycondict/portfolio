import { createContext, useCallback, useContext, useState } from "react";

type TypewriterContextValue = {
  completed: Set<string>;
  lastActiveId: string | null;
  markComplete: (id: string) => void;
  markActive: (id: string) => void;
};

const TypewriterContext = createContext<TypewriterContextValue | null>(null);

export function TypewriterSequenceProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [completed, setCompleted] = useState<Set<string>>(new Set());
  const [lastActiveId, setLastActiveId] = useState<string | null>(null);

  const markComplete = useCallback((id: string) => {
    setCompleted((prev) => (prev.has(id) ? prev : new Set(prev).add(id)));
  }, []);

  const markActive = useCallback((id: string) => {
    setLastActiveId(id);
  }, []);

  return (
    <TypewriterContext.Provider
      value={{ completed, lastActiveId, markComplete, markActive }}
    >
      {children}
    </TypewriterContext.Provider>
  );
}

export function useTypewriterContext() {
  const ctx = useContext(TypewriterContext);
  if (!ctx)
    throw new Error(
      "Typewriter must be rendered within TypewriterSequenceProvider",
    );
  return ctx;
}
