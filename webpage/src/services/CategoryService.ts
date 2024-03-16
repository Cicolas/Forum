import { ICategory } from "../utils/interfaces/category";

const categories: ICategory[] = [
  {name: "Brasil", color: "#6D8C003D", description: "Posts relacionado com o Brasil", },
  {name: "Humor", color: "#BD613C40", description: "Posts de humor duvidoso", }
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

  createCategory: async (category: ICategory) => {
    return new Promise((resolve) => {
      resolve(true)
    });
  },
}

export default CategoryService;