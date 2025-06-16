
import React, { useState } from 'react';

const MetaBalls = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="relative w-full flex-1 overflow-hidden cursor-pointer transition-all duration-300 bg-black rounded-lg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute inset-0">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 400 200"
          className="w-full h-full"
        >
          <g>
            {/* Ball 1 */}
            <circle
              cx="100"
              cy="100"
              r="30"
              fill="#00ff00"
              className={`animate-[move1_6s_ease-in-out_infinite] transition-all duration-300 ${
                isHovered ? 'animate-[move1_2s_ease-in-out_infinite]' : ''
              }`}
            />
            
            {/* Ball 2 */}
            <circle
              cx="200"
              cy="100"
              r="25"
              fill="#00dd00"
              className={`animate-[move2_4s_ease-in-out_infinite_reverse] transition-all duration-300 ${
                isHovered ? 'animate-[move2_1.5s_ease-in-out_infinite_reverse]' : ''
              }`}
            />
            
            {/* Ball 3 */}
            <circle
              cx="300"
              cy="100"
              r="35"
              fill="#00bb00"
              className={`animate-[move3_5s_ease-in-out_infinite] transition-all duration-300 ${
                isHovered ? 'animate-[move3_2.5s_ease-in-out_infinite]' : ''
              }`}
            />
            
            {/* Ball 4 */}
            <circle
              cx="150"
              cy="50"
              r="20"
              fill="#88ff88"
              className={`animate-[move4_7s_ease-in-out_infinite_reverse] transition-all duration-300 ${
                isHovered ? 'animate-[move4_3s_ease-in-out_infinite_reverse]' : ''
              }`}
            />
            
            {/* Ball 5 */}
            <circle
              cx="250"
              cy="150"
              r="28"
              fill="#44ff44"
              className={`animate-[move5_3s_ease-in-out_infinite] transition-all duration-300 ${
                isHovered ? 'animate-[move5_1s_ease-in-out_infinite]' : ''
              }`}
            />
          </g>
        </svg>
      </div>
    </div>
  );
};

export default MetaBalls;
