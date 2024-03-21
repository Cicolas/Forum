import { useContext, useState } from "react";
import { PostLayout } from "../../components/organisms/PostLayout/PostLayout";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import PostService, { CreatePostRequest } from "../../services/PostService";
import { toast } from "react-toastify";
import { ICategory } from "../../utils/interfaces/category";

export function NewPostPage() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [categories, setCategories] = useState<ICategory[]>([]);

  const createPost = async () => {
    if (!user) {
      toast.error("Usuário não autenticado");
      return;
    }

    const post: CreatePostRequest = {
      title: title,
      content: content,
      categoryNames: categories.map(c => c.name),
      authorId: user.id,
    };

    if (!post.title) {
      toast.warn("Título é obrigatório");
      return;
    }

    if (!post.content) {
      toast.warn("Conteúdo é obrigatório");
      return;
    }

    try {
      const response = await PostService.createPost(post);

      toast.info("Post criado com sucesso!");
      navigate(`/post/${response.id}`);
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        throw err;
      }
    }
  }

  return <>
    {user &&
      <PostLayout
        post={{
          id: "",
          title: title,
          content: content,
          categories: categories,

          author: user,
          comments: [],
          createdAt: 0,
          lastUpdate: 0,
          upVotes: [],
          downVotes: [],
        }}
        onTitleChange={(ev) => setTitle(ev.target.value)}
        onContentChange={(ev) => setContent(ev.target.value)}
        onCategoriesChange={(categories) =>
          setCategories(categories)
        }
        onSubmit={createPost}
        editable
      >
      </PostLayout>
    }
  </>
}