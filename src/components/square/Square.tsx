import React, { MouseEventHandler } from "react";
import { Player } from "../../types";
import { SquareDiv } from "./SquareStyles";

const Square = ({
    id,
    value,
    click,
}: {
    id: string;
    value: Player;
    click: MouseEventHandler<HTMLDivElement>;
}): JSX.Element => {
    return (
        <SquareDiv className="square" id={id} onClick={click}>
            {/* <p>{number}</p> */}
            <h1>{value}</h1>
        </SquareDiv>
    );
};

export default Square;
