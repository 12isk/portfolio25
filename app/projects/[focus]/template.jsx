"use client";
import { animatePageIn } from "@/app/utils/animations";
import { useEffect } from "react";

export default function Template({children}) {

    const colors = ["#832388", "#e3436b", "#f0772f", "#33CCFF", "#000"];
    //const reversedColors = ["#0c0c0c", "#33CCFF", "#f0772f", "#e3436b", "#832388"];
    useEffect(() => {
      animatePageIn();
    }, []);


    return (
        <div>
          {colors.map((color, index) => (
            <div key={index}
              id={`banner-${index}`}
              className={`fixed top-0 left-0 ${index !== 4 ? "" : ""}`}
              //ref={(ref) => (banners.current[index] = ref)} 
              style={{ width: "110vw", height: "110vh", 
                backgroundColor: color, zIndex: index + 11, 
                filter: index !== 4 ? "none" : "none" 
              }} />
          ))}
          {children}
        </div>
    )
    }