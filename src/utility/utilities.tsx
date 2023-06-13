import { Dispatch, SetStateAction } from "react";

export const randomInRange = (min: number, max: number): number =>
    Math.random() * (max - min) + min;

export const randomInHighRange = (min: number, max: number): number => {
    return randomInRange(0.5, 1) * (max - min) + min;
};

export const randomIntRange = (min: number, max: number): number =>
    Math.floor(randomInRange(min, max));

export const randomFromArray = (array: JSX.Element[]): JSX.Element =>
    array[randomIntRange(0, array.length)];

export const flipCoin = (): boolean => Math.round(Math.random()) === 1;

type FirstArgument = number;
type SecondArgument = (
    arg: string
) => void | React.Dispatch<React.SetStateAction<boolean>>;
type ThirdArgument = string | boolean;

export const delayAudio = (
    time: number,
    delayedFunction: (arg: string) => void,
    argument: string
): ((timer: number) => void) => {
    let timer = setTimeout(() => {
        delayedFunction(argument);
    }, time);
    return () => clearTimeout(timer);
};

export const delaySetState = (
    time: number,
    delayedFunction: Dispatch<SetStateAction<boolean>>,
    argument: boolean
): ((timer: number) => void) => {
    let timer = setTimeout(() => {
        delayedFunction(argument);
    }, time);
    return () => clearTimeout(timer);
};
