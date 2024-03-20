import { toast } from "react-toastify";
import RankService, { RankAction } from "../services/RankService";
import IUser from "./interfaces/user";
import { VoteType } from "./types/vote";

type VoteContributionArguments = {
  user?: IUser,
  contributionId: string,
  rank: VoteType,
  likeState?: VoteType,
  setLikeState: (vote: VoteType) => void
}

export async function voteContribution({
  user,
  contributionId,
  rank,
  likeState,
  setLikeState
}: VoteContributionArguments) {
  if (!user) {
    toast.error("Você precisa estar logado para rankear.");
    return;
  }

  if (rank === likeState) {
    rank = "canceled";
  }

  const action: RankAction = rank === "canceled" ? "cancel": rank;

  try {
    const response = await RankService.rankContribution({
      contributionId,
      userId: user!.id,
      vote: action
    });

    setLikeState(response.vote);
  } catch (error) {
    toast.error("Erro ao rankear post.");
  }
}