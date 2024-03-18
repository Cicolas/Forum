import { ICategory } from "../../../../utils/interfaces/category"
import { CategoryForm } from "./CategoryForm"

export function EditCategory(category: ICategory) {
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