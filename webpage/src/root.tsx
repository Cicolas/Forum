import { Outlet } from "react-router-dom";
import { Footer } from "./components/Footer";
import { Head } from "./components/Head";

export function Root() {
  return (
    <div className="bg-serenade-50 min-h-screen min-w-full text-shark-950 font-serif">
      <Head />
      <Outlet />
      <Footer />
    </div>
  )
}