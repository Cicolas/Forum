type BoxProps = {
  children?: React.ReactNode[]
}

export function Box({ children }: BoxProps) {
  return <div className="w-1/3 flex flex-col content-center items-end gap-2">
    {children}
  </div>
}