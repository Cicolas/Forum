import { Outlet } from "react-router-dom";
import { Container } from "./Container";
import { CategoryChips } from "./CategoryChips";

export function Feed() {
  return <Container alignment="flex-row" className="py-4 h-full">
    <section className="flex pr-4 flex-col items-start gap-4 self-stretch border-r-2 border-silver-chalice-400 w-1/6">
      <h1 className="text-2xl font-bold leading-normal">Categorias</h1>
      <div className="flex flex-wrap items-start content-start gap-3 self-stretch">
        <CategoryChips
          name="Brazil"
          color="#6d8c003f"
        ></CategoryChips>
        <CategoryChips
          name="Humor"
          color="#6d8c003f"
        ></CategoryChips>
        <CategoryChips
          name="WEB"
          color="#6d8c003f"
        ></CategoryChips>
      </div>
    </section>
    <Outlet></Outlet>
  </Container>
}