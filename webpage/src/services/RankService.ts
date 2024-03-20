import { api } from "../lib/axios";
import { handleApiAxiosError } from "../utils/errorHandledRequest";
import { VoteType } from "../utils/types/vote";

export type RankAction = "upvote" | "downvote" | "cancel";

type RankContributionRequest = {
  userId: string;
  contributionId: string;
  vote: RankAction;
}
type RankContributionResponse = {
  userId: string;
  contributionId: string;
  vote: VoteType;
};

const RankService = {
  rankContribution: async (rank: RankContributionRequest): Promise<RankContributionResponse> => {
    try {
      const response = await api.put<RankContributionResponse>(`ranking/${
        rank.contributionId
      }/${
        rank.vote
      }`);

      return response.data;
    } catch (err) {
      throw handleApiAxiosError(err, "Ocorreu um erro ao criar o comentário");
    }
  }
}

export default RankService;