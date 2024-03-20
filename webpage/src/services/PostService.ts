import { api } from "../lib/axios";
import { IPost } from "../utils/interfaces/post";
import { handleApiAxiosError } from "../utils/errorHandledRequest";
import { IThread } from "../utils/interfaces/thread";

export type CreatePostRequest = {
  title: string;
  content: string;
  categoryNames: string[];
  authorId: string;
};

type GetAllPostQuery = {
  category?: string;
  author?: string;
  title?: string;
}

const PostService = {
  getPostById: async (id: string): Promise<IThread> => {
    try {
      const response = await api.get<IThread>(`/posts/${id}`);

      return response.data;
    } catch (err) {
      throw handleApiAxiosError(err, "Ocorreu um erro ao encontrar o post");
    }
  },

  getAllPost: async (params?: GetAllPostQuery): Promise<IPost[]> => {
    try {
      const response = await api.get<IPost[]>("/posts", {
        params: {
          category: params?.category,
          author: params?.author,
          title: params?.title
        }
      });

      return response.data;
    } catch (err) {
      throw handleApiAxiosError(err, "Ocorreu um erro ao listar os posts");
    }
  },

  createPost: async (data: CreatePostRequest) => {
    try {
      await api.post("/posts", data);
    } catch (err) {
      throw handleApiAxiosError(err, "Ocorreu um erro ao criar o post");
    }
  }
}

export default PostService;
