import { Link } from "react-router-dom";
import { Container } from "./components/Container";
import { Footer } from "./components/Footer";
import { Head } from "./components/Head";

export default function Error404() {
  return <div className="flex flex-col items-center bg-serenade-50 min-h-screen min-w-full text-shark-950 font-serif">
    <Head />
    <Container className="justify-center items-center">
      <h1 id="h1-404" className="
        text-center text-9xl italic font-black leading-[6rem]
      ">404</h1>
      <p className="text-silver-chalice-400 text-2xl font-semibold ">Página não encontrada</p>
      <Link to="/home" className="text-orient-800 font-light italic">Voltar para Home &gt;</Link>
    </Container>
    <Footer />
  </div>
}