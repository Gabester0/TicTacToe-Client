import React from 'react';
import { Centered, MenuBtn, StyledH2 } from './MenuStyles';

const Menu = (props)=>{
    
    if(!navigator.onLine) document.getElementById('onlineGame').setAttribute('disabled', 'true')
    window.addEventListener('offline', e => document.getElementById('onlineGame').setAttribute('disabled', 'true') )
    window.addEventListener('online', e => document.getElementById('onlineGame')?.removeAttribute('disabled') );

    return (
        <Centered>
            <StyledH2>Play a local game</StyledH2>
            <MenuBtn onClick={props.localGame} >Local Game</MenuBtn>
            <StyledH2>Play a random opponent</StyledH2>
            <MenuBtn id="onlineGame" onClick={props.randomGame} >Random Opponent</MenuBtn>
        </Centered>
    )
}

export default Menu;