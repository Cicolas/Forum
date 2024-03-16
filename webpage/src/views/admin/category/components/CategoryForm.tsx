import { Trash } from "phosphor-react";
import { InputField } from "../../../../components/InputField";
import { Chip } from "../../../../components/Chips/CategoryChips";
import { Container } from "../../../../components/Container";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

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

  return <Container alignment="flex-row" className="content-center gap-4 w-full">
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

      <InputField
        title="Nome"
        type="text"
        placeholder="Digite o nome da categoria"
        value={name??""}
        className="font-bold"
        onChange={(ev) => {setName(ev.target.value)}}
      ></InputField>

      <InputField
        title="Descrição"
        type="textarea"
        value={description??""}
        placeholder="Digite a descrição da categoria"
        className="font-bold max-h-full"
        onChange={(ev) => {setDescription(ev.target.value)}}
      ></InputField>

      <div className="flex flex-col items-start self-stretch gap-2 pb-2 font-bold">
        Cor
        <div className="h-8 justify-start items-start gap-2 flex">
          {colors.map(ColorBox)}
        </div>
      </div>

      <div className="flex pt-4 justify-end items-end gap-2 self-stretch">
        <button
          onClick={handleDiscard}
          className="flex py-2 px-4 items-center rounded-lg bg-opacity-25 bg-silver-chalice-400"
        >
          {isCreate ? "Descartar" : "Cancelar"}
        </button>
        <button
          onClick={handleSave}
          className="flex py-2 px-4 items-center rounded-lg bg-olive-drab-700 font-bold text-serenade-100"
        >
          Salvar
        </button>
      </div>
    </div>

    <div className="flex flex-col items-start gap-3 w-full self-stretch">
      <div className="flex py-24 flex-col justify-center items-center gap-3 self-stretch">
        <Chip name={name ? name : "Texto"} color={color} className="scale-150"></Chip>
      </div>
      <div className="flex items-center gap-2">
        <h1 className="text-2xl font-normal leading-normal">Título</h1>
        <Chip name={name ? name : "Texto"} color={color}></Chip>
      </div>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime, praesentium sint nihil iste recusandae qui facere odio tempore repudiandae, odit modi inventore tenetur quibusdam architecto saepe suscipit culpa! Quae, fugit?
      </p>
    </div>
  </Container>
}