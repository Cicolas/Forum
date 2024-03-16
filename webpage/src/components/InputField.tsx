import { ChangeEventHandler, HTMLInputTypeAttribute } from "react";
import autoResizeTextArea from "../utils/autoResizeTextArea";

type InputFieldProps = {
  title: string;
  type: HTMLInputTypeAttribute | "textarea";
  placeholder: string;
  value: string;
  className?: string;

  onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
}

const style = `
  py-2 px-4 content-between items-center self-stretch
  bg-serenade-50
  border-2 border-silver-chalice-400 border-opacity-25 rounded-lg
  leading-normal tracking-wider font-roboto text-justify
  font-normal
`;

export function InputField({ title, type, placeholder, value, onChange, className }: InputFieldProps) {
  return <div className={`flex flex-col items-start self-stretch gap-2 pb-2 ${className??""}`}>
    {title}
    {type !== "textarea" ?
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={style}
      />
    :
      <textarea
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`${style} overflow-hidden resize-none h-28`}
        onInput={(ev) => {autoResizeTextArea(ev, "7rem")}}
      >
      </textarea>
    }
  </div>
}