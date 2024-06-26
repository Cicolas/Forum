import { useQuery } from "../../../hooks/useQuery"
import { ICategory } from "../../../utils/interfaces/category";
import { useContext, useEffect, useState } from "react";
import { EditCategory } from "./components/EditCategory";
import { NewCategory } from "./components/NewCategory";
import { NoCategory } from "./components/NoCategory";
import { AuthContext } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { CategoryContext } from "../../../context/CategoryContext";

export function AdminCategoryPage() {
  const query = useQuery();
  const navigate = useNavigate();

  const { authenticated, permissions } = useContext(AuthContext);
  const { categories, getCategories } = useContext(CategoryContext);

  const canCreate = permissions?.includes("create-category");
  const canUpdate = permissions?.includes("update-category");

  useEffect(() => {
    // if (!authenticated) {
    //   navigate("/not-found");
    // }
  }, [authenticated, navigate]);

  useEffect(() => {
    if (!categories)
      getCategories();
  }, [categories, getCategories]);


  const categoryName = query.get("categoryName");
  const newCategory = query.get("newCategory") === "true";

  const [category, setCategory] = useState<ICategory>();

  useEffect(() => {
    setCategory(categories?.find(value => value.name === categoryName));
  }, [categoryName, categories]);

  return <>
    {newCategory && canCreate ?
      <NewCategory/>
    : categoryName && canUpdate ?
      category && <EditCategory {...category}/>
    :
      <NoCategory/>
    }
  </>
}