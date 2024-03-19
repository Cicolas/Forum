import { useLoaderData } from "react-router-dom";
import { IPost } from "../../utils/interfaces/post";
import { PostLayout } from "../../components/organisms/PostLayout/PostLayout";
import { useContext, useEffect, useState } from "react";
import { CategoryContext } from "../../context/CategoryContext";
import { ICategory } from "../../utils/interfaces/category";

// const _comment: IComment = {
//   id: "12345",
//   parentId: "1234",
//   author: "cicolas",
//   content: "é muito e massa",
//   rank: {upVotes: [], downVotes: []},
//   createdAt: 0,
//   lastUpdate: 0
// }

export function PostPage() {
  const { categories, getCategories } = useContext(CategoryContext);
  const post = useLoaderData() as IPost;
  const [postCategories, setPostCategories] = useState<ICategory[]>([]);

  useEffect(() => {
    async function loadCategoriesByName(categoryNames: string[]) {
      if (!categories) await getCategories();

      setPostCategories(
        categories!.filter(value => categoryNames.includes(value.name))
      );
    }

    loadCategoriesByName(post.categories);
  }, [categories, getCategories, post.categories]);


  return <PostLayout
    id={post.id}
    title={post.title}
    author={post.author}
    categories={postCategories}
    content={post.content}
    createdAt={post.createdAt}
    likable
  >
  </PostLayout>
}