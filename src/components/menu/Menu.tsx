import React, { useEffect } from "react";
import { Centered, MenuBtn, StyledH2 } from "./MenuStyles";

interface MenuProps {
    localGame: () => void;
    randomGame: () => void;
}

const Menu = ({ localGame, randomGame }: MenuProps): JSX.Element => {
    useEffect(() => {
        window.addEventListener("offline", (e) =>
            document
                .getElementById("randomOpponent")
                ?.setAttribute("disabled", "true")
        );
        window.addEventListener("online", (e) =>
            document
                .getElementById("randomOpponent")
                ?.removeAttribute("disabled")
        );
        return () => {
            window.removeEventListener("offline", (e) =>
                document
                    .getElementById("randomOpponent")
                    ?.setAttribute("disabled", "true")
            );
            window.removeEventListener("online", (e) =>
                document
                    .getElementById("randomOpponent")
                    ?.removeAttribute("disabled")
            );
        };
    }, []);

    return (
        <Centered>
            <StyledH2>Play a local game</StyledH2>
            <MenuBtn onClick={localGame}>Local Game</MenuBtn>
            <StyledH2>Play a random opponent</StyledH2>
            {navigator.onLine && (
                <MenuBtn id="randomOpponent" onClick={randomGame}>
                    Random Opponent
                </MenuBtn>
            )}
            {!navigator.onLine && (
                <MenuBtn id="randomOpponent" onClick={randomGame} disabled>
                    Random Opponent
                </MenuBtn>
            )}
        </Centered>
    );
};

export default Menu;
