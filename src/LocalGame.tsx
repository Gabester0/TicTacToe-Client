/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import Board, {
    playAudio,
    highlightWin,
    resetHighlight,
} from "./components/board/Board";
import ConfettiCannon from "./components/confettiCannon/ConfettiCannon";
import { StaticDiv, StyledH5Two, Btn, Cannon, Sound } from "./AppStyles";
import { delayAudio, delaySetState } from "./utility/utilities";

import mute from "./static/mute.svg";
import volume from "./static/volume.svg";
import StubbyCannon from "./static/StubbyCannon.svg";
import { IBoard, Player } from "./types";

interface LocalGameProps {
    menu: () => void;
}

export const LocalGame = (props: LocalGameProps): JSX.Element => {
    const [player, setPlayer] = useState<Player>("X");
    const [board, setBoard] = useState<IBoard>({ ...Array(9).fill(null) }); //server
    const [xmoves, setXMoves] = useState<number[]>([]);
    const [omoves, setOMoves] = useState<number[]>([]);
    const [winner, setWinner] = useState<boolean>(false);
    const [draw, setDraw] = useState<boolean>(false);
    const [lastWin, setLastWin] = useState<Player[]>([]);
    const [delay, setDelay] = useState<boolean>(false);
    const solutions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ]; //server
    //Store users sound setting in sessionStorage
    const soundPreference = sessionStorage.getItem("sound");
    const isSoundOn = soundPreference ? soundPreference : "true";
    sessionStorage.setItem("sound", isSoundOn);

    useEffect(() => {
        const win = checkWinner();
        if (win) return setWinner(true);
        if (xmoves.length + omoves.length === 9) return setDraw(true);
        if (xmoves.length + omoves.length >= 1)
            setPlayer((player) => (player === "X" ? "O" : "X")); //Conditional logic keeps extra render from toggling player before first move
    }, [board, xmoves, omoves]);

    const handleClick = (e: Event & { target: HTMLDivElement }) => {
        const curr = parseInt(e.target.id);
        if (board[curr] === null && !winner) {
            const sound = sessionStorage.getItem("sound");
            if (sound === "true") playAudio(`clickAudio`, 0.4);
            setBoard({
                ...board,
                [curr]: player,
            });
            player === "X"
                ? setXMoves([...xmoves, curr])
                : setOMoves([...omoves, curr]);
        }
    };

    const checkWinner = () => {
        const currentMoves = player === "X" ? xmoves : omoves;
        if (currentMoves.length < 3) return false;
        for (let i = 0; i < solutions.length; i++) {
            let match = currentMoves.filter((e) => solutions[i].includes(e));
            if (match.length === 3) {
                highlightWin(match, setLastWin, lastWin, player);
                delaySetState(1225, setDelay, !delay);
                const sound = sessionStorage.getItem("sound");
                if (sound === "true") {
                    delayAudio(1050, playAudio, "popAudio");
                }
                return true;
            }
        }
        return false;
    };

    const resetBoard = () => {
        setPlayer("X");
        setBoard({ ...Array(9).fill(null) });
        setXMoves([]);
        setOMoves([]);
        setWinner(false);
        setDraw(false);
        if (lastWin.length >= 1) resetHighlight(lastWin[lastWin.length - 1]);
        setDelay(false);
    };

    const toggleSound = () => {
        const sound = sessionStorage.getItem("sound");
        const newSound = sound === "true" ? `false` : `true`;
        sessionStorage.setItem("sound", newSound);
        const soundBtn = document.getElementById(
            "soundSVG"
        ) as HTMLImageElement;
        soundBtn.src = newSound === "true" ? volume : mute;
    };

    const confettiAnchorRef = useRef<HTMLImageElement>(null);

    return (
        <>
            <StaticDiv>
                <StyledH5Two draw={draw} winner={winner} player={player}>
                    {draw
                        ? `The game is a draw`
                        : !winner
                        ? `Current Player: ${player}`
                        : `Player ${player} is the winner!`}
                </StyledH5Two>
            </StaticDiv>
            <Btn onClick={resetBoard}>
                {winner || draw ? `Play again` : `Restart`}
            </Btn>
            <Btn onClick={props.menu}>Back to menu</Btn>
            <Btn id="sound" onClick={toggleSound}>
                <Sound
                    id="soundSVG"
                    alt="sound"
                    src={
                        sessionStorage.getItem("sound") === "true"
                            ? volume
                            : mute
                    }
                />
            </Btn>
            <Board handleClick={handleClick} board={board} />
            <Cannon
                show={winner}
                src={StubbyCannon}
                alt="confetti canon"
                ref={confettiAnchorRef}
            />
            {winner && delay && (
                <ConfettiCannon
                    anchorRef={confettiAnchorRef}
                    dotCount={50}
                    colors={["red", "green", "blue", "yellow"]}
                />
            )}
        </>
    );
};
