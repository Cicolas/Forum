import { ArrowCircleDown, ArrowCircleUp } from "phosphor-react";
import { ReactNode } from "react";
import { VoteType } from "../../../utils/types/vote";

const LikeButtonColorClasses = {
  "upvote": "text-olive-drab-700",
  "downvote": "text-serenade-700",
  "undefined": "text-silver-chalice-400",
}

type LikeButtonWrapperProps = {
  orientation: "vertical" | "horizontal";
  className?: string;

  children: ReactNode[];
}

type LikeButtonProps = {
  count: number;
  state: VoteType;
  orientation: "vertical" | "horizontal";
  onLike?: () => void;
  onDislike?: () => void;
  className?: string;
}

function LikeButtonWrapper({ orientation, className, children }: LikeButtonWrapperProps) {
  return orientation === "vertical" ?
    <div className={`flex flex-col content-center items-center gap-1 p-[0.125rem] ${className}`}>
      {children}
    </div>
    :
    <div className={`flex flex-col justify-center items-end gap-8 self-stretch ${className}`}>
      <div className="flex p-[0.125rem] content-center items-center gap-1 rounded-2xl bg-silver-chalice-400 bg-opacity-25">
        {children}
      </div>
    </div>
}

export function LikeButton({ count, state, orientation, onLike, onDislike, className }: LikeButtonProps) {
  function handleLike() {
    if (onLike) onLike();
  }

  function handleDislike() {
    if (onDislike) onDislike();
  }

  return (<>
    <LikeButtonWrapper orientation={orientation} className={className}>
      <ArrowCircleUp
        className={`${state === "upvote" ? LikeButtonColorClasses["upvote"] : LikeButtonColorClasses["undefined"]} cursor-pointer`}
        size={24}
        weight="bold"
        onClick={handleLike}
      ></ArrowCircleUp>
      {count}
      <ArrowCircleDown
        className={`${state === "downvote" ? LikeButtonColorClasses["downvote"] : LikeButtonColorClasses["undefined"]} cursor-pointer`}
        size={24}
        weight="bold"
        onClick={handleDislike}
      ></ArrowCircleDown>
    </LikeButtonWrapper>
  </>)
}