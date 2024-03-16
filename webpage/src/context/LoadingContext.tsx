import { createContext, useRef } from "react";
import LoadingBar, { LoadingBarRef } from "react-top-loading-bar";

export interface ILoadingContext {
  start: () => void;
  complete: () => void;
}

export const LoadingContext = createContext<ILoadingContext>({} as ILoadingContext);

export function LoadingProvider({ children }: { children: React.ReactNode }) {
  const ref = useRef<LoadingBarRef>(null);

  // const location = useLocation();
  // const [prevLoc, setPrevLoc] = useState("");

  // useEffect(() => {
  //   setPrevLoc(location.pathname)
  //   ref.current?.continuousStart();
  //   if(location.pathname===prevLoc){
  //     setPrevLoc('')
  //   }
  // }, [location, prevLoc])

  // useEffect(() => {
  //   ref.current?.complete();
  // }, [prevLoc])

  function start() {
    ref.current?.continuousStart();
  }

  function complete() {
    ref.current?.complete();
  }

  return <LoadingContext.Provider value={{start, complete}}>
    <LoadingBar color="#1e1e1e" ref={ref} />
    { children }
  </LoadingContext.Provider>
}