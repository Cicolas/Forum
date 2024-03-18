import { Chip } from "../../../../components/atoms/Chips/Chip";
import { Content } from "../../../../components/atoms/Content/Content";

type CategoryPreview = {
  name?: string;
  description?: string;
  color?: string;
}

export function CategoryPreview({ name, description, color }: CategoryPreview) {
  return <div className="flex flex-col items-start gap-3 w-full self-stretch">
    <div className="flex py-24 flex-col justify-center items-center gap-3 self-stretch">
      <Chip name={name ? name : "Texto"} color={color} className="scale-150"></Chip>
    </div>
    <div className="flex items-center gap-2">
      <h1 className="text-2xl font-normal leading-normal">Título</h1>
      <Chip name={name ? name : "Texto"} color={color}></Chip>
    </div>
    <Content className="tracking-[normal]">
      {description ? description : "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fugit excepturi laboriosam nisi dolorem in omnis, recusandae ipsa praesentium maxime veniam!"}
    </Content>
  </div>
}