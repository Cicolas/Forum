import { ReactNode } from "react";

type FormFieldProps = {
  // type: HTMLInputTypeAttribute | "textarea";
  // placeholder: string;
  // value: string;
  className?: string;
  children?: ReactNode;

  // onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
}

export function FormField({ children, className }: FormFieldProps) {
  return <div className={`
    flex flex-col items-start self-stretch gap-2 pb-2 ${className??""}
  `}>
    {children}

    {/* {title}
    {type !== "textarea" ?
      <Input {...{title, type, placeholder, value, onChange}}></Input>
    :
      <textarea
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`${style} overflow-hidden resize-none h-28`}
        onInput={(ev) => {autoResizeTextArea(ev, "7rem")}}
      >
      </textarea> */}
    {/* } */}
  </div>
}