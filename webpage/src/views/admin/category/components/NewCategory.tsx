import { CategoryForm } from "./CategoryForm"
import { CreateCategoryRequest } from "../../../../services/CategoryService";
import { useContext } from "react";
import { CategoryContext } from "../../../../context/CategoryContext";
import { useNavigate } from "react-router-dom";

export function NewCategory() {
  const navigate = useNavigate();
  const { createCategory } = useContext(CategoryContext);

  function handleCreate(data: CreateCategoryRequest) {
    console.log("handle")
    createCategory(data);
    navigate("/admin/category");
  }

  return <CategoryForm onSave={handleCreate} isCreate/>
}
