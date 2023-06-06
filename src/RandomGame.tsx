import React, { useEffect, useState, useRef } from "react";
// import useSocket from 'use-socket.io-client';
import io from "socket.io-client";
import Board, {
    playAudio,
    highlightWin,
    resetHighlight,
} from "./components/board/Board";
import ConfettiCannon from "./components/confettiCannon/ConfettiCannon";
import {
    StaticDiv,
    StyledH5One,
    StyledH5Two,
    Btn,
    Cannon,
    Sound,
} from "./AppStyles";
import { delayFunction } from "./utility/utilities";
import { IBoard, Player } from "./types";

const volumeSVG = require("./static/volume.svg");
const muteSVG = require("./static/mute.svg");

// const socket = io('http://localhost:5005');

interface RandomGameProps {
    menu: () => void;
}

const RandomGame = (props: RandomGameProps): JSX.Element => {
    const { current: socket } = useRef(io("http://localhost:5005"));
    useEffect(() => {
        return () => {
            socket && socket.removeAllListeners();
            socket && socket.close();
        };
    }, [socket]);
    // DEVELOPMENT:
    // const [ socket ] = useSocket(`http://localhost:5005`, {autoConnect: false});
    // PRODUCTION:
    // const [ socket ] = useSocket(process.env.REACT_APP_SERVER_URL, {autoConnect: false});
    const [isConnected, setIsConnected] = useState<boolean>(socket.connected);
    const [ready, setReady] = useState<boolean>(false);
    const [client, setClient] = useState<Player | ``>(``);
    const [game, setGame] = useState<number | ``>();
    const [board, setBoard] = useState<IBoard>({ ...Array(9).fill(null) });
    const [player, setPlayer] = useState<Player | ``>(``);
    const [winner, setWinner] = useState<boolean>(false);
    const [draw, setDraw] = useState<boolean>(false);
    const [delay, setDelay] = useState<boolean>(false);
    const [lastWin, setLastWin] = useState<Player[]>([]);
    const [quit, setQuit] = useState<boolean>(false);

    //Store users sound setting in sessionStorage
    const soundPreference = sessionStorage.getItem("sound");
    const isSoundOn = soundPreference ? soundPreference : "true";
    sessionStorage.setItem("sound", isSoundOn);

    const updateGameState = (gameState) => {
        setGame(gameState.game);
        setBoard(gameState.board);
        setPlayer(gameState.player);
        setDraw(gameState.draw);
        setWinner(gameState.winner);
    };

    useEffect(() => {
        socket.on("connect", () => {
            setIsConnected(true);
            console.log("Connected");
        });
        socket.on("connect_error", (err) => {
            console.log({ err });
        });
        socket.on("join", ({ note, game, player, status }) => {
            setClient(player);
            sessionStorage.setItem("client", player);
            console.log(`Updated client to ${player}`);
            setGame(game);
            console.log("Client is Playing as:  ", player, note, game, status);
        });

        socket.on("start", (initialGame) => {
            console.log("Start emitted");
            setReady(true);
            updateGameState(initialGame);
            console.log(`Game ready`);
        });
    }, [socket]);

    useEffect(() => {
        console.log({ isConnected });
    }, [isConnected]);

    // useEffect( ()=>{
    //     socket.connect();

    //     socket.on('connect_error', (err) => {
    //         console.log({err})
    //     })

    //     socket.on('connection', (socket)=>{
    //         console.log(`Socket Connected!`, socket.connected)
    //     })

    //     socket.on("join", ({note, game, player, status})=>{
    //         setClient(player)
    //         sessionStorage.setItem('client', player)
    //         console.log(`Updated client to ${player}`)
    //         setGame(game)
    //         console.log("Client is Playing as:  ", player, note, game, status)
    //     })

    //     socket.on("start", (initialGame)=>{
    //         console.log("Start emitted")
    //         setReady(true)
    //         updateGameState(initialGame)
    //         console.log(`Game ready`)
    //     })
    // }, [socket])

    useEffect(() => {
        socket.on(`clicked`, (gameState) => {
            // Handle receiving emitted click from server
            console.log(`Back from the server: `, gameState);
            updateGameState(gameState);
        });

        socket.on(`gameOver`, (gameState) => {
            updateGameState(gameState);
            console.log(gameState);
            if (gameState.winner) {
                highlightWin(
                    gameState.match,
                    setLastWin,
                    lastWin,
                    gameState.player
                );
                //&& player === client
                const client = sessionStorage.getItem("client");
                if (gameState.player === client) {
                    delayFunction(1225, setDelay, true);
                    const sound = sessionStorage.getItem("sound");
                    if (sound === "true") {
                        delayFunction(1050, playAudio, "popAudio");
                    }
                }
            }
        });

        socket.on(`quit`, () => {
            console.log(`The other player has quit`);
            setReady(false);
            setQuit(true);
            sessionStorage.removeItem("client");
        });

        //Ensures this only runs once when game value has been set
        if (typeof game === `number`) {
            window.addEventListener("beforeunload", () =>
                socket.emit(`quit`, { game })
            );
            document.getElementById("menu")?.addEventListener("click", () => {
                sessionStorage.removeItem("client");
                socket.emit(`quit`, { game });
                console.log(`Emitting Quit Event`);
            });
        }

        return () => {
            window.removeEventListener("beforeunload", () =>
                socket.emit(`quit`, { game })
            );
            document
                .getElementById("menu")
                ?.removeEventListener("click", () =>
                    socket.emit(`quit`, { game })
                );
        };
    }, [socket, game, client, lastWin]);

    const handleClick = (e) => {
        if (client === player && !winner && !draw) {
            const sound = sessionStorage.getItem("sound");
            if (sound === "true") playAudio(`clickAudio`, 0.4);
            console.log(`Emitting click: `, {
                game,
                client,
                click: e.target.id,
            });
            socket.emit(`click`, { game, client, click: e.target.id });
        }
    };

    const handlePlayAgain = () => {
        const resetGameState = {
            game: ``,
            board: { ...Array(9).fill(null) },
            player: ``,
            lastMove: null,
            xMoves: [],
            oMoves: [],
            winner: false,
            draw: false,
            match: [],
        };
        updateGameState(resetGameState);
        setReady(false);
        setQuit(false);
        setDelay(false);
        setGame(``);
        if (lastWin.length >= 1) resetHighlight(lastWin[lastWin.length - 1]);
        console.log(`Initiating another game`);
        socket.emit(`initiatePlayAgain`, { game, client });
        setClient(``);
        sessionStorage.removeItem("client");
    };

    const toggleSound = () => {
        const sound = sessionStorage.getItem("sound");
        const newSound = sound === "true" ? `false` : `true`;
        sessionStorage.setItem("sound", newSound);
        document.getElementById("soundSVG").src =
            newSound === "true" ? volumeSVG : muteSVG;
    };

    const confettiAnchorRef = useRef(null);
    return (
        <>
            <StaticDiv>
                <StyledH5One draw={draw} winner={winner} player={client}>
                    {`You are player ${client}`}
                </StyledH5One>
                <StyledH5Two
                    draw={draw}
                    winner={winner}
                    player={player === "X"}
                >
                    {ready &&
                        (draw
                            ? `The game is a draw`
                            : !winner
                            ? `Player ${player}'s turn`
                            : `Player ${player} is the winner!`)}
                </StyledH5Two>
            </StaticDiv>
            <Btn id="menu" onClick={props.menu}>
                Back to menu
            </Btn>
            {(winner || draw || quit) && (
                <Btn onClick={handlePlayAgain}>Play Again</Btn>
            )}
            <Btn id="sound" onClick={toggleSound}>
                <Sound
                    id="soundSVG"
                    alt="sound"
                    src={
                        sessionStorage.getItem("sound") === "true"
                            ? volumeSVG
                            : muteSVG
                    }
                />
            </Btn>
            <h2>{!ready && !quit && `Waiting for second player`}</h2>
            <h2>{quit && `The other player left the game`}</h2>
            {ready && <Board handleClick={handleClick} board={board} />}
            <Cannon
                show={winner && player === client}
                src={require("./static/StubbyCannon.svg")}
                alt="confetti canon"
                ref={confettiAnchorRef}
            />
            {winner && player === client && delay && (
                <ConfettiCannon
                    anchorRef={confettiAnchorRef}
                    dotCount={50}
                    colors={["red", "green", "blue", "yellow"]}
                />
            )}
        </>
    );
};

export default RandomGame;
