import React, { RefObject } from "react";
import ConfettiDot from "../confettiDot/ConfettiDot";
import { randomInRange, randomIntRange } from "../../utility/utilities";

interface ConfettiCannonProps {
    anchorRef: RefObject<HTMLImageElement>;
    colors: string[];
    dotCount: number;
}

const ConfettiCannon = ({
    anchorRef,
    colors,
    dotCount,
}: ConfettiCannonProps) => (
    <>
        {new Array(dotCount).fill("").map((_, index) => (
            <ConfettiDot
                key={index}
                color={colors[randomIntRange(0, colors.length)]}
                anchorRef={anchorRef}
                initialHorizontal={randomInRange(-250, 250)}
                initialVertical={randomInRange(200, 700)}
                rotate={randomInRange(0, 360)}
                size={randomInRange(8, 22)}
            />
        ))}
    </>
);

export default ConfettiCannon;
