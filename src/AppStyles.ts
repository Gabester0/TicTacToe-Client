import styled from 'styled-components';
import { Player } from './types';

export const AppDiv = styled.div`
    text-align: center;
    color: #390040;
    font-family: sans-serif;
`;

export const StaticDiv = styled.div`
    margin: 0;
    height: 60px;
    width: 100%;
    display: flex;
    align-content: center;
    justify-content: center;
    @media (max-width: 440px){
        flex-direction: column;
        height: auto;
    }
`;

export const StyledH1 = styled.h1`
    font-weight: 100;
    font-size: 2.5rem;
`;

interface StyledH5Props {
    draw: Boolean;
    winner: Boolean;
    player: Player;
}

export const StyledH5One = styled.h5<StyledH5Props>`
    margin: 0 20px;
    font-size: ${ props => (props.winner || props.draw) ? "24px" : "20px" };
    color: ${props=>
        props.player === "X" ?
            "#bd0000" :
                "#4464AD"
    };
    @media (max-width: 440px){
        margin: 0 0 20px 0;
    }
`;

export const StyledH5Two = styled.h5<StyledH5Props>`
    margin: 0 20px;
    font-size: ${ props => (props.winner || props.draw) ? "24px" : "20px" };
    transition: all .4s;
    color: ${ props =>
        props.draw ?
            "#390040" :
                props.player === "X" ?
                    "#bd0000" :
                        "#4464AD"
    };
    @media (max-width: 440px){
        margin: 0 0 20px 0;
    }
`;

export const Btn = styled.button`
    color: #390040;
    font-size: 16px;
    margin: auto 10px 20px 10px; 
    border: 1px solid #390040;
    border-radius: 6px;
    padding: 10px 20px;
    background-color: #F0EFF4;
    box-shadow: 0 0 0 1px white;
    &:focus{
        outline: none;
        box-shadow: 0 0 0 1px blue;
    }
`;

export const Sound = styled.img`
    width: 14px;
    height: 14px;
    color: #390040;
`;

export const Cannon = styled.img`
    width: auto;
    height: 100px;
    transition: all 1s;
    opacity: ${props => props.show ? 1 : 0};
    margin: 10px auto;
    color: #390040;
`;

// Color Scheme: #F0EFF4 #05A8AA #390040 #4464AD #E55934