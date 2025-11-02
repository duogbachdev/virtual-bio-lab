'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Experiment } from '@/types/experiments';

interface ExperimentCardProps {
  experiment: Experiment;
}

export default function ExperimentCard({ experiment }: ExperimentCardProps) {
  return (
    <Link href={experiment.path}>
      <div className="group relative overflow-hidden rounded-2xl border-2 border-green-200 bg-white p-6 transition-all hover:shadow-xl hover:scale-105 hover:border-green-400">
        {/* Gradient background */}
        <div className={`absolute inset-0 bg-gradient-to-br ${experiment.color} opacity-0 group-hover:opacity-10 transition-opacity`} />
        
        {/* Content */}
        <div className="relative z-10">
          {/* Icon */}
          <div className="mb-4 flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-green-100 to-blue-100 text-4xl">
            {experiment.icon}
          </div>
          
          {/* Title */}
          <h3 className="text-2xl font-bold text-green-800 mb-2">
            {experiment.title}
          </h3>
          
          {/* Subtitle */}
          <p className="text-sm font-medium text-blue-600 mb-3">
            {experiment.subtitle}
          </p>
          
          {/* Description */}
          <p className="text-gray-600 text-sm mb-4 line-clamp-3">
            {experiment.description}
          </p>
          
          {/* Theory preview */}
          <div className="bg-green-50 rounded-lg p-3 mb-4">
            <p className="text-xs font-semibold text-green-700 mb-1">Cơ sở khoa học:</p>
            <p className="text-xs text-gray-700 line-clamp-2">
              {experiment.theory.content}
            </p>
          </div>
          
          {/* CTA Button */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-green-700">
              Bắt đầu thí nghiệm
            </span>
            <ArrowRight className="h-5 w-5 text-green-600 group-hover:translate-x-2 transition-transform" />
          </div>
        </div>
        
        {/* Decorative corner */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-green-200 to-blue-200 opacity-20 rounded-bl-full" />
      </div>
    </Link>
  );
}

