import { toast } from "react-toastify"
import { CategoryForm } from "./CategoryForm"
import CategoryService, { CreateCategoryRequest } from "../../../../services/CategoryService";

export function NewCategory() {
  async function createCategory(data: CreateCategoryRequest) {
    try {
      const response = await CategoryService.createCategory(data);
      toast.info(`${data.name} criada com sucesso!`);
      console.log(response);
    } catch (err) {
      toast.error("Erro ao criar a categoria!");
    }
  }

  return <CategoryForm onSave={createCategory} isCreate/>
}
