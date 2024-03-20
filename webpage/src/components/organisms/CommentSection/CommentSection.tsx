import { PaperPlaneRight } from "phosphor-react";
import { IComment } from "../../../utils/interfaces/comment";
import { Content } from "../../atoms/Content/Content";
import { TextArea } from "../../atoms/TextArea/TextArea";
import { Title } from "../../atoms/Title/Title";
import { Comment } from "../../molecules/Comment/Comment";
import { useContext, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { toast } from "react-toastify";
import CommentService from "../../../services/CommentService";

type ICommentSectionProps = {
  postId: string;
  comments: IComment[];
}

export function CommentSection({ postId, comments }: ICommentSectionProps) {
  const { user, permissions } = useContext(AuthContext);

  const canComment = permissions?.includes("create-contribution") || true;

  const [comment, setComment] = useState("");
  const [commentsList, setCommentsList] = useState<IComment[]>(comments);

  const handleSubmit = async() => {
    if (!user) {
      toast.error("Você precisa estar logado para comentar.");
      return;
    }

    if (comment) {
      try {
        const response = await CommentService.createComment({
          parentId: postId,
          authorId: user.id,
          content: comment
        });

        setCommentsList(prev => ([...prev, response]));
        setComment("");
      } catch (error) {
        toast.error("Erro ao criar comentário.");
      }
    }
  }

  return <>
    <Content>
      <div className="pb-2 self-stretch border-b-2 border-solid border-silver-chalice-400">
        <Title className="tracking-wider">Comentários</Title>
      </div>

      {canComment &&
        <div className="flex flex-row pr-4 pl-1 pt-4 content-between items-center self-stretch gap-2">
          <TextArea
            value={comment}
            onChange={(ev) => setComment(ev.target.value)}
            placeholder="Adicionar um Comentário"
            minHeight="2.5em"
            className="flex-grow flex-shrink-0"
            borderless
          >
          </TextArea>

          <PaperPlaneRight
            onClick={handleSubmit}
            size={24}
            className="text-silver-chalice-400 cursor-pointer"
          >
          </PaperPlaneRight>
        </div>
      }
    </Content>
    <div className="flex flex-col gap-4">
      {commentsList.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </div>
  </>;
}