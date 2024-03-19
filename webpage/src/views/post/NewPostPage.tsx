import { useContext, useEffect } from "react";
import { PostLayout } from "../../components/organisms/PostLayout/PostLayout";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const newPostFormSchema = z.object({
  title: z.string()
    .min(1, "Título é obrigatório"),
  content: z.string()
    .min(1, "Contúdo não pode ser vazio"),
  categoryNames: z.array(
    z.object({
      name: z.string(),
      color: z.string(),
    })
  )
})

type newPostFormData = z.infer<typeof newPostFormSchema>;

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
    formState: { isSubmitting, errors }
  } = useForm<newPostFormData>({
    resolver: zodResolver(newPostFormSchema)
  });

  const titleValue = watch("title");
  const contentValue = watch("content");
  const categoryNamesValue = watch("categoryNames");

  return <PostLayout
    author={user?.name??""}
    title={titleValue}
    content={contentValue}
    categories={categoryNamesValue}
    onTitleChange={(ev) => setValue("title", ev.target.value)}
    onContentChange={(ev) => setValue("content", ev.target.value)}
    editable
  >
  </PostLayout>
}