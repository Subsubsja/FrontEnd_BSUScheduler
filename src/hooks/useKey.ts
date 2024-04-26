import { useEffect, useRef } from "react";

const useKey = (key: string, callback: (event?: any) => void) => {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  });

  useEffect(() => {
    const handleEvent = (event: any) => {
      if (event.code === key) {
        callbackRef.current(event);
      } else if (key === "ctrls" && event.key === "s" && event.ctrlKey) {
        event.preventDefault();
        callbackRef.current(event);
      }
    };

    document.addEventListener("keydown", handleEvent);
    return () => document.removeEventListener("keydown", handleEvent);
  }, [key]);
};

export default useKey;