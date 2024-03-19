import { useQuery } from "../../../hooks/useQuery"
import { ICategory } from "../../../utils/interfaces/category";
import { useContext, useEffect, useState } from "react";
import CategoryService from "../../../services/CategoryService";
import { EditCategory } from "./components/EditCategory";
import { NewCategory } from "./components/NewCategory";
import { NoCategory } from "./components/NoCategory";
import { AuthContext } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export function AdminCategoryPage() {
  const query = useQuery();
  const navigate = useNavigate();

  const { authenticated, permissions } = useContext(AuthContext);
  const canCreate = permissions.includes("create-category");
  const canUpdate = permissions.includes("update-category");

  useEffect(() => {
    if (!authenticated) {
      navigate("/not-found");
    }
  }, [authenticated, navigate]);

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
    {newCategory && canCreate ?
      <NewCategory/>
    : categoryName && canUpdate ?
      category && <EditCategory {...category}/>
    :
      <NoCategory/>
    }
  </>
}