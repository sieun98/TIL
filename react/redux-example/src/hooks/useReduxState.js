import { useEffect, useState, useContext } from "react";
import ReduxContext from "../contexts/ReduxContext";

function useReduxState() {
  const store = useContext(ReduxContext);
  const [state, setState] = useState(store.getState());
  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      setState(store.getState());
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return state;
}

export default useReduxState;
