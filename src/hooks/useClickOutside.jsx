import { useRef, useEffect } from "react";

function useClickOutside(handler) {
  const ref = useRef();

  function handleClick(event) {
    event.stopImmediatePropagation();
    if (ref.current && !ref.current.contains(event.target)) handler();
  }
  useEffect(() => {
    document.addEventListener("mouseup", handleClick);
    return () => document.removeEventListener("mouseup", handleClick);
  }, []);
  return ref;
}

export default useClickOutside;
