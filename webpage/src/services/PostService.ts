/* eslint-disable @typescript-eslint/no-unused-vars */
import { IPost } from "../utils/interfaces/post"

const posts: IPost[] = [
  {
    id: "1234",
    rank: {upVotes: [], downVotes: []},
    title: "Teste muito absurdo",
    author: "Cicolas",
    content: "Lorem Ipsun Dolor Sit Amet.",
    created_at: new Date(),
    last_update: new Date()
  }
]

const PostService = {
  getPostById: async (id: string) => {
    // TODO: Adicionar MOCK_API env
    return new Promise(resolve => {
      resolve(posts.find(p => p.id === id));
    })
  },

  getAllPost: async () => {
    return new Promise((resolve, reject) => {
      resolve(posts);
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
