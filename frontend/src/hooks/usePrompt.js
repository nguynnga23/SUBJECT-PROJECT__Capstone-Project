import { useCallback } from "react";
import { useBlocker } from "./useBlocker";

export function usePrompt(message, when = true) {
  const blocker = useCallback(
    ({ retry }) => {
      if (window.confirm(message)) {
        retry();
      }
    },
    [message]
  );

  useBlocker(blocker, when);
}
