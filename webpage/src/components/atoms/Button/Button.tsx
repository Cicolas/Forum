import { MouseEventHandler } from "react"

type ButtonProps = {
  text: string;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>
  className?: string;

  action: "submit" | "action" | "cancel";
}

const styleAction = {
  "submit": "bg-olive-drab-700 font-bold text-serenade-100",
  "action": "bg-shark-950 font-bold text-serenade-100",
  "cancel": "bg-silver-chalice-400 bg-opacity-25 text-shark-950"
}

export function Button({ text, disabled, onClick, className, action }: ButtonProps) {
  return <button
    disabled={disabled}
    onClick={onClick}
    className={`
      flex rounded-lg ${styleAction[action]} items-center justify-center
      ${disabled ? "cursor-wait bg-shark-950 bg-opacity-25" : ""}
      ${className}
    `}
  >
    {text}
  </button>
}