'use client';

import { Beaker, FlaskConical, TestTube2, AlertTriangle } from 'lucide-react';
import { Preparation } from '@/types/experiments';

interface PreparationSectionProps {
  preparation: Preparation;
}

export default function PreparationSection({ preparation }: PreparationSectionProps) {
  return (
    <div className="bg-white rounded-xl border-2 border-green-200 p-6 mb-6">
      <div className="flex items-center space-x-3 mb-4">
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-100">
          <Beaker className="h-5 w-5 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-green-800">Chuẩn Bị</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Samples */}
        <div>
          <div className="flex items-center space-x-2 mb-3">
            <TestTube2 className="h-5 w-5 text-purple-600" />
            <h3 className="font-semibold text-gray-800">Mẫu vật</h3>
          </div>
          <ul className="space-y-2">
            {preparation.samples.map((sample, index) => (
              <li key={index} className="text-sm text-gray-700 flex items-start">
                <span className="text-purple-500 mr-2">•</span>
                <span>{sample}</span>
              </li>
            ))}
          </ul>
        </div>
        
        {/* Chemicals */}
        <div>
          <div className="flex items-center space-x-2 mb-3">
            <FlaskConical className="h-5 w-5 text-blue-600" />
            <h3 className="font-semibold text-gray-800">Hóa chất</h3>
          </div>
          <ul className="space-y-2">
            {preparation.chemicals.map((chemical, index) => (
              <li key={index} className="text-sm text-gray-700 flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>{chemical}</span>
              </li>
            ))}
          </ul>
        </div>
        
        {/* Equipment */}
        <div>
          <div className="flex items-center space-x-2 mb-3">
            <Beaker className="h-5 w-5 text-green-600" />
            <h3 className="font-semibold text-gray-800">Dụng cụ</h3>
          </div>
          <ul className="space-y-2">
            {preparation.equipment.map((item, index) => (
              <li key={index} className="text-sm text-gray-700 flex items-start">
                <span className="text-green-500 mr-2">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      {/* Safety Notes */}
      {preparation.safetyNotes && preparation.safetyNotes.length > 0 && (
        <div className="mt-6 bg-orange-50 rounded-lg p-4 border-l-4 border-orange-400">
          <div className="flex items-center space-x-2 mb-3">
            <AlertTriangle className="h-5 w-5 text-orange-600" />
            <h3 className="font-semibold text-orange-800">Lưu ý an toàn</h3>
          </div>
          <ul className="space-y-2">
            {preparation.safetyNotes.map((note, index) => (
              <li key={index} className="text-sm text-gray-700 flex items-start">
                <span className="text-orange-500 mr-2">⚠</span>
                <span>{note}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

