import { Outlet } from "react-router-dom";
import { Footer } from "../Footer/Footer";
import { Header } from "../Header/Header";
import { SearchBar } from "../../molecules/SearchBar/SearchBar";

type RootProps = {
  searchBar?: boolean;
}

export function Root({ searchBar }: RootProps) {
  return (
    <div className="flex flex-col items-center bg-serenade-50 min-h-screen min-w-full text-shark-950 font-serif">
      <Header />
      {searchBar !== false && <SearchBar />}
      <Outlet />
      <Footer />
    </div>
  )
}