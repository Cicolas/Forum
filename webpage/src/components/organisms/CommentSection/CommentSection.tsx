import { PaperPlaneRight } from "phosphor-react";
import { IComment } from "../../../utils/interfaces/comment";
import { Content } from "../../atoms/Content/Content";
import { TextArea } from "../../atoms/TextArea/TextArea";
import { Title } from "../../atoms/Title/Title";
import { Comment } from "../../molecules/Comment/Comment";
import { useContext, useState } from "react";
import { CommentService } from "../../../services/CommentService";
import { AuthContext } from "../../../context/AuthContext";
import { toast } from "react-toastify";

type ICommentSectionProps = {
  postId: string;
  comments: IComment[];
}

export function CommentSection({ postId, comments }: ICommentSectionProps) {
  const { user, permissions } = useContext(AuthContext);

  const canComment = permissions?.includes("create-contribution") || true;

  const [comment, setComment] = useState("");

  const handleSubmit = () => {
    if (!user) {
      toast.error("Você precisa estar logado para comentar.");
      return;
    }

    if (comment) {
      CommentService.createComment({
        parentId: postId,
        authorId: "1",
        content: comment
      });

      setComment("");
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
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </div>
  </>;
}