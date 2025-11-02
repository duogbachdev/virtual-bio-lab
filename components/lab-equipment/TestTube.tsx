'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface TestTubeProps {
  id: string;
  label: string;
  color: string;
  selected?: boolean;
  onClick?: () => void;
  heated?: boolean;
  className?: string;
  onDrop?: (droppedItem: string) => void;
  liquidLevel?: number; // 0-100
  canShake?: boolean;
  draggable?: boolean;
}

export default function TestTube({
  id,
  label,
  color,
  selected = false,
  onClick,
  heated = false,
  className = '',
  onDrop,
  liquidLevel = 55,
  canShake = false,
  draggable = false,
}: TestTubeProps) {
  const [isShaking, setIsShaking] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isPouringFrom, setIsPouringFrom] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('text/plain', `tube-${id}`);
    setIsPouringFrom(true);
  };

  const handleDragEnd = () => {
    setIsPouringFrom(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const droppedItem = e.dataTransfer.getData('text/plain');
    if (onDrop) {
      onDrop(droppedItem);
    }
  };

  const handleShake = () => {
    if (canShake) {
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 1000);
    }
  };

  // Calculate liquid dimensions (tube body is from y=5 to y=123, height=118)
  // Liquid area is from y=8 to y=120 (height=112)
  const maxLiquidHeight = 112;
  const liquidHeight = (liquidLevel / 100) * maxLiquidHeight;
  const liquidY = 120 - liquidHeight;

  return (
    <motion.div
      className={`relative cursor-pointer ${className}`}
      onClick={onClick}
      draggable={draggable}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      animate={
        isShaking ? {
          rotate: [0, -8, 8, -8, 8, 0],
          transition: { duration: 0.6 }
        } : heated ? {
          y: [0, -2, 0]
        } : isPouringFrom ? {
          rotate: 45,
          x: 20,
          y: -10
        } : {}
      }
      transition={heated ? { repeat: Infinity, duration: 0.5 } : {}}
    >
      {/* Drag over indicator */}
      {isDragOver && (
        <motion.div
          className="absolute inset-0 border-4 border-green-400 rounded-lg bg-green-100 bg-opacity-30 z-10 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        />
      )}

      {/* Test tube container */}
      <div className={`relative w-20 h-32 ${selected ? 'ring-4 ring-green-400 rounded-lg' : ''}`}>
        {/* Test tube body */}
        <svg viewBox="0 0 80 128" className="w-full h-full">
          {/* Glass tube background */}
          <rect
            x="20"
            y="5"
            width="40"
            height="118"
            rx="5"
            fill="#f8f9fa"
            stroke={isDragOver ? "#4ade80" : "#94a3b8"}
            strokeWidth={isDragOver ? "3" : "2"}
            opacity="0.3"
          />

          {/* Liquid with dynamic level */}
          {mounted && liquidLevel > 0 && (
            <motion.rect
              x="22"
              y={liquidY}
              width="36"
              height={liquidHeight}
              rx="3"
              fill={color}
              opacity="0.9"
              initial={{ height: liquidHeight, y: liquidY, fill: color }}
              animate={{
                height: liquidHeight,
                y: liquidY,
                fill: color
              }}
              transition={{ duration: 0.8 }}
            />
          )}

          {/* Glass tube outline */}
          <rect
            x="20"
            y="5"
            width="40"
            height="118"
            rx="5"
            fill="none"
            stroke={isDragOver ? "#4ade80" : "#94a3b8"}
            strokeWidth={isDragOver ? "3" : "2"}
          />

          {/* Bubbles when shaking */}
          {isShaking && (
            <>
              <motion.circle
                cx="35"
                cy={liquidY + 20}
                r="2"
                fill="white"
                opacity="0.7"
                animate={{ y: [0, -40], opacity: [0.7, 0] }}
                transition={{ duration: 0.5 }}
              />
              <motion.circle
                cx="45"
                cy={liquidY + 30}
                r="3"
                fill="white"
                opacity="0.7"
                animate={{ y: [0, -50], opacity: [0.7, 0] }}
                transition={{ duration: 0.6, delay: 0.1 }}
              />
              <motion.circle
                cx="40"
                cy={liquidY + 40}
                r="2.5"
                fill="white"
                opacity="0.7"
                animate={{ y: [0, -45], opacity: [0.7, 0] }}
                transition={{ duration: 0.55, delay: 0.2 }}
              />
            </>
          )}
          
          {/* Glass shine effect */}
          <rect
            x="25"
            y="10"
            width="8"
            height="100"
            fill="white"
            opacity="0.3"
            rx="2"
          />
          
          {/* Rim */}
          <ellipse
            cx="40"
            cy="5"
            rx="20"
            ry="3"
            fill="#e2e8f0"
            stroke="#94a3b8"
            strokeWidth="1"
          />
        </svg>
        
        {/* Heating effect */}
        {heated && (
          <motion.div
            className="absolute -bottom-2 left-1/2 transform -translate-x-1/2"
            animate={{
              opacity: [0.5, 0.8, 0.5],
              scale: [1, 1.1, 1],
            }}
            transition={{
              repeat: Infinity,
              duration: 1,
            }}
          >
            <div className="text-2xl">🔥</div>
          </motion.div>
        )}
      </div>
      
      {/* Label */}
      <div className="text-center mt-2">
        <p className="text-xs font-semibold text-gray-700">{label}</p>
        <p className="text-xs text-gray-500">Ống {id}</p>
      </div>

      {/* Shake button */}
      {canShake && !isShaking && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleShake();
          }}
          className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-blue-500 text-white text-xs rounded-full hover:bg-blue-600 transition-colors shadow-md"
        >
          🧪 Lắc
        </button>
      )}

      {/* Selected indicator */}
      {selected && (
        <motion.div
          className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center shadow-lg"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
        >
          <span className="text-white text-xs">✓</span>
        </motion.div>
      )}

      {/* Draggable indicator */}
      {draggable && (
        <div className="absolute top-0 right-0 bg-purple-500 text-white text-xs px-2 py-1 rounded-bl-lg">
          ↔️
        </div>
      )}
    </motion.div>
  );
}

