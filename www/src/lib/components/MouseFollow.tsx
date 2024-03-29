import { Box, keyframes, useColorModeValue } from "@chakra-ui/react";
import { useState, useEffect, useRef } from "react";

import useMouseLocation from "../hooks/useMouseLocation";

const MouseFollow = () => {
  const mouseLocation = useMouseLocation();
  const SIZE = 300;

  const spin = keyframes`
        from {transform:rotate(0deg);}
        to {transform:rotate(360deg);}
    `;
  const animation = `${spin} infinite 5s linear`;

  const background = useColorModeValue(
    "linear-gradient(90deg, rgba(214,212,254,1) 0%, rgba(214,214,255,1) 35%, rgba(147,237,255,1) 100%)",
    "linear-gradient(90deg, rgba(116,115,128,1) 0%, rgba(64,101,121,1) 35%, rgba(72,41,179,1) 100%)"
  );

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [blur, setBlur] = useState(500);
  const randomizeBlur = () => {
    setBlur(Math.random() * 500 + 500);
  };
  useEffect(() => {
    intervalRef.current = setInterval(randomizeBlur, 1000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <Box
      h={SIZE}
      w={SIZE}
      rounded="full"
      background={background}
      position="absolute"
      animation={animation}
      style={{
        top: mouseLocation.y - SIZE / 2,
        left: mouseLocation.x - SIZE / 2,
        filter: `blur(${blur}px)`,
      }}
      zIndex={-100}
      transition="filter 1000ms"
    />
  );
};

export default MouseFollow;
