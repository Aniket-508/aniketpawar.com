import { useLayoutEffect } from "react";

export const useLockBodyScroll = (isLocked = true): void => {
  useLayoutEffect(() => {
    if (!isLocked) {
      return;
    }

    const rootElement = document.documentElement;
    const bodyElement = document.body;
    const previousRootOverflow = rootElement.style.overflow;
    const previousBodyOverflow = bodyElement.style.overflow;
    const previousBodyPaddingRight = bodyElement.style.paddingRight;
    const scrollbarWidth = window.innerWidth - rootElement.clientWidth;
    const bodyPaddingRight = Number.parseFloat(
      window.getComputedStyle(bodyElement).paddingRight
    );

    rootElement.style.overflow = "hidden";
    bodyElement.style.overflow = "hidden";

    if (scrollbarWidth > 0) {
      bodyElement.style.paddingRight = `${bodyPaddingRight + scrollbarWidth}px`;
    }

    return () => {
      rootElement.style.overflow = previousRootOverflow;
      bodyElement.style.overflow = previousBodyOverflow;
      bodyElement.style.paddingRight = previousBodyPaddingRight;
    };
  }, [isLocked]);
};
