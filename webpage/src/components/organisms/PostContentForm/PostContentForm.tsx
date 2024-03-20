import { Button } from "../../atoms/Button/Button";
import { TextArea } from "../../atoms/TextArea/TextArea";
import { ChangeEventHandler } from "react";

type PostContentFormProps = {
  content: string;
  onContentChange: ChangeEventHandler<HTMLTextAreaElement>;

  isSubmiting: boolean;
  handleSubmit: () => void;
  onCancel: () => void;
}

export function PostContentForm({
  content, onContentChange, isSubmiting, handleSubmit, onCancel
}: PostContentFormProps) {
  return <>
    <TextArea
      placeholder={"Conteúdo do post"}
      value={content}
      onChange={onContentChange}
      minHeight="10rem"
    >
    </TextArea>

    <div className="self-end pt-4 gap-2 inline-flex">
      <Button
        text={"Descartar"}
        action="cancel"
        className="py-2 px-4"
        onClick={(ev) => {
          onCancel();
          ev.preventDefault()
        }}
      >
      </Button>
      <Button
        text="Salvar"
        disabled={isSubmiting}
        action="submit"
        onClick={(ev) => {
          handleSubmit();
          ev.preventDefault();
        }}
        className="py-2 px-4"
      >
      </Button>
    </div>
  </>
}