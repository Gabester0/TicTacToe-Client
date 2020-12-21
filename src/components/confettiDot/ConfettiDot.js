import React from 'react';
import { animated, config, useSpring, interpolate } from 'react-spring';
import { randomInRange, flipCoin, randomFromArray } from '../../utility/utilities';
import { StyledConfettiDotDiv } from './ConfettiDotStyles';

const AnimatedConfettiDot = animated(StyledConfettiDotDiv);

const alignWithAnchor = anchorRef =>{
    if(anchorRef.current == null){
        return {
            initialX: 0,
            initialY: 0
        }
    }
    return {
        initialX: -220,
        initialY: - 240
    };
}

const Circle = ({size, color})=>(
    <circle
        cx={`${size / 2}`}
        cy={`${size / 2}`}
        r={`${size / 2 * .6}`}
        fill={color}
    />
);

const Triangle = ({size, color}) =>{
    const flipped = flipCoin();
    return(
        <polygon
            points={`
                ${size / 2},
                0 ${size},
                ${randomInRange(flipped ? size /2 : 0, 0)} 0,
                ${randomInRange(flipped ? 0 : size / 2, size)}`}
            fill={color}
        />
    )
}

const Square = ({size, color}) =>{
    const flipped = flipCoin();
    return(
        <rect
            height={`${randomInRange( 0, flipped ? size : size / 2 )}`}
            width={`${randomInRange( 0, flipped ? size / 2 : size )}`}
            fill={color}
        />
    )
}

const getRandomShape = (color, size) =>{
    const Shape = randomFromArray([Circle, Triangle, Square]);
    return <Shape color={color} size={size} />;
}

const Dot = ({anchorRef, color, initialHorizontal, initialVertical, rotate, size}) => {
    const { initialX, initialY } = alignWithAnchor(anchorRef);

    const { horizontal, upwards, zIndex, opacity } = useSpring({
        config: config.default,
        from: {
          horizontal: initialHorizontal,
          upwards: initialVertical,
          zIndex: 1,
          opacity: 80,
        },
        to: {
          horizontal: 0,
          upwards: 0,
          zIndex: -1,
          opacity: 0,
        }
      });

    let totalHorizontal = 0;
    let totalUpwards = 0;
    const startTime = new Date().getTime() / 1000;
    let lastTime = startTime;
    const gravityPerSecond = 30;

    return (
        <AnimatedConfettiDot style={{
            opacity,
            zIndex,
            transform: interpolate([upwards, horizontal], (v,h) => {
                const currentTime = new Date().getTime() / 1000;
                const duration = currentTime - lastTime;
                const totalDuration = currentTime - startTime;
                const verticalTraveled = v * duration;
                const horizontalTraveled = h * duration;
                totalUpwards += verticalTraveled;
                totalHorizontal += horizontalTraveled;
                lastTime = currentTime;
                const totalGravity = gravityPerSecond * totalDuration;
                const finalX = initialX + totalHorizontal;
                const finalY = initialY - totalUpwards + totalGravity;
                return `translate3d(${finalX}px, ${finalY}px, 0) rotate(${rotate}deg)`;
            })
        }} >
            { getRandomShape(color, size) }
        </AnimatedConfettiDot>
    )
}

export default Dot;