import { Link, Outlet } from "react-router-dom";
import { Container } from "../../atoms/Container/Container";
import { useContext, useEffect } from "react";
import { Gear } from "phosphor-react";
import { AddCategoryChip } from "../../molecules/Chips/AddCategoryChip";
import { AdminCategoryChip } from "../../molecules/Chips/AdminCategoryChip";
import { CategoryChip } from "../../molecules/Chips/CategoryChip";
import { CategoryContext } from "../../../context/CategoryContext";
import { AuthContext } from "../../../context/AuthContext";

type CategoryLayoutProps = {
  isAdmin?: boolean;
}

export function CategoryLayout({ isAdmin }: CategoryLayoutProps) {
  const { categories, getCategories } = useContext(CategoryContext);

  const { permissions } = useContext(AuthContext);
  const canCreate = permissions?.includes("create-category");

  const canConfig = permissions?.includes("create-category") ||
                    permissions?.includes("update-category") ||
                    permissions?.includes("delete-category");

  useEffect(() => {
    if (!categories)
      getCategories();
  }, [categories, getCategories])

  return <Container alignment="flex-row" className="py-4 h-full">
    <section className="flex pr-4 flex-col items-start gap-4 border-r-2 border-silver-chalice-400 w-1/5 2xl:w-1/6">
      <div className="flex flex-row items-center justify-between w-full">
        <h1 className="text-2xl font-bold leading-normal">Categorias</h1>
        <Link to="/admin/category">
          {!isAdmin && canConfig &&
            <Gear size={20} weight="bold" className="text-silver-chalice-400 mt-1 cursor-pointer"></Gear>
          }
        </Link>
      </div>
      <div className="flex flex-wrap items-start content-start gap-3 self-stretch">
        {categories?.map(isAdmin ? AdminCategoryChip : CategoryChip)}
        {canCreate && <AddCategoryChip></AddCategoryChip>}
      </div>
    </section>
    <Outlet></Outlet>
  </Container>
}