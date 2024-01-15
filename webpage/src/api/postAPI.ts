import { IPost } from "../shared/interfaces/post"

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

export async function getPostById(id: string) {
  // TODO: Adicionar MOCK_API flag
  return posts.find(p => p.id === id);
}

export async function getAllPost() {
  return posts;
}

export async function getAllPostByCategory(name: string) {
  return await getAllPost()
}

export async function getAllPostByUser(userId: string) {
  return await getAllPost()
}
