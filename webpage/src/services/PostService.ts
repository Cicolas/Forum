/* eslint-disable @typescript-eslint/no-unused-vars */
import { O } from "ts-toolbelt";
import { api } from "../lib/axios";
import { IPost } from "../utils/interfaces/post"

type CreatePostRequest = O.Omit<IPost, "createdAt" | "lastUpdate" | "id" | "rank">;
type GetAllPostQuery = {
  category?: string;
  author?: string;
  title?: string;
}

const posts: IPost[] = [
  {
    id: "1234",
    rank: {upVotes: [], downVotes: []},
    title: "Teste muito absurdo",
    categories: ["Brasil", "Humor"],
    author: "Cicolas",
    content: "Lorem Ipsun Dolor Sit Amet.",
    createdAt: new Date(),
    lastUpdate: new Date()
  }
]

const PostService = {
  getPostById: async (id: string) => {
    // TODO: Adicionar MOCK_API env
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(posts.find(p => p.id === id));
      })
    })
  },

  getAllPost: async (params?: GetAllPostQuery) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(posts);
      })
    });
  },

  getAllPostByCategory: async (name: string) => {
    return new Promise((resolve, reject) => {
      resolve(posts);
    });
  },

  createPost: async (data: CreatePostRequest) => {
    return new Promise((resolve, reject) => {
      resolve(data);
    });
  }
}

export default PostService;