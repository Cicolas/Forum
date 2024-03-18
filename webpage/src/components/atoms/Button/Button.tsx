import { MouseEventHandler } from "react"

type ButtonProps = {
  text: string;
  onClick?: MouseEventHandler<HTMLButtonElement>
  className?: string;

  action: "submit" | "action" | "cancel";
}

const styleAction = {
  "submit": "bg-olive-drab-700 font-bold text-serenade-100",
  "action": "bg-shark-950 font-bold text-serenade-100",
  "cancel": "bg-silver-chalice-400 bg-opacity-25 text-shark-950"
}

export function Button({ text, onClick, className, action }: ButtonProps) {
  return <button onClick={onClick} className={`
    flex rounded-lg ${styleAction[action]} items-center ${className} justify-center
  `}>
    {text}
  </button>
}