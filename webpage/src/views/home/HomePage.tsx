import { Link, useNavigate } from "react-router-dom";
import { Container } from "../../components/atoms/Container/Container";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Title } from "../../components/atoms/Title/Title";
import { Content } from "../../components/atoms/Content/Content";
import { Button } from "../../components/atoms/Button/Button";
import { Label } from "../../components/atoms/Label/Label";

export function HomePage() {
  const { authenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  function handleLoginButton() {
    if (authenticated) navigate("/feed/recent");
    else navigate("/login");
  }

  return <Container className="py-1">
    <div className="flex pt-20 pb-4 flex-col justify-center items-center gap-20 self-stretch">
      <img src="Hero.jpg" className="w-[37.5rem]" />
      <div className="w-64 self-center text-center">
        <Button
          text="Entrar"
          action="action"
          className="p-4 mb-1 w-full"
          onClick={handleLoginButton}
        >
        </Button>
        {!authenticated &&
          <Link to="/feed/recent">
            <Label className="text-orient-800" light italic>
              Entrar sem logar &gt;
            </Label>
          </Link>
        }
      </div>
    </div>
    <Content className="mx-auto max-w-[50rem]">
      <Title size="3.5xl" className="font-serif leading-tight tracking-[0rem]">Sobre o Forum</Title>
      <p className="pt-4">
        O Forum é um site projetado para a disciplina de Programação Orientada a Objetos
        e Banco de Dados. Foi idealizado pelos alunos André Schlichting e Nícolas Carvalho,
        ambos bacharelandos em Ciência da Computação na Universidade Estadual de Maringá (UEM).
      </p>
      <p>
        A ideia era criar algo que fugisse um pouco do que já é clichê nessas disciplinas,
        como bibliotecas, pokédexes, coleções,
        entre outros projetos que são feitos incontáveis vezes para essas matérias.
        Por isso O Forum é uma rede social de comunidade,
        que foi inspirado no website Reddit.com.
      </p>
      <p>
        O Forum é totalmente código aberto, o site foi projetado na plataforma Figma
        utilizando-se de conceitos do Atomic Design, e posteriormente programado
        inteiramente com Typescript com as bibliotecas React, para interface, e Axios,
        para realizar as comunicações HTTP com o servidor. O backend foi feito em JAVA,
        usando um banco de dados MySQL e Hibernate como biblioteca de ORM e
        Javalin para criar as APIs RESTful, que são consumidas pelo frontend.
      </p>
    </Content>
  </Container>
}