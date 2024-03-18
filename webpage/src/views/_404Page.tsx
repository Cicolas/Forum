import { Link } from "react-router-dom";
import { Container } from "../components/atoms/Container/Container";
import { Footer } from "../components/organisms/Footer/Footer";
import { Header } from "../components/organisms/Header/Header";

export default function _404Page() {
  return <div className="flex flex-col items-center bg-serenade-50 min-h-screen min-w-full text-shark-950 font-serif">
    <Header />
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