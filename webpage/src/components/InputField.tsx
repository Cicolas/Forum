import { HTMLInputTypeAttribute } from "react";

type InputFieldProps = {
  title: string;
  type: HTMLInputTypeAttribute;
  placeholder: string;
}

export function InputField({ title, type, placeholder }: InputFieldProps) {
  return <div className="flex flex-col items-start self-stretch gap-2 pb-2">
    {title}
    <input
      type={type}
      placeholder={placeholder}
      className="
        py-2 px-4 content-between items-center self-stretch
        bg-serenade-50
        border-2 border-silver-chalice-400 border-opacity-25 rounded-lg
        leading-normal tracking-wider font-roboto text-justify
      "
    />
  </div>
}