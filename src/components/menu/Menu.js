import React from 'react';
import { Centered, MenuBtn, StyledH2 } from './MenuStyles';

const Menu = (props)=>{

    return (
        <Centered>
            <StyledH2>Play a local game</StyledH2>
            <MenuBtn onClick={props.localGame} >Local Game</MenuBtn>
            <StyledH2>Play a random opponent</StyledH2>
            <MenuBtn id="randomOpponent" onClick={props.randomGame} >Random Opponent</MenuBtn>
        </Centered>
    )
}

window.addEventListener('offline', e => document.getElementById('randomOpponent')?.setAttribute('disabled', 'true') )
window.addEventListener('online', e => document.getElementById('randomOpponent')?.removeAttribute('disabled') );
if( navigator.onLine !== true && !!document.getElementById('randomOpponent') ) document.getElementById('randomOpponent').setAttribute('disabled', 'true')

export default Menu;