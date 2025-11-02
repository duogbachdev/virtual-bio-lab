'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import TheorySection from '@/components/experiments/TheorySection';
import PreparationSection from '@/components/experiments/PreparationSection';
import ReportForm from '@/components/experiments/ReportForm';
import TestTube from '@/components/lab-equipment/TestTube';
import Dropper from '@/components/lab-equipment/Dropper';
import { experiments, getBiuretSamples } from '@/data/experiments';
import { ArrowRight, RotateCcw, CheckCircle } from 'lucide-react';

export default function BiuretPage() {
  const experiment = experiments.find(e => e.id === 'biuret')!;
  const samples = getBiuretSamples();
  
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedTubes, setSelectedTubes] = useState<string[]>([]);
  const [naohAdded, setNaohAdded] = useState<string[]>([]);
  const [cuso4Added, setCuso4Added] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);

  const steps = [
    'Chọn ống nghiệm và thêm mẫu',
    'Thêm NaOH 10%',
    'Thêm CuSO₄ 1%',
    'Quan sát kết quả',
  ];

  const handleTubeClick = (tubeId: string) => {
    if (currentStep === 0 && !selectedTubes.includes(tubeId)) {
      setSelectedTubes([...selectedTubes, tubeId]);
      if (selectedTubes.length === 1) {
        setTimeout(() => setCurrentStep(1), 500);
      }
    }
  };

  const handleAddNaOH = () => {
    if (currentStep === 1 && naohAdded.length === 0) {
      setNaohAdded(selectedTubes);
      setTimeout(() => setCurrentStep(2), 1000);
    }
  };

  const handleAddCuSO4 = () => {
    if (currentStep === 2 && cuso4Added.length === 0) {
      setCuso4Added(selectedTubes);
      setTimeout(() => {
        setCurrentStep(3);
        setShowResults(true);
      }, 1500);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setSelectedTubes([]);
    setNaohAdded([]);
    setCuso4Added([]);
    setShowResults(false);
  };

  const getTubeColor = (sample: typeof samples[0], tubeId: string) => {
    if (!selectedTubes.includes(tubeId)) return '#E3F2FD';
    if (!naohAdded.includes(tubeId)) return sample.initialColor;
    if (!cuso4Added.includes(tubeId)) return '#E3F2FD';
    return sample.finalColor;
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-50 via-blue-50 to-purple-50">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-purple-800 mb-2">
            {experiment.title}
          </h1>
          <p className="text-lg text-gray-600">{experiment.subtitle}</p>
        </div>

        {/* Theory Section */}
        <TheorySection theory={experiment.theory} />

        {/* Preparation Section */}
        <PreparationSection preparation={experiment.preparation} />

        {/* Simulation Section */}
        <div className="bg-white rounded-xl border-2 border-purple-200 p-6 mb-6">
          <h2 className="text-2xl font-bold text-purple-800 mb-6">Thực Hành Thí Nghiệm</h2>
          
          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              {steps.map((step, index) => (
                <div key={index} className="flex items-center flex-1">
                  <div className="flex flex-col items-center flex-1">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                      index <= currentStep 
                        ? 'bg-purple-500 text-white' 
                        : 'bg-gray-200 text-gray-500'
                    }`}>
                      {index < currentStep ? '✓' : index + 1}
                    </div>
                    <p className="text-xs text-center mt-2 max-w-[100px]">{step}</p>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`h-1 flex-1 mx-2 ${
                      index < currentStep ? 'bg-purple-500' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Lab Setup */}
          <div className="space-y-8">
            {/* Test Tubes */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Ống nghiệm:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-items-center max-w-xl mx-auto">
                {samples.map((sample, index) => (
                  <TestTube
                    key={sample.id}
                    id={String(index + 1)}
                    label={sample.name}
                    color={getTubeColor(sample, sample.id)}
                    selected={selectedTubes.includes(sample.id)}
                    onClick={() => handleTubeClick(sample.id)}
                  />
                ))}
              </div>
            </div>

            {/* Reagents */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-12">
              {/* NaOH */}
              <Dropper
                label="NaOH 10%"
                color="#E3F2FD"
                onClick={handleAddNaOH}
                disabled={currentStep !== 1 || naohAdded.length > 0}
              />

              {/* CuSO4 */}
              <Dropper
                label="CuSO₄ 1%"
                color="#64B5F6"
                onClick={handleAddCuSO4}
                disabled={currentStep !== 2 || cuso4Added.length > 0}
              />
            </div>

            {/* Instructions */}
            <div className="bg-purple-50 rounded-lg p-4 border-l-4 border-purple-400">
              <p className="text-sm font-semibold text-purple-800 mb-2">Hướng dẫn:</p>
              <p className="text-sm text-gray-700">
                {currentStep === 0 && 'Nhấn vào các ống nghiệm để chọn và thêm mẫu vật.'}
                {currentStep === 1 && 'Nhấn vào pipet để thêm 1 mL NaOH 10% vào các ống nghiệm.'}
                {currentStep === 2 && 'Nhấn vào pipet để thêm 2-3 giọt CuSO₄ 1% vào các ống nghiệm và lắc đều.'}
                {currentStep === 3 && 'Quan sát sự thay đổi màu sắc của dung dịch trong các ống nghiệm.'}
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
                    {samples.map((sample, index) => (
                      <div key={sample.id} className="flex items-center justify-between bg-white rounded-lg p-3">
                        <div className="flex items-center space-x-3">
                          <span className="font-semibold text-gray-700">Ống {index + 1}:</span>
                          <span className="text-gray-600">{sample.name}</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div 
                            className="w-8 h-8 rounded-full border-2 border-gray-300"
                            style={{ backgroundColor: sample.finalColor }}
                          />
                          <span className={`font-semibold ${
                            sample.hasProtein ? 'text-purple-600' : 'text-gray-500'
                          }`}>
                            {sample.hasProtein ? '✓ Có protein' : '✗ Không có protein'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 bg-purple-50 rounded-lg p-4">
                    <p className="text-sm font-semibold text-purple-800 mb-2">Giải thích:</p>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li>• <strong>Lòng trắng trứng</strong> chứa protein → màu tím (phức chất Cu²⁺-peptide)</li>
                      <li>• <strong>Nước cất</strong> không chứa protein → màu xanh nhạt (Cu²⁺ trong kiềm)</li>
                      <li>• Phản ứng Biuret đặc trưng cho liên kết peptide trong protein</li>
                      <li>• Nồng độ protein càng cao, màu tím càng đậm</li>
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

