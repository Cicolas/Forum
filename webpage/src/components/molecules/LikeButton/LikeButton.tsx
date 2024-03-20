import { ArrowCircleDown, ArrowCircleUp } from "phosphor-react";
import { ReactNode, useEffect, useMemo, useState } from "react";
import { VoteType } from "../../../utils/types/vote";

const LikeButtonColorClasses = {
  "upvote": "text-olive-drab-700",
  "downvote": "text-serenade-700",
  "undefined": "text-silver-chalice-400",
}

type LikeButtonWrapperProps = {
  orientation: "vertical" | "horizontal";
  className?: string;
  disabled?: boolean;

  children: ReactNode[];
}

type LikeButtonProps = {
  count: number;
  state?: VoteType;
  orientation: "vertical" | "horizontal";
  disabled?: boolean;
  hasVoted?: VoteType;

  onLike: () => void;
  onDislike: () => void;
  className?: string;
}

function LikeButtonWrapper({ orientation, disabled, className, children }: LikeButtonWrapperProps) {
  return orientation === "vertical" ?
    <div className={`flex flex-col content-center items-center gap-1 p-[0.125rem] ${className}`}>
      {children}
    </div>
    :
    <div className={`flex flex-col justify-center items-end gap-8 self-stretch ${className}`}>
      <div className={`
        flex justify-center items-center gap-1
        p-[0.125rem]
        rounded-2xl bg-silver-chalice-400 bg-opacity-25
        ${disabled && "aspect-square"}
      `}>
        {children}
      </div>
    </div>
}

export function LikeButton({ count, state, hasVoted, orientation, disabled, onLike, onDislike, className }: LikeButtonProps) {
  const [actualCount, setActualCount] = useState(count);

  useEffect(() => {
    //   0  +1  +2
    //  -1   0  +1
    //  -2  -1   0
    const newCountMap = {
      "upvote": {
        "upvote":   count,
        "canceled": count - 1,
        "downvote": count - 2
      },
      "canceled": {
        "upvote":   count + 1,
        "canceled": count,
        "downvote": count - 1,
      },
      "downvote": {
        "upvote":   count + 2,
        "canceled": count + 1,
        "downvote": count
      }
    }

    setActualCount(newCountMap[hasVoted ?? "canceled"][state ?? "canceled"]);
  }, [count, state, hasVoted]);

  return (<>
    <LikeButtonWrapper orientation={orientation} className={`
      ${className}
    `}>
      <ArrowCircleUp
        className={`
          ${state === "upvote" ? LikeButtonColorClasses["upvote"] : LikeButtonColorClasses["undefined"]}
          cursor-pointer
          ${disabled && "hidden"}
        `}
        size={24}
        weight="bold"
        onClick={onLike}
      ></ArrowCircleUp>
      {actualCount}
      <ArrowCircleDown
        className={`
          ${state === "downvote" ? LikeButtonColorClasses["downvote"] : LikeButtonColorClasses["undefined"]}
          cursor-pointer
          ${disabled && "hidden"}
        `}
        size={24}
        weight="bold"
        onClick={onDislike}
      ></ArrowCircleDown>
    </LikeButtonWrapper>
  </>)
}