import { useContext, useEffect } from "react";
import { PostLayout } from "../../components/organisms/PostLayout/PostLayout";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import PostService from "../../services/PostService";
import { toast } from "react-toastify";

const newPostFormSchema = z.object({
  title: z.string()
    .min(1, "Título é obrigatório"),
  content: z.string()
    .min(1, "Contúdo não pode ser vazio"),
  categories: z.array(
    z.object({
      name: z.string(),
      color: z.string(),
    })
  )
})

export type newPostFormData = z.infer<typeof newPostFormSchema>;

export function NewPostPage() {
  const navigate = useNavigate();
  const { authenticated, user } = useContext(AuthContext);

  useEffect(() => {
    if (!authenticated) navigate("/feed/recent");
  }, [authenticated, navigate])

  const {
    handleSubmit,
    setValue,
    watch,
    formState: { isSubmitting }
  } = useForm<newPostFormData>({
    resolver: zodResolver(newPostFormSchema),
    values: {
      title: "",
      content: "",
      categories: []
    }
  });

  const titleValue = watch("title");
  const contentValue = watch("content");
  const categoriesValue = watch("categories");

  const createPost = async (data: newPostFormData) => {
    if (!user) {
      toast.error("Usuário não autenticado");
      return;
    }

    console.log(data);
    try {
      await PostService.createPost({
        title: data.title,
        author: user.name,
        content: data.content,
        categories: data.categories.map(category => category.name)
      })

      toast.info("Post criado com sucesso!");
      navigate("/feed/recent");
    } catch (err) {
      toast.error("Erro ao criar post");
    }
  }

  return <PostLayout
    author={user?.name??""}
    title={titleValue}
    content={contentValue}
    categories={categoriesValue}
    onTitleChange={(ev) => setValue("title", ev.target.value)}
    onContentChange={(ev) => setValue("content", ev.target.value)}
    onCategoriesChange={(categories) => setValue("categories", categories)}
    handleSubmit={handleSubmit}
    onSubmit={createPost}
    isSubmiting={isSubmitting}
    editable
  >
  </PostLayout>
}