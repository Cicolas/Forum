import { Link, useNavigate } from "react-router-dom";
import { Container } from "../../components/Container";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export function Home() {
  const { authenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  function handleLoginButton() {
    if (authenticated) navigate("/feed");
    else navigate("/login")
  }

  return <Container className="py-1">
    <div className="flex py-4 flex-col justify-center items-center gap-8 self-stretch">
      <img src="Hero.jpg" className="w-[37.5rem]" />
      <div className="flex w-64 flex-col items-center gap-2">
        <button
          onClick={handleLoginButton}
          className="flex mt-12 p-4 justify-center text-center self-stretch rounded-lg bg-shark-950 font-bold text-serenade-100"
        >
          Entrar
        </button>
        <Link to="/feed" className="text-orient-800 font-light italic">Entrar sem logar &gt;</Link>
      </div>
    </div>
    <div className="font-roboto text-justify leading-6 tracking-wider mx-auto max-w-[50rem]">
      <h1 className="font-bold text-3.5xl leading-tight font-serif pb-4 tracking-[0rem]">Sobre o Forum</h1>
      <p className="pb-4">
        O Forum é um site projetado para a disciplina de Programação Orientada a Objetos
        e Banco de Dados. Foi idealizado pelos alunos André Schlichting e Nícolas Carvalho,
        ambos bacharelandos em Ciência da Computação na Universidade Estadual de Maringá (UEM).
      </p>
      <p className="pb-4">
        A ideia era criar algo que fugisse um pouco do que já é clichê nessas disciplinas,
        como bibliotecas, pokédexes, coleções,
        entre outros projetos que são feitos incontáveis vezes para essas matérias.
        Por isso O Forum é uma rede social de comunidade,
        que foi inspirado no website Reddit.com.
      </p>
      <p className="pb-4">
        O Forum é totalmente código aberto, o site foi projetado na plataforma Figma
        utilizando-se de conceitos do Atomic Design, e posteriormente programado
        inteiramente com Typescript com as bibliotecas React, para interface, e Axios,
        para realizar as comunicações HTTP com o servidor. O backend foi feito em JAVA,
        usando um banco de dados MySQL e Hibernate como biblioteca de ORM e
        Javalin para criar as APIs RESTful, que são consumidas pelo frontend.
      </p>
    </div>

  </Container>
}