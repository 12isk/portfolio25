import React from 'react';

/**
 * Showreel component to display a looping video.
 *
 * @param {Object} props - The component props.
 * @param {string} props.format - The format of the video. Can be "4x5" or any other value.
 * @returns {JSX.Element} The rendered Showreel component.
 */
export default function Showreel({ format }) {
  if (format === "4x5") {
    return (
      <div>
        <video autoPlay muted loop width="250" height="312" preload="none">
          <source src="media/vids/showreel_4x5.webm" type="video/webm" />
        </video>
      </div>
    );
  } else {
    return (
      <video autoPlay muted loop width="200" height="200" preload="none">
        <source src="media/vids/showreel.webm" type="video/webm" />
      </video>
    );
  }
}
