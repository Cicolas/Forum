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
  getPostById: (id: string) => {
    // TODO: Adicionar MOCK_API env
    return posts.find(p => p.id === id);
  },

  getAllPost: () => {
    return posts;
  },

  getAllPostByCategory: async (name: string) => {
    return await PostService.getAllPost();
  },

  getAllPostByUser: async (userId: string) => {
    return await PostService.getAllPost();
  },
}

export default PostService;
