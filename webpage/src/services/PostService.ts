/* eslint-disable @typescript-eslint/no-unused-vars */
import { api } from "../lib/axios";
import { IPost } from "../utils/interfaces/post"

const posts: IPost[] = [
  {
    id: "1234",
    rank: {upVotes: [], downVotes: []},
    title: "Teste muito absurdo",
    author: "Cicolas",
    content: "Lorem Ipsun Dolor Sit Amet.",
    createdAt: new Date(),
    last_update: new Date()
  }
]

const PostService = {
  getPostById: async (id: string) => {
    // TODO: Adicionar MOCK_API env
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(posts.find(p => p.id === id));
      }, 1000)
    })
  },

  getAllPost: async () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(posts);
      }, 1000)
    });
  },

  getAllPostByCategory: async (name: string) => {
    return new Promise((resolve, reject) => {
      resolve(posts);
    });
  },

  getAllPostByUser: async (userId: string) => {
    return new Promise((resolve, reject) => {
      resolve(posts);
    });
  },
}

export default PostService;
