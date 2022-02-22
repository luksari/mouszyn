import React, { Suspense, useCallback, useEffect, useState } from "react";
import { useSpring } from "@react-spring/core";
import { TextMesh } from "../textMesh/TextMesh";

export const InteractiveText = () => {
  const [toggleVal, setToggleVal] = useState(0);
  const [{ animValue }] = useSpring(
    () => ({ animValue: toggleVal, config: { mass: 1, tension: 300, friction: 50, precision: 0.0001 } }),
    [toggleVal]
  );
  const [hovered, setHover] = useState(false);
  // Events
  const handleClick = useCallback(() => setToggleVal((toggle) => Number(!toggle)), [setToggleVal]);
  const handlePointerOver = useCallback(() => setHover(true), []);
  const handlePointerOut = useCallback(() => setHover(false), []);
  const initY = 0;

  const animScale = animValue.to([0, 1], [0.3, 0.6]);

  const animPosY = animValue.to([0, 1], [initY, 1]);
  const animColor = animValue.to([0, 1], ["#FAC000", "#D73502"]);

  useEffect(() => {
    document.body.style.cursor = hovered ? "pointer" : "auto";
  }, [hovered]);

  return (
    <group>
      <fog attach='fog' args={["white", 50, 190]} />
      <Suspense fallback={null}>
        <TextMesh
          hAlign='center'
          position={[0, initY, 4]}
          size={3}
          fontSize={8}
          color={animColor}
          onClick={handleClick}
          scale-y={animScale}
          position-y={animPosY}
          onPointerOver={handlePointerOver}
          onPointerOut={handlePointerOut}
        >
          Fuego
        </TextMesh>
      </Suspense>
    </group>
  );
};
