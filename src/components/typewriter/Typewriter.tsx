import {
  cloneElement,
  Fragment,
  isValidElement,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useTypewriterContext } from "./TypewriterSequenceProvider";
import { motion, useInView } from "motion/react";

type TypewriterProps = {
  id: string;
  dependsOn?: string | string[];
  children: ReactNode;
  wpm?: number;
  maskChar?: string;
  className?: string;
};

export function Typewriter({
  id,
  dependsOn,
  children,
  wpm = 120,
  maskChar = "",
  className,
}: TypewriterProps) {
  const { completed, lastActiveId, markComplete, markActive } =
    useTypewriterContext();
  const deps = dependsOn
    ? Array.isArray(dependsOn)
      ? dependsOn
      : [dependsOn]
    : [];
  const depsReady = deps.every((d) => completed.has(d));
  const isDone = completed.has(id);
  const hasClaimedActive = useRef(false);

  const containerRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(containerRef, { once: true, amount: 0.5 });

  const started = depsReady && inView;

  const plainText = useMemo(() => getPlainText(children), [children]);
  const totalLength = plainText.length;

  const [revealedCount, setRevealedCount] = useState(0);

  useEffect(() => {
    if (started && !hasClaimedActive.current) {
      hasClaimedActive.current = true;
      markActive(id);
    }
  }, [started, id, markActive]);

  useEffect(() => {
    if (!started || isDone) return;

    const interval = setInterval(() => {
      setRevealedCount((prev) => {
        const next = prev + 1;
        if (next >= totalLength) {
          clearInterval(interval);
          markComplete(id);
        }
        return next;
      });
    }, 6000 / wpm);

    return () => clearInterval(interval);
  }, [started, isDone, totalLength, 6000 / wpm, id, markComplete]);

  const isTyping = started && !isDone;
  const isCurrent = lastActiveId === id;

  const displayed = useMemo(
    () =>
      revealTree(
        children,
        { remaining: started ? revealedCount : 0 },
        maskChar,
      ),
    [children, started, revealedCount, maskChar],
  );

  return (
    <span ref={containerRef} className={className} aria-label={plainText}>
      <span aria-hidden="true">{displayed}</span>
      {isCurrent && <Caret blink={!isTyping} />}
    </span>
  );
}

function Caret({ blink }: { blink: boolean }) {
  return (
    <motion.span
      aria-hidden="true"
      className="inline-block w-[0.1em] ml-px"
      animate={blink ? { opacity: [1, 1, 0, 0] } : { opacity: 1 }}
      transition={
        blink
          ? {
              duration: 1,
              repeat: Infinity,
              times: [0, 0.5, 0.5, 1],
              ease: "linear",
            }
          : { duration: 0 }
      }
    >
      _
    </motion.span>
  );
}

function getPlainText(node: ReactNode): string {
  if (node == null || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(getPlainText).join("");
  if (isValidElement(node))
    return getPlainText((node.props as { children?: ReactNode }).children);
  return "";
}

function revealTree(
  node: ReactNode,
  budget: { remaining: number },
  maskChar: string,
): ReactNode {
  if (node == null || typeof node === "boolean") return node;

  if (typeof node === "string" || typeof node === "number") {
    const str = String(node);
    if (budget.remaining <= 0) return maskChar.repeat(str.length);
    if (budget.remaining >= str.length) {
      budget.remaining -= str.length;
      return str;
    }
    const revealed = str.slice(0, budget.remaining);
    const masked = maskChar.repeat(str.length - budget.remaining);
    budget.remaining = 0;
    return revealed + masked;
  }

  if (Array.isArray(node)) {
    return node.map((child, i) => (
      <Fragment key={i}>{revealTree(child, budget, maskChar)}</Fragment>
    ));
  }

  if (isValidElement(node)) {
    return cloneElement(
      node,
      node.props as { children?: ReactNode },
      revealTree(
        (node.props as { children?: ReactNode }).children,
        budget,
        maskChar,
      ),
    );
  }

  return node;
}
