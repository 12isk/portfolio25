import { gsap } from 'gsap';
import React, { useEffect, useRef } from 'react';

const colors = [
    "#c32d27",
    "#f5c63f",
    "#457ec4",
    "356fdb"
]
const colors2 = [
    "#832388",
    "#e3436b",
    "#f0772f",
    "#cad0ff",
    
]

export default function GradientCursor({isHovered}) {
    const size = isHovered ? 100 : 60;
    
    // creating a ref for the cursor and setting the size
    const mouse = useRef({ x: 0, y: 0 })
    const circles = useRef([]);

    //creating a delayed cursor
    const delayedMouse = useRef({ x: 0, y: 0 }); 
    
    //colors for cursor
    

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
        //gsap.set(circle.current, {x,y, xPercent: -50, yPercent: -50});

        circles.current.forEach((circle, i) => {
            gsap.set(circle, {x,y, xPercent: -50, yPercent: -50});
        });
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
        <>
            {colors2.map((color, i, array) => {
                return <div
                    ref={ref => circles.current[i] = ref}
                    key={color}
                    className='fixed top-0 left-0  rounded-full mix-blend-difference pointer-events-none'
                    style={{
                        backgroundColor: color,
                        width: size,
                        height: size,
                        zIndex: 9999,
                        filter: `blur(${isHovered ? '20px' : '5px'})`,
                        transition: `width 0.3s ease-out, height 0.3s ease-out, filter 0.3s ease-out, transform ${(array.length -i) * 0.05 }s ease-out `,
                        // background: 'linear-gradient(135deg, rgba(255 , 255, 255, 0.2), rgba(255, 255, 255, 0))',
                        // WebkitBackdropFilter: 'blur(5px)',
                        // backdropFilter: 'blur(5px)',
                        //borderRadius: '20px',
                        //border: '1px solid rgba(255, 255, 255, 0.18)',
                        //boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
                    }}
                >
                </div>
            })}
        </>
    );
        
    
}
