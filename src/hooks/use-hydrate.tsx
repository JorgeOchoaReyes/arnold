import React from "react";

export const useHydrate = () => {
  const [hydrated, setHydrated] = React.useState(false);
    
  React.useEffect(() => {
    setHydrated(true);
  }, []);
    
  return hydrated;
};