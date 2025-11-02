'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

interface DropperProps {
  label: string;
  color: string;
  onClick?: () => void;
  disabled?: boolean;
  draggable?: boolean;
  dropperId?: string;
}

export default function Dropper({
  label,
  color,
  onClick,
  disabled = false,
  draggable = false,
  dropperId = 'dropper'
}: DropperProps) {
  const [isDropping, setIsDropping] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const handleClick = () => {
    if (!disabled && onClick) {
      setIsDropping(true);
      onClick();
      setTimeout(() => setIsDropping(false), 1500);
    }
  };

  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('text/plain', dropperId);
    setIsDragging(true);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  // Render component with native HTML5 drag-and-drop on outer div
  // and Framer Motion animations on inner motion.div
  return (
    <div
      className={`flex flex-col items-center ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
      draggable={draggable && !disabled}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <motion.div
        onClick={handleClick}
        whileHover={disabled ? {} : { scale: 1.05 }}
        whileTap={disabled ? {} : { scale: 0.95 }}
        animate={isDragging ? { rotate: 45, x: 20, y: -10 } : {}}
      >
      {/* Dropper */}
      <svg width="60" height="100" viewBox="0 0 60 100">
        {/* Rubber bulb */}
        <ellipse
          cx="30"
          cy="20"
          rx="15"
          ry="18"
          fill="#e53e3e"
          opacity="0.8"
        />
        <ellipse
          cx="30"
          cy="18"
          rx="12"
          ry="15"
          fill="#fc8181"
          opacity="0.6"
        />
        
        {/* Glass tube */}
        <rect
          x="27"
          y="35"
          width="6"
          height="50"
          fill="white"
          stroke="#94a3b8"
          strokeWidth="1"
          opacity="0.9"
        />
        
        {/* Liquid inside */}
        <rect
          x="28"
          y="40"
          width="4"
          height="40"
          fill={color}
          opacity="0.8"
        />
        
        {/* Glass shine */}
        <rect
          x="28"
          y="38"
          width="1.5"
          height="45"
          fill="white"
          opacity="0.4"
        />
        
        {/* Tip */}
        <path
          d="M 27 85 L 30 95 L 33 85 Z"
          fill="white"
          stroke="#94a3b8"
          strokeWidth="1"
          opacity="0.9"
        />
        
        {/* Drop animation when clicked or idle */}
        {!disabled && !isDropping && (
          <motion.circle
            cx="30"
            cy="95"
            r="2"
            fill={color}
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: [0, 1, 0], y: [0, 10, 20] }}
            transition={{ repeat: Infinity, duration: 2, repeatDelay: 1 }}
          />
        )}

        {/* Active dropping animation */}
        {isDropping && (
          <>
            <motion.circle
              cx="30"
              cy="95"
              r="3"
              fill={color}
              animate={{ opacity: [1, 0], y: [0, 30] }}
              transition={{ duration: 0.5, repeat: 3 }}
            />
            <motion.circle
              cx="30"
              cy="95"
              r="3"
              fill={color}
              animate={{ opacity: [1, 0], y: [0, 30] }}
              transition={{ duration: 0.5, repeat: 3, delay: 0.2 }}
            />
          </>
        )}
      </svg>

      {/* Label */}
      <div className="text-center mt-2">
        <p className="text-xs font-semibold text-gray-700">{label}</p>
        {!disabled && !isDropping && (
          <p className="text-xs text-green-600">{draggable ? 'Kéo hoặc nhấn' : 'Nhấn để thêm'}</p>
        )}
        {isDropping && (
          <p className="text-xs text-blue-600 font-semibold">Đang nhỏ...</p>
        )}
      </div>

      {/* Draggable indicator */}
      {draggable && !disabled && (
        <div className="absolute top-0 right-0 bg-purple-500 text-white text-xs px-2 py-1 rounded-bl-lg">
          ↔️
        </div>
      )}
      </motion.div>
    </div>
  );
}

