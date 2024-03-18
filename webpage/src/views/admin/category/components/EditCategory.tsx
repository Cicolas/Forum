import { toast } from "react-toastify";
import CategoryService, { UpdateCategoryRequest } from "../../../../services/CategoryService";
import { ICategory } from "../../../../utils/interfaces/category"
import { CategoryForm } from "./CategoryForm"
import { useNavigate } from "react-router-dom";

export function EditCategory(category: ICategory) {
  const navigate = useNavigate();

  async function updateCategory(data: UpdateCategoryRequest) {
    try {
      const response = await CategoryService.updateCategory(data);
      toast.info(`${category.name} alterada com sucesso!`);
      console.log(response);
    } catch (err) {
      toast.error("Erro ao atualizar a categoria!");
    }
  }

  async function deleteCategory() {
    try {
      const response = await CategoryService.deleteCategory(category.name);
      navigate("/admin/category")
      toast.info(`${category.name} deletada com sucesso!`);
      console.log(response);
    } catch (err) {
      toast.error("Erro ao atualizar a categoria!");
    }
  }

  return <CategoryForm
    defaultName={category.name}
    defaultDescription={category.description}
    defaultColor={category.color}
    onSave={updateCategory}
    onDelete={deleteCategory}
  />
}