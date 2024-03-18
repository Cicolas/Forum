import { ChangeEventHandler } from "react";
import autoResizeTextArea from "../../../utils/autoResizeTextArea";

type TextAreaProps = {
  placeholder: string;
  value: string;
  className?: string;
  minHeight?: string;
  borderless?: boolean;

  onChange?: ChangeEventHandler<HTMLTextAreaElement>;
}

export function TextArea({ placeholder, value, onChange, className, minHeight, borderless }: TextAreaProps) {
  return <textarea
  placeholder={placeholder}
  value={value}
  onChange={onChange}
  className={`
    ${borderless?"px-1":"px-4"} py-2 content-between items-center self-stretch
    bg-serenade-50
    ${borderless?"":"border-2 border-silver-chalice-400 border-opacity-25"} rounded-lg
    leading-normal tracking-wider font-roboto text-justify
    font-normal
    overflow-hidden resize-none ${className}
  `}
  style={{height: minHeight}}
  onInput={(ev) => {autoResizeTextArea(ev, minHeight)}}
>
</textarea>
}