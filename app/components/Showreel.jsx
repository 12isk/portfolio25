import React from 'react'

export default function Showreel() {
  return (
    <div>
        <video autoPlay muted loop width="200" height="200" preload="none">
            <source src="media/vids/showreel.webm" type="video/webm" />
        </video>
    </div>
  )
}
