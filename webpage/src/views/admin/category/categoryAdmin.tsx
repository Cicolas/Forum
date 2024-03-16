import { HandPointing } from "phosphor-react";
import { useQuery } from "../../../hooks/useQuery"
import { Container } from "../../../components/Container";
import { CategoryForm } from "./components/CategoryForm";
import { ICategory } from "../../../utils/interfaces/category";
import { useEffect, useState } from "react";
import CategoryService from "../../../services/CategoryService";

function NoCategory() {
  return <Container className="items-center justify-center">
    <HandPointing size={48} className="text-silver-chalice-400"></HandPointing>
    <p className="text-silver-chalice-400 text-center font-bold text-md w-64">
      Selecione uma categoria para editar ou crie uma!
    </p>
  </Container>
}

function NewCategory() {
  function createCategory() {
    console.log("create")
  }

  return <CategoryForm onSave={createCategory} isCreate/>
}

function EditCategory(category: ICategory) {
  function updateCategory() {
    console.log("update")
  }

  return <CategoryForm
    defaultName={category.name}
    defaultDescription={category.description}
    defaultColor={category.color}
    onSave={updateCategory}
  />
}

export function CategoryAdmin() {
  const query = useQuery();

  const categoryName = query.get("categoryName");
  const newCategory = query.get("newCategory") === "true";

  const [category, setCategory] = useState<ICategory>();

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        if (!categoryName) return;

        const response = await CategoryService.getCategoryByName(categoryName);

        setCategory(response);
      } catch(err) {
        console.error(err);
      }
    }

    fetchCategory();
  }, [categoryName]);

  return <>
    {newCategory ?
      <NewCategory/>
    : categoryName ?
      category && <EditCategory {...category}/>
    :
      <NoCategory/>
    }
  </>
}