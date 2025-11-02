'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import TheorySection from '@/components/experiments/TheorySection';
import PreparationSection from '@/components/experiments/PreparationSection';
import ReportForm from '@/components/experiments/ReportForm';
import PetriDish from '@/components/lab-equipment/PetriDish';
import Dropper from '@/components/lab-equipment/Dropper';
import { experiments, getLugolSamples } from '@/data/experiments';
import { ArrowRight, RotateCcw, CheckCircle } from 'lucide-react';

export default function LugolPage() {
  const experiment = experiments.find(e => e.id === 'lugol')!;
  const samples = getLugolSamples();
  
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedDishes, setSelectedDishes] = useState<string[]>([]);
  const [reagentAdded, setReagentAdded] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);

  const steps = [
    'Đặt mẫu chuối vào đĩa petri',
    'Thêm thuốc thử Lugol',
    'Quan sát kết quả',
  ];

  const handleDishClick = (dishId: string) => {
    if (currentStep === 0 && !selectedDishes.includes(dishId)) {
      setSelectedDishes([...selectedDishes, dishId]);
      if (selectedDishes.length === 1) {
        setTimeout(() => setCurrentStep(1), 500);
      }
    }
  };

  const handleAddReagent = () => {
    if (currentStep === 1 && reagentAdded.length === 0) {
      setReagentAdded(selectedDishes);
      setTimeout(() => {
        setCurrentStep(2);
        setShowResults(true);
      }, 1500);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setSelectedDishes([]);
    setReagentAdded([]);
    setShowResults(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-yellow-50 via-green-50 to-indigo-50">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-indigo-800 mb-2">
            {experiment.title}
          </h1>
          <p className="text-lg text-gray-600">{experiment.subtitle}</p>
        </div>

        {/* Theory Section */}
        <TheorySection theory={experiment.theory} />

        {/* Preparation Section */}
        <PreparationSection preparation={experiment.preparation} />

        {/* Simulation Section */}
        <div className="bg-white rounded-xl border-2 border-indigo-200 p-6 mb-6">
          <h2 className="text-2xl font-bold text-indigo-800 mb-6">Thực Hành Thí Nghiệm</h2>
          
          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              {steps.map((step, index) => (
                <div key={index} className="flex items-center flex-1">
                  <div className="flex flex-col items-center flex-1">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                      index <= currentStep 
                        ? 'bg-indigo-500 text-white' 
                        : 'bg-gray-200 text-gray-500'
                    }`}>
                      {index < currentStep ? '✓' : index + 1}
                    </div>
                    <p className="text-xs text-center mt-2 max-w-[120px]">{step}</p>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`h-1 flex-1 mx-2 ${
                      index < currentStep ? 'bg-indigo-500' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Lab Setup */}
          <div className="space-y-8">
            {/* Petri Dishes */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Đĩa petri:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-items-center max-w-2xl mx-auto">
                {samples.map((sample) => (
                  <PetriDish
                    key={sample.id}
                    id={sample.id === 'green-banana' ? '1' : '2'}
                    label={sample.name}
                    sampleColor={sample.initialColor}
                    reagentAdded={reagentAdded.includes(sample.id)}
                    finalColor={sample.finalColor}
                    onClick={() => handleDishClick(sample.id)}
                    selected={selectedDishes.includes(sample.id)}
                  />
                ))}
              </div>
            </div>

            {/* Lugol Reagent */}
            <div className="flex justify-center">
              <Dropper
                label="Thuốc thử Lugol (I₂ + KI)"
                color="#8B4513"
                onClick={handleAddReagent}
                disabled={currentStep !== 1 || reagentAdded.length > 0}
              />
            </div>

            {/* Instructions */}
            <div className="bg-indigo-50 rounded-lg p-4 border-l-4 border-indigo-400">
              <p className="text-sm font-semibold text-indigo-800 mb-2">Hướng dẫn:</p>
              <p className="text-sm text-gray-700">
                {currentStep === 0 && 'Nhấn vào các đĩa petri để đặt mẫu chuối.'}
                {currentStep === 1 && 'Nhấn vào pipet để thêm 2 giọt thuốc thử Lugol vào mỗi mẫu chuối.'}
                {currentStep === 2 && 'Quan sát sự thay đổi màu sắc tại vị trí nhỏ thuốc thử.'}
              </p>
            </div>

            {/* Results */}
            <AnimatePresence>
              {showResults && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-green-50 rounded-lg p-6 border-2 border-green-300"
                >
                  <div className="flex items-center space-x-2 mb-4">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                    <h3 className="text-xl font-bold text-green-800">Kết Quả Thí Nghiệm</h3>
                  </div>
                  
                  <div className="space-y-3">
                    {samples.map((sample) => (
                      <div key={sample.id} className="flex items-center justify-between bg-white rounded-lg p-3">
                        <div className="flex items-center space-x-3">
                          <span className="font-semibold text-gray-700">{sample.name}:</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div 
                            className="w-8 h-8 rounded-full border-2 border-gray-300"
                            style={{ backgroundColor: sample.finalColor }}
                          />
                          <span className={`font-semibold ${
                            sample.hasStarch ? 'text-indigo-600' : 'text-gray-500'
                          }`}>
                            {sample.hasStarch ? '✓ Có tinh bột' : '✗ Không có tinh bột'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 bg-indigo-50 rounded-lg p-4">
                    <p className="text-sm font-semibold text-indigo-800 mb-2">Giải thích:</p>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li>• <strong>Chuối xanh</strong> chứa nhiều tinh bột → màu xanh đen (phức hợp I₂-Amylose)</li>
                      <li>• <strong>Chuối chín</strong> tinh bột đã chuyển thành đường → không đổi màu hoặc màu vàng nhạt</li>
                      <li>• Quá trình chín làm enzyme phân giải tinh bột thành đường đơn, tạo vị ngọt</li>
                    </ul>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Action Buttons */}
            <div className="flex justify-center gap-4">
              <button
                onClick={handleReset}
                className="flex items-center space-x-2 px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                <RotateCcw className="h-5 w-5" />
                <span>Làm lại</span>
              </button>
              
              {showResults && (
                <button
                  onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
                  className="flex items-center space-x-2 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                >
                  <span>Báo cáo kết quả</span>
                  <ArrowRight className="h-5 w-5" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Questions Section */}
        <div className="bg-white rounded-xl border-2 border-purple-200 p-6 mb-6">
          <h2 className="text-2xl font-bold text-purple-800 mb-4">Câu Hỏi Thảo Luận</h2>
          <div className="space-y-4">
            {experiment.questions.map((question, index) => (
              <div key={index} className="bg-purple-50 rounded-lg p-4">
                <p className="font-semibold text-purple-800 mb-2">Câu {index + 1}:</p>
                <p className="text-gray-700">{question}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Report Form */}
        <ReportForm experimentTitle={experiment.title} experimentId={experiment.id} />
      </main>
      
      <Footer />
    </div>
  );
}

