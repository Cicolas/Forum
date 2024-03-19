import { ChangeEventHandler, ChangeEvent } from "react";
import { sizes } from "../../../utils/defaultStyles";
import Input from "../../atoms/Input/Input";
import { Title } from "../../atoms/Title/Title";

type TitleInputWrapperProps = {
  title: string,
  editable?: boolean,
  size?: keyof typeof sizes,
  borderless?: boolean,

  onTitleChange?: ChangeEventHandler<HTMLInputElement>;
}

export function TitleInputWrapper({ title, size, editable, borderless, onTitleChange }: TitleInputWrapperProps) {
  function handleTitleChange(ev: ChangeEvent<HTMLInputElement>) {
    if (editable && !onTitleChange) throw Error("TitleWrapper is editable but doesn't implement onTitleChange");
    if (onTitleChange) onTitleChange(ev);
  }

  return <>{editable ?
    <Input
      value={title}
      type={"text"}
      placeholder={"Título"}
      onChange={handleTitleChange}
      className={`font-bold font-serif leading-tight tracking-[0rem] focus:outline-none ${
        sizes[size??"2xl"]
      }`}
      borderless={borderless}
    >
    </Input>
    :
    <Title size={size??"3.5xl"} className="leading-tight">{title}</Title>
  }</>
}