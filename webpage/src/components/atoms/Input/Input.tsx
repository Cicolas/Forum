import { HTMLInputTypeAttribute, ChangeEventHandler } from "react";

type InputProps = {
  type: HTMLInputTypeAttribute;
  placeholder: string;
  value: string;
  className?: string;

  onChange: ChangeEventHandler<HTMLInputElement>;
}

export default function Input({ type, placeholder, value, onChange }: InputProps) {
  return <input
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    className={`
      py-2 px-4 content-between items-center self-stretch
      bg-serenade-50
      border-2 border-silver-chalice-400 border-opacity-25 rounded-lg
      leading-normal tracking-wider font-roboto text-justify
      font-normal
    `}
  />
}