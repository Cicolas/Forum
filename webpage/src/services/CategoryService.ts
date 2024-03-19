import { O } from "ts-toolbelt";
import { ICategory } from "../utils/interfaces/category";

export type CreateCategoryRequest = O.Omit<ICategory, "createdAt">;
export type UpdateCategoryRequest = O.Omit<ICategory, "createdAt">;

let categories: ICategory[] = [
  {name: "Brasil", color: "#6D8C003D", description: "Posts relacionado com o Brasil", createdAt: new Date()},
  {name: "Humor", color: "#BD613C40", description: "Posts de humor duvidoso", createdAt: new Date()},
]

/* eslint-disable @typescript-eslint/no-unused-vars */
const CategoryService = {
  getCategories: async (): Promise<ICategory[]> => {
    return new Promise((resolve) => {
      resolve(categories)
    });
  },

  getCategoryByName: async (name: string): Promise<ICategory> => {
    return new Promise((resolve) => {
      resolve(categories.filter(value => value.name === name)[0]);
    });
  },

  createCategory: async (category: CreateCategoryRequest): Promise<ICategory> => {
    return new Promise((resolve) => {
      const newCategory = {...category, "createdAt": new Date()};
      categories.push(newCategory)
      console.log(categories);

      resolve(newCategory)
    });
  },

  updateCategory: async (category: UpdateCategoryRequest): Promise<ICategory> => {
    return new Promise((resolve) => {
      categories = categories.map(value => {
        if (value.name === category.name)
          return {...category, "createdAt": value.createdAt};
        else
          return value;
      })

      resolve(categories.filter(value => value.name === category.name)[0])
    });
  },

  deleteCategory: async (name: string) => {
    return new Promise((resolve) => {
      categories = categories.filter(value => value.name !== name)
      resolve(categories);
    });
  },
}

export default CategoryService;