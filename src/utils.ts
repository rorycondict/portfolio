import { isValidElement, type ReactNode } from "react";

function getPlainText(node: ReactNode): string {
  if (node == null || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(getPlainText).join("");
  if (isValidElement(node))
    return getPlainText((node.props as { children?: ReactNode }).children);
  return "";
}
