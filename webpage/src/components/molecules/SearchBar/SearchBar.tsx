import { ArrowsLeftRight, MagnifyingGlass } from "phosphor-react";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Chip } from "../../atoms/Chips/Chip";

export function SearchBar() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [selection, setSelection] = useState<"title" | "author">("author");

  const handleSearch = (ev: FormEvent) => {
    navigate(`/feed?${selection}=${search}`);
    ev.preventDefault();
  }

  return <form onSubmit={handleSearch} className="flex pb-2 items-center justify-end gap-4 w-1/3 min-w-[600px]">
    <div className="flex flex-grow flex-shrink-0 py-1 items-center gap-2 font-serif border-b-2 border-silver-chalice-400">
      <MagnifyingGlass
        className="cursor-pointer"
        size={24}
        onClick={handleSearch}
        weight="bold"
      >
      </MagnifyingGlass>
      <input
        className="
          flex-grow flex-shrink-0
          font-roboto text-base tracking-wider leading-normal
          placeholder-silver-chalice-400 bg-serenade-50
          focus:outline-none
        "
        value={search}
        onChange={ev => setSearch(ev.target.value)}
        placeholder="Pesquisar"
        type="text"
      />
      <div className="flex flex-row items-center justify-center cursor-pointer gap-2 h-full">
        <Chip
          name={selection === "author" ? "Autor" : "Título"}
          color="#a6a6a640"
          onClick={() => setSelection(selection === "author" ? "title" : "author")}
        >
          &nbsp;
          <ArrowsLeftRight size={16} className="inline"></ArrowsLeftRight>
        </Chip>
      </div>

    </div>
  </form>
}