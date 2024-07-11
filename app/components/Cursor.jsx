import { gsap } from 'gsap';
import React, { useEffect, useRef } from 'react';

export default function Cursor({isHovered}) {
    const size = isHovered ? 100 : 50;

    // creating a ref for the cursor and setting the size
    const mouse = useRef({ x: 0, y: 0 })
    const circle = useRef();

    //creating a delayed cursor
    const delayedMouse = useRef({ x: 0, y: 0 }); 

    const manageMouseMove = (e) => {
        const { clientX, clientY } = e;
        mouse.current = { 
            x: clientX,
            y: clientY 
        };
        
    };

    //linear interpolation for the cursor
    const lerp = (a,b,n) => (1 - n) * a + n * b;

    // moving the cursor and setting the position while resetting the position
    // so its at the center of the mouse
    const moveCircle = (x,y) => {
        gsap.set(circle.current, {x,y, xPercent: -50, yPercent: -50});
    };

    //setting the animation for the cursor
    const animate = () => {
        const {x,y} = delayedMouse.current;
        delayedMouse.current = {
            x: lerp(x, mouse.current.x, 0.07),
            y: lerp(y, mouse.current.y, 0.07)
        };


        //more ctrl over the animation
        moveCircle(delayedMouse.current.x, delayedMouse.current.y)
        window.requestAnimationFrame(animate);
    }

    useEffect(() => {
        animate();
        window.addEventListener('mousemove', manageMouseMove);
        return () => {
            window.removeEventListener('mousemove', manageMouseMove);
        };
    }, []);

    return (
        <div
            ref={circle}
            className='fixed top-0 left-0 bg-[#BCE4F2] rounded-full mix-blend-difference pointer-events-none'
            style={{
                width: size,
                height: size,
                zIndex: 9999,
                filter: `blur(${isHovered ? '20px' : '0px'})`,
                transition: 'width 0.3s ease-out, height 0.3s ease-out, filter 0.3s ease-out',
                background: 'linear-gradient(135deg, rgba(255 , 255, 255, 0.2), rgba(255, 255, 255, 0))',
                WebkitBackdropFilter: 'blur(5px)',
                backdropFilter: 'blur(5px)',
                //borderRadius: '20px',
                //border: '1px solid rgba(255, 255, 255, 0.18)',
                //boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
            }}
        >
        </div>
    );
}
