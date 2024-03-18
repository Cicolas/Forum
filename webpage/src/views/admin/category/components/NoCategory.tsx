import { HandPointing } from "phosphor-react";
import { Container } from "../../../../components/atoms/Container/Container";

export function NoCategory() {
  return <Container className="items-center justify-center">
    <HandPointing size={48} className="text-silver-chalice-400"></HandPointing>
    <p className="text-silver-chalice-400 text-center font-bold text-md w-64">
      Selecione uma categoria para editar ou crie uma!
    </p>
  </Container>
}
