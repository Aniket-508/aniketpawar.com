import { useSyncExternalStore } from "react";

const getServerSnapshot = () => false;

export const useMediaQuery = (query: string) =>
  useSyncExternalStore(
    (onStoreChange) => {
      const matchQueryList = matchMedia(query);
      matchQueryList.addEventListener("change", onStoreChange);
      return () => {
        matchQueryList.removeEventListener("change", onStoreChange);
      };
    },
    () => matchMedia(query).matches,
    getServerSnapshot
  );
