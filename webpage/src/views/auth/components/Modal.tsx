import { ReactNode } from "react";

type ModalProps = {
  children: Array<ReactNode> | ReactNode;
}

export function Modal({ children }: ModalProps) {
  return <div className="flex flex-col w-full items-start gap-4 p-4 border-2 rounded-lg border-silver-chalice-400">
    {children}
  </div>
}