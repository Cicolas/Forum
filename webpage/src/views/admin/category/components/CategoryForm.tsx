import { Trash } from "phosphor-react";
import { FormField } from "../../../../components/molecules/FormField/FormField";
import { Chip } from "../../../../components/atoms/Chips/Chip";
import { Container } from "../../../../components/atoms/Container/Container";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "../../../../components/atoms/Button/Button";
import Input from "../../../../components/atoms/Input/Input";
import { Label } from "../../../../components/atoms/Label/Label";
import { Split } from "../../../../components/molecules/Split/Split";
import { TextArea } from "../../../../components/atoms/TextArea/TextArea";
import { Content } from "../../../../components/atoms/Content/Content";
import { CategoryPreview } from "./CategoryPreview";

type CategoryFormProps = {
  defaultName?: string;
  defaultDescription?: string;
  defaultColor?: string;
  isCreate?: boolean;

  onSave: () => void;
  onDiscard?: () => void;
  onDelete?: () => void;
}

const colors = [
  "#6D8C003D",
  "#BD613C40",
  "#00628C40",
  "%picker%"
]

// TODO: Extract to a separate file
function ColorBox(color: string) {
  if (color === "%picker%") {
    return <button
      className="w-8 h-8 bg-opacity-25 rounded-lg border-2 border-silver-chalice-400 border-opacity-25 border-neutral-400 cursor-pointer bg-clip-padding"
      style={{backgroundImage: "url(\"/rainbow.jpg\")"}}
    ></button>
  }

  return <button
    className="w-8 h-8 bg-opacity-25 rounded-lg border-2 border-silver-chalice-400 border-opacity-25 border-neutral-400 cursor-pointer"
    style={{backgroundColor: color}}
  ></button>
}

export function CategoryForm({defaultName, defaultDescription, defaultColor, isCreate, onSave, onDelete, onDiscard}: CategoryFormProps) {
  const navigate = useNavigate();

  const [name, setName] = useState(defaultName);
  const [description, setDescription] = useState(defaultDescription);
  const [color, setColor] = useState(defaultColor??colors[0]);

  useEffect(() => {
    setName(defaultName);
    setDescription(defaultDescription);
    setColor(defaultColor??colors[0]);
  }, [defaultName, defaultDescription, defaultColor])

  function handleSave() {
    onSave();
  }

  function handleDiscard() {
    if (!onDiscard) {
      navigate("/admin/category");
      return;
    }

    onDiscard();
  }

  return <Split
    left={
      <div className="flex pr-4 flex-col items-center gap-4 w-full">
        <div className="flex flex-row items-center justify-between w-full">
          <h1 className="text-2xl font-bold leading-normal text-ellipsis max-w-full">
            {isCreate ? "Adicionar" : "Editar"} Categoria: {name}
          </h1>
          {!isCreate &&
            <button onClick={onDelete}>
              <Trash size={24} className="text-silver-chalice-400 hover:text-serenade-700"></Trash>
            </button>
          }
        </div>

        <FormField>
          <Label bold>Nome</Label>
          <Input
            type="text"
            value={name??""}
            onChange={ev => setName(ev.target.value)}
            placeholder="Insira o nome da cartegoria"
          >
          </Input>
        </FormField>

        <FormField>
          <Label bold>Descrição</Label>
          <TextArea
            value={description??""}
            onChange={ev => setDescription(ev.target.value)}
            placeholder="Insira a descrição da categoria"
            minHeight="7rem"
          >
          </TextArea>
        </FormField>

        <FormField>
          <Label bold>Cor</Label>
          <div className="h-8 justify-start items-start gap-2 flex">
            {colors.map(ColorBox)}
          </div>
        </FormField>

        <div className="self-end pt-4 gap-2 inline-flex">
          <Button
            text={isCreate ? "Descartar" : "Cancelar"}
            action="cancel"
            className="py-2 px-4"
          >
          </Button>
          <Button
            text="Salvar"
            action="submit"
            className="py-2 px-4"
          >
          </Button>
        </div>
      </div>
    }
    right={
      <CategoryPreview name={name} color={color} description={description}>
      </CategoryPreview>
    }
  ></Split>
}