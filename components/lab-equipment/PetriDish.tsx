'use client';

import { motion } from 'framer-motion';

interface PetriDishProps {
  id: string;
  label: string;
  sampleColor: string;
  reagentAdded?: boolean;
  finalColor?: string;
  onClick?: () => void;
  selected?: boolean;
}

export default function PetriDish({
  id,
  label,
  sampleColor,
  reagentAdded = false,
  finalColor,
  onClick,
  selected = false,
}: PetriDishProps) {
  const displayColor = reagentAdded && finalColor ? finalColor : sampleColor;

  return (
    <motion.div
      className="relative cursor-pointer"
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Petri dish container */}
      <div className={`relative ${selected ? 'ring-4 ring-green-400 rounded-full' : ''}`}>
        <svg width="150" height="150" viewBox="0 0 150 150">
          {/* Dish bottom */}
          <circle
            cx="75"
            cy="75"
            r="70"
            fill="#f8f9fa"
            stroke="#94a3b8"
            strokeWidth="2"
          />
          
          {/* Sample/Banana slice */}
          <motion.ellipse
            cx="75"
            cy="75"
            rx="50"
            ry="35"
            fill={displayColor}
            initial={{ fill: sampleColor }}
            animate={{ fill: displayColor }}
            transition={{ duration: 1 }}
          />
          
          {/* Texture lines for banana */}
          <path
            d="M 40 75 Q 75 70 110 75"
            stroke="rgba(0,0,0,0.1)"
            strokeWidth="1"
            fill="none"
          />
          <path
            d="M 40 80 Q 75 75 110 80"
            stroke="rgba(0,0,0,0.1)"
            strokeWidth="1"
            fill="none"
          />
          
          {/* Reagent drops */}
          {reagentAdded && (
            <>
              <motion.circle
                cx="60"
                cy="70"
                r="4"
                fill="#8B4513"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.6 }}
                transition={{ duration: 0.5 }}
              />
              <motion.circle
                cx="90"
                cy="70"
                r="4"
                fill="#8B4513"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.6 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              />
            </>
          )}
          
          {/* Glass shine effect */}
          <ellipse
            cx="55"
            cy="55"
            rx="20"
            ry="15"
            fill="white"
            opacity="0.3"
          />
          
          {/* Dish rim highlight */}
          <circle
            cx="75"
            cy="75"
            r="70"
            fill="none"
            stroke="white"
            strokeWidth="3"
            opacity="0.4"
          />
        </svg>
      </div>
      
      {/* Label */}
      <div className="text-center mt-2">
        <p className="text-sm font-semibold text-gray-700">{label}</p>
        <p className="text-xs text-gray-500">Đĩa {id}</p>
      </div>
      
      {/* Selected indicator */}
      {selected && (
        <motion.div
          className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
        >
          <span className="text-white text-sm">✓</span>
        </motion.div>
      )}
    </motion.div>
  );
}

