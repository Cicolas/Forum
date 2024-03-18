import { CategoryForm } from "./CategoryForm"

export function NewCategory() {
  function createCategory() {
    console.log("create")
  }

  return <CategoryForm onSave={createCategory} isCreate/>
}
