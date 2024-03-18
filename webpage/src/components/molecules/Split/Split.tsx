import { ReactNode } from "react";
import { Container } from "../../atoms/Container/Container";

type SplitProps = {
  left: ReactNode;
  right: ReactNode;

  className?: string;
}

export function Split({ left, right, className }: SplitProps) {
  return <Container
    alignment="flex-row" className={`content-center gap-4 w-full ${className}`}
  >
    {left}
    {right}
  </Container>
}