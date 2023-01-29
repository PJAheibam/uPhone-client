import React from "react";

function useScrollToTop() {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
}

export default useScrollToTop;
