import React, { MouseEventHandler } from "react";
import { BoardDiv, Background } from "./BoardStyles";
import Square from "../square/Square";
import clickAudio from "../../static/wood-click-1.wav";
import { IBoard, Player } from "../../types";

export const highlightWin = (
    match: number[],
    setLastWin: (array: number[][]) => void,
    lastWin: number[][], // This doesn't seem right
    player: Player
) => {
    setLastWin([...lastWin, match]);
    const color = player === "X" ? "#bd0000" : "#4464AD";
    console.log(match, `Highlighting the win`);
    match.forEach((e) => {
        const element = document.getElementById(e.toString()) as HTMLDivElement;
        element.style.backgroundColor = color;
    });
};

export const resetHighlight = (array: number[]) => {
    if (array.length === 3)
        array.map((e) => {
            const currentElement = document.getElementById(
                e.toString()
            ) as HTMLDivElement;
            currentElement.style.backgroundColor = "#ffffff";
        });
};

export const playAudio = (id: string, volume?: number) => {
    console.log(`Playing Audio`);
    const audio = document.getElementById(id) as HTMLAudioElement;
    if (volume !== undefined && audio) audio.volume = volume;
    audio.play();
};

const Board = ({
    board,
    handleClick,
}: {
    board: IBoard;
    handleClick: MouseEventHandler<HTMLDivElement>;
}): JSX.Element => {
    const squares = [...Array(9)].map((e, i) => (
        <Square
            id={i.toString()}
            key={i}
            value={board[i] as Player}
            click={handleClick}
        ></Square>
    ));
    return (
        <>
            <Background>
                <BoardDiv id="board">
                    {/* {children} */}
                    {squares}
                </BoardDiv>
            </Background>
            <audio id="clickAudio" preload="auto">
                <source src={clickAudio} />
            </audio>
            <audio id="popAudio" preload="none">
                <source src={require("../../static/vs-pop-1.mp3")} />
            </audio>
        </>
    );
};

export default Board;
