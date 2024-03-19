import { X } from "phosphor-react";
import { ReactNode } from "react";

type ModalProps = {
  open?: boolean;
  className?: string;
  children: Array<ReactNode> | ReactNode;
  subElement?: ReactNode;
  darken?: boolean;

  requestClose?: () => void;
}

export function Modal({ subElement, open, darken, className, children, requestClose }: ModalProps) {
  return <div className={`
      ${open ? "grid" : "hidden"}
      place-items-center
      fixed top-0 left-0 w-full h-full
      ${darken ? "bg-shark-950 bg-opacity-25" : "bg-serenade-50"}
      ${className}
    `}>
    <div className="w-1/3 2xl:w-1/4 flex flex-col content-center items-end gap-2">
      <div className="flex flex-col relative w-full items-start gap-4 p-4 bg-serenade-50 border-2 rounded-lg border-silver-chalice-400">
        {requestClose &&
          <X
            weight="bold"
            className="text-silver-chalice-400 absolute right-4 cursor-pointer"
            onClick={(ev) => {requestClose(); ev.preventDefault()}}
          >
          </X>
        }
        {children}
      </div>
      {subElement}
    </div>
  </div>
}