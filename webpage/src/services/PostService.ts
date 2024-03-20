/* eslint-disable @typescript-eslint/no-unused-vars */
import { O } from "ts-toolbelt";
import { api } from "../lib/axios";
import { IPost } from "../utils/interfaces/post"
import { handleApiAxiosError } from "../utils/errorHandledRequest";
import { IThread } from "../utils/interfaces/thread";
import { TimestampedResponse } from "../utils/types/timestampedResponse";

type CreatePostRequest = O.Pick<IPost, "title" | "content" | "author" | "categories">;
type GetAllPostQuery = {
  category?: string;
  author?: string;
  title?: string;
}

const PostService = {
  getPostById: async (id: string): Promise<IThread> => {
    try {
      const response = await api.get<TimestampedResponse<IThread>>(`/posts/${id}`);

      const thread = {
        ...response.data,
        createdAt: new Date(response.data.createdAt * 1000),
        lastUpdate: new Date(response.data.lastUpdate * 1000),
      };

      console.log(thread.createdAt);

      return thread;
    } catch (err) {
      throw handleApiAxiosError(err, "Ocorreu um erro ao encontrar o post");
    }
  },

  getAllPost: async (params?: GetAllPostQuery): Promise<IPost[]> => {
    try {
      const response = await api.get<TimestampedResponse<IPost>[]>("/posts", {
        params: {
          category: params?.category,
          author: params?.author,
        }
      });

      const posts = response.data.map(post => ({
        ...post,
        createdAt: new Date(post.createdAt * 1000),
        lastUpdate: new Date(post.lastUpdate * 1000),
      }));

      return posts;
    } catch (err) {
      throw handleApiAxiosError(err, "Ocorreu um erro ao listar os posts");
    }
  },

  createPost: async (data: CreatePostRequest) => {
    throw new Error("Not implemented");
  }
}

export default PostService;
