import { O } from "ts-toolbelt";
import { api } from "../lib/axios";
import { IComment } from "../utils/interfaces/comment";
import { handleApiAxiosError } from "../utils/errorHandledRequest";

export type CreateCommentRequest = {
  parentId: string;
  authorId: string;
  content: string;
}
export type CreateCommentResponse = O.Omit<IComment, "upVotes" | "downVotes" | "replies">

export const CommentService = {
  createComment: async (comment: CreateCommentRequest): Promise<IComment> => {
    try {
      const response = await api.post<IComment>("/comments", comment);

      return response.data;
    } catch (err) {
      throw handleApiAxiosError(err, "Ocorreu um erro ao criar o comentário");
    }
  }
}