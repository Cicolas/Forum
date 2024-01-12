import { Outlet } from "react-router-dom";
import { Footer } from "./Footer";
import { Head } from "./Head";
import { SearchBar } from "./SearchBar";

export function Root() {
  return (
    <div className="flex flex-col items-center bg-serenade-50 min-h-screen min-w-full text-shark-950 font-serif">
      <Head />
      <SearchBar />
      <Outlet />
      <Footer />
    </div>
  )
}