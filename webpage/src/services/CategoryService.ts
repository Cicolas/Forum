import { O } from "ts-toolbelt";
import { ICategory } from "../utils/interfaces/category";
import { api } from "../lib/axios";
import { handleApiAxiosError } from "../utils/errorHandledRequest";

export type CreateCategoryRequest = O.Omit<ICategory, "createdAt">;
export type UpdateCategoryRequest = O.Omit<ICategory, "createdAt">;

/* eslint-disable @typescript-eslint/no-unused-vars */
const CategoryService = {
  getCategories: async (): Promise<ICategory[]> => {
    try {
      const response = await api.get<ICategory[]>("/categories", {});

      return response.data;
    } catch (err) {
      throw handleApiAxiosError(err, "Ocorreu um erro ao listar as categorias");
    }
  },

  getCategoryByName: async (name: string): Promise<ICategory> => {
    try {
      const response = await api.get<ICategory>("/categories", {});

      return response.data;
    } catch (err) {
      throw handleApiAxiosError(err, "Ocorreu um erro ao listar as categorias");
    }
  },

  createCategory: async (category: CreateCategoryRequest): Promise<ICategory> => {
    try {
      const response = await api.post<ICategory>("/categories", category);

      return response.data;
    } catch (err) {
      throw handleApiAxiosError(err, "Ocorreu um erro ao criar a categoria");
    }
  },

  updateCategory: async (category: UpdateCategoryRequest): Promise<ICategory> => {
    try {
      const response = await api.put<ICategory>(`/categories/${category.name}`, category);

      return response.data;
    } catch (err) {
      throw handleApiAxiosError(err, "Ocorreu um erro ao atualizar a categoria");
    }
  },

  deleteCategory: async (name: string) => {
    try {
      const response = await api.delete<undefined>(`/categories/${name}`);

      return response.data;
    } catch (err) {
      throw handleApiAxiosError(err, "Ocorreu um erro ao deletar a categoria");
    }
  },
}

export default CategoryService;