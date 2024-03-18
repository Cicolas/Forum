import { useQuery } from "../../../hooks/useQuery"
import { ICategory } from "../../../utils/interfaces/category";
import { useEffect, useState } from "react";
import CategoryService from "../../../services/CategoryService";
import { EditCategory } from "./components/EditCategory";
import { NewCategory } from "./components/NewCategory";
import { NoCategory } from "./components/NoCategory";

export function AdminCategoryPage() {
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