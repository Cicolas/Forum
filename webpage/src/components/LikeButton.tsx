import { ArrowCircleDown, ArrowCircleUp } from "phosphor-react";
import { ReactNode } from "react";

const LikeButtonColorClasses = {
  "upvote": "text-olive-drab-700",
  "downvote": "text-serenade-700",
  "undefined": "text-silver-chalice-400",
}

type LikeButtonWrapper = {
  orientation: "vertical" | "horizontal";
  children: ReactNode[];
}

type LikeButtonProps = {
  count: number;
  state: "upvote" | "downvote" | "undefined";
  orientation: "vertical" | "horizontal";
  onLike?: () => void;
  onDislike?: () => void;
}

function LikeButtonWrapper({ orientation, children }: LikeButtonWrapper) {
  return orientation === "vertical" ?
    <div className="flex flex-col content-center items-center gap-1 p-[0.125rem]">
      {children}
    </div>
    :
    <div className="flex flex-col justify-center items-end gap-8 self-stretch">
      <div className="flex p-[0.125rem] content-center items-center gap-1 rounded-2xl bg-silver-chalice-400 bg-opacity-25">
        {children}
      </div>
    </div>

}

export function LikeButton({ count, state, orientation }: LikeButtonProps) {
  return (<>
    <LikeButtonWrapper orientation={orientation}>
      <ArrowCircleUp
        className={`${state === "upvote" ? LikeButtonColorClasses["upvote"] : LikeButtonColorClasses["undefined"]} cursor-pointer`}
        size={24}
        weight="bold"
      ></ArrowCircleUp>
      {count}
      <ArrowCircleDown
        className={`${state === "downvote" ? LikeButtonColorClasses["downvote"] : LikeButtonColorClasses["undefined"]} cursor-pointer`}
        size={24}
        weight="bold"
      ></ArrowCircleDown>
    </LikeButtonWrapper>
  </>)
}