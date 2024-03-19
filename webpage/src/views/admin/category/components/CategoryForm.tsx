import { Trash } from "phosphor-react";
import { FormField } from "../../../../components/molecules/FormField/FormField";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { Button } from "../../../../components/atoms/Button/Button";
import Input from "../../../../components/atoms/Input/Input";
import { Label } from "../../../../components/atoms/Label/Label";
import { Split } from "../../../../components/molecules/Split/Split";
import { TextArea } from "../../../../components/atoms/TextArea/TextArea";
import { CategoryPreview } from "./CategoryPreview";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../../../context/AuthContext";

type CategoryFormProps = {
  defaultName?: string;
  defaultDescription?: string;
  defaultColor?: string;
  isCreate?: boolean;

  onSave: (data: categoryFormData) => void;
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
      key={color}
      className="w-8 h-8 bg-opacity-25 rounded-lg border-2 border-silver-chalice-400 border-opacity-25 border-neutral-400 cursor-pointer bg-clip-padding"
      style={{backgroundImage: "url(\"/rainbow.jpg\")"}}
    ></button>
  }

  return <button
    key={color}
    className="w-8 h-8 bg-opacity-25 rounded-lg border-2 border-silver-chalice-400 border-opacity-25 border-neutral-400 cursor-pointer"
    style={{backgroundColor: color}}
  ></button>
}

const categoryFormSchema = z.object({
  name: z.string()
    .min(1, "Nome é obrigatório"),
  description: z.string(),
  color: z.string()
})

export type categoryFormData = z.infer<typeof categoryFormSchema>;

export function CategoryForm({defaultName, defaultDescription, defaultColor, isCreate, onSave, onDelete, onDiscard}: CategoryFormProps) {
  const navigate = useNavigate();

  const { permissions } = useContext(AuthContext);
  const canDelete = permissions.includes("delete-category");

  const {
    handleSubmit,
    setValue,
    watch,
    formState: { isSubmitting, errors }
  } = useForm<categoryFormData>({
    resolver: zodResolver(categoryFormSchema)
  });

  const nameValue = watch("name");
  const descriptionValue = watch("description");
  const colorValue = watch("color");

  useEffect(() => {
    setValue("name", defaultName??"");
    setValue("description", defaultDescription??"");
    setValue("color", defaultColor??colors[0]);
  }, [setValue, defaultName, defaultDescription, defaultColor])

  function handleSave(data: categoryFormData) {
    onSave(data);
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
            {isCreate ? "Adicionar" : "Editar"} Categoria: {nameValue}
          </h1>
          {!isCreate && canDelete &&
            <button onClick={onDelete}>
              <Trash size={24} className="text-silver-chalice-400 hover:text-serenade-700"></Trash>
            </button>
          }
        </div>

        <form onSubmit={handleSubmit(handleSave)} className="w-full flex flex-col gap-4">
          <FormField haveError={!!errors.name} errorMessage={errors.name?.message}>
            <Label bold>Nome</Label>
            <Input
              type="text"
              value={nameValue??""}
              onChange={ev => setValue("name", ev.target.value)}
              placeholder="Insira o nome da cartegoria"
              disabled={!isCreate}
            >
            </Input>
          </FormField>

          <FormField haveError={!!errors.description} errorMessage={errors.description?.message}>
            <Label bold>Descrição</Label>
            <TextArea
              value={descriptionValue??""}
              onChange={ev => setValue("description", ev.target.value)}
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
              onClick={(ev) => {handleDiscard(); ev.preventDefault()}}
            >
            </Button>
            <Button
              text="Salvar"
              disabled={isSubmitting}
              action="submit"
              className="py-2 px-4"
            >
            </Button>
          </div>
        </form>
      </div>
    }
    right={
      <CategoryPreview name={nameValue} color={colorValue} description={descriptionValue}>
      </CategoryPreview>
    }
  ></Split>
}