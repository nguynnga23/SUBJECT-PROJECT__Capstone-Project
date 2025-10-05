import { useCallback, useContext, useEffect } from "react";
import { UNSAFE_NavigationContext as NavigationContext } from "react-router-dom";

export function useBlocker(blocker, when = true) {
  const { navigator } = useContext(NavigationContext);

  useEffect(() => {
    if (!when) return;

    const push = navigator.push;

    navigator.push = (...args) => {
      const retry = () => {
        navigator.push = push;
        navigator.push(...args);
      };

      const result = blocker({ retry });
      if (result !== false) {
        retry();
      }
    };

    return () => {
      navigator.push = push;
    };
  }, [navigator, blocker, when]);
}
