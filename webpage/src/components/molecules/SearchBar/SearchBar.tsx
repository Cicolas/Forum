import { CaretDown, MagnifyingGlass } from "phosphor-react";

export function SearchBar() {
  return <div className="flex pb-2 items-center justify-end gap-4 w-1/3 min-w-[600px]">
    <MagnifyingGlass className="cursor-pointer" size={30} weight="bold"></MagnifyingGlass>
    <div className="flex flex-grow flex-shrink-0 py-1 items-center gap-2 font-serif border-b-2 border-silver-chalice-400">
      <input
        className="flex-grow flex-shrink-0 font-roboto text-base tracking-wider leading-normal placeholder-silver-chalice-400 bg-serenade-50"
        placeholder="Pesquisar por ID"
        type="text"
      />
      <div className="flex flex-row items-center justify-center cursor-pointer gap-2 h-full">
        <span>post</span>
        <CaretDown size={16} weight="bold"></CaretDown>
      </div>
    </div>
  </div>
}