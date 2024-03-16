import { FormEvent } from "react";

export default function autoResizeTextArea(ev: FormEvent, minHeight: string) {
  const ta = ev.target as HTMLTextAreaElement;
  ta.style.height = "0";
  ta.style.height = `max(${ta.scrollHeight}px, ${minHeight})`;
}