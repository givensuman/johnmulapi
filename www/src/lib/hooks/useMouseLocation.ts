import { useState, useEffect } from "react";

const useMouseLocation = () => {
  const [mouseLocation, setMouseLocation] = useState({
    x: window.screen.width / 2,
    y: window.screen.height / 2,
  });

  const updateMouseLocation = (e: MouseEvent) => {
    setMouseLocation({
      x: e.pageX,
      y: e.pageY,
    });
  };

  useEffect(() => {
    window.addEventListener("mousemove", updateMouseLocation);
    return () => window.removeEventListener("mousemove", updateMouseLocation);
  }, []);

  return mouseLocation;
};

export default useMouseLocation;
