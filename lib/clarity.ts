import Clarity from "@microsoft/clarity";

let initialized = false;

export const initClarity = (projectId: string): void => {
  if (initialized || !projectId || typeof window === "undefined") {
    return;
  }

  Clarity.init(projectId);
  initialized = true;
};

export const isClarityReady = (): boolean =>
  typeof window !== "undefined" &&
  typeof (window as Window & { clarity?: (...args: unknown[]) => void })
    .clarity === "function";

export { Clarity };
