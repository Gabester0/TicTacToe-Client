import React, { useEffect } from 'react';
import { Centered, MenuBtn, StyledH2 } from './MenuStyles';

const Menu = (props)=>{

    useEffect(()=>{
        window.addEventListener('offline', e => document.getElementById('randomOpponent')?.setAttribute('disabled', 'true') )
        window.addEventListener('online', e => document.getElementById('randomOpponent')?.removeAttribute('disabled') );
        return ()=>{
            window.removeEventListener('offline', e => document.getElementById('randomOpponent')?.setAttribute('disabled', 'true') )
            window.removeEventListener('online', e => document.getElementById('randomOpponent')?.removeAttribute('disabled') );
        }
    }, [])
    return (
        <Centered>
            <StyledH2>Play a local game</StyledH2>
            <MenuBtn onClick={props.localGame} >Local Game</MenuBtn>
            <StyledH2>Play a random opponent</StyledH2>
            { navigator.onLine && <MenuBtn id="randomOpponent" onClick={props.randomGame} >Random Opponent</MenuBtn>}
            { !navigator.onLine && <MenuBtn id="randomOpponent" onClick={props.randomGame} disabled="true" >Random Opponent</MenuBtn>}
        </Centered>
    )
}

export default Menu;