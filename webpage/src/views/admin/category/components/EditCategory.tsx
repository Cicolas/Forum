import { UpdateCategoryRequest } from "../../../../services/CategoryService";
import { ICategory } from "../../../../utils/interfaces/category"
import { CategoryForm } from "./CategoryForm"
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CategoryContext } from "../../../../context/CategoryContext";

export function EditCategory(category: ICategory) {
  const navigate = useNavigate();

  const { updateCategory, deleteCategory } = useContext(CategoryContext);

  async function handleSave(data: UpdateCategoryRequest) {
    await updateCategory(data);
    navigate("/admin/category");
  }

  async function handleDelete() {
    await deleteCategory(category.name);
    navigate("/admin/category");
  }

  return <CategoryForm
    defaultName={category.name}
    defaultDescription={category.description}
    defaultColor={category.color}
    onSave={handleSave}
    onDelete={handleDelete}
  />
}