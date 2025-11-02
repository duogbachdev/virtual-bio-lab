'use client';

import { BookOpen } from 'lucide-react';
import { Theory } from '@/types/experiments';

interface TheorySectionProps {
  theory: Theory;
}

export default function TheorySection({ theory }: TheorySectionProps) {
  return (
    <div className="bg-white rounded-xl border-2 border-blue-200 p-6 mb-6">
      <div className="flex items-center space-x-3 mb-4">
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100">
          <BookOpen className="h-5 w-5 text-blue-600" />
        </div>
        <h2 className="text-2xl font-bold text-blue-800">{theory.title}</h2>
      </div>
      
      <div className="space-y-4">
        <p className="text-gray-700 leading-relaxed">{theory.content}</p>
        
        {theory.formula && (
          <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-400">
            <p className="text-sm font-semibold text-blue-700 mb-2">Phương trình:</p>
            <p className="text-gray-800 font-mono text-sm">{theory.formula}</p>
          </div>
        )}
        
        {theory.image && (
          <div className="mt-4">
            <img 
              src={theory.image} 
              alt="Minh họa" 
              className="rounded-lg border-2 border-blue-200 max-w-md mx-auto"
            />
          </div>
        )}
      </div>
    </div>
  );
}

