'use client';

import { motion } from 'framer-motion';

interface BurnerProps {
  isOn: boolean;
  onClick?: () => void;
}

export default function Burner({ isOn, onClick }: BurnerProps) {
  return (
    <div className="flex flex-col items-center">
      <motion.div
        className="relative cursor-pointer"
        onClick={onClick}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Flame */}
        {isOn && (
          <motion.div
            className="absolute -top-16 left-1/2 transform -translate-x-1/2"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
          >
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.8, 1, 0.8],
              }}
              transition={{
                repeat: Infinity,
                duration: 0.5,
              }}
            >
              <svg width="60" height="80" viewBox="0 0 60 80">
                {/* Outer flame (orange) */}
                <path
                  d="M30 10 Q20 30 25 50 Q28 60 30 70 Q32 60 35 50 Q40 30 30 10"
                  fill="#FF6B35"
                  opacity="0.8"
                />
                {/* Middle flame (yellow) */}
                <path
                  d="M30 20 Q24 35 27 50 Q29 58 30 65 Q31 58 33 50 Q36 35 30 20"
                  fill="#FFA500"
                  opacity="0.9"
                />
                {/* Inner flame (light yellow) */}
                <path
                  d="M30 30 Q27 40 29 50 Q30 55 30 60 Q30 55 31 50 Q33 40 30 30"
                  fill="#FFD700"
                />
                {/* Core (white-blue) */}
                <ellipse
                  cx="30"
                  cy="50"
                  rx="3"
                  ry="8"
                  fill="#87CEEB"
                  opacity="0.8"
                />
              </svg>
            </motion.div>
          </motion.div>
        )}
        
        {/* Burner body */}
        <svg width="80" height="100" viewBox="0 0 80 100">
          {/* Base */}
          <rect
            x="10"
            y="85"
            width="60"
            height="10"
            rx="2"
            fill="#4a5568"
          />
          
          {/* Stand */}
          <rect
            x="35"
            y="60"
            width="10"
            height="25"
            fill="#718096"
          />
          
          {/* Burner top */}
          <rect
            x="25"
            y="50"
            width="30"
            height="15"
            rx="2"
            fill="#2d3748"
          />
          
          {/* Burner holes */}
          <circle cx="32" cy="57" r="1.5" fill="#4a5568" />
          <circle cx="40" cy="57" r="1.5" fill="#4a5568" />
          <circle cx="48" cy="57" r="1.5" fill="#4a5568" />
          
          {/* Gas control knob */}
          <circle
            cx="15"
            cy="70"
            r="5"
            fill={isOn ? '#48bb78' : '#cbd5e0'}
            stroke="#2d3748"
            strokeWidth="1"
          />
        </svg>
      </motion.div>
      
      {/* Label */}
      <div className="text-center mt-2">
        <p className="text-sm font-semibold text-gray-700">
          {isOn ? '🔥 Đang đun' : '❄️ Tắt'}
        </p>
        <p className="text-xs text-gray-500">
          {isOn ? 'Nhấn để tắt' : 'Nhấn để bật'}
        </p>
      </div>
    </div>
  );
}

