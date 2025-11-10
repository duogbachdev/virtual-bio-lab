'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import TestTube from '@/components/lab-equipment/TestTube';
import Dropper from '@/components/lab-equipment/Dropper';
import ResultsSection from '@/components/experiments/ResultsSection';
import ReportForm from '@/components/experiments/ReportForm';
import { experiments, getBiuretSamples } from '@/data/experiments';
import { ArrowRight, RotateCcw, CheckCircle, Info } from 'lucide-react';

export default function BiuretInteractivePage() {
  const experiment = experiments.find(e => e.id === 'biuret')!;
  const samples = getBiuretSamples();

  const [tubes, setTubes] = useState(
    samples.map((sample) => ({
      id: sample.id,
      sample: sample,
      naohAdded: false,
      cuso4Added: false,
      liquidLevel: 50,
      color: sample.initialColor,
    }))
  );

  const [showResults, setShowResults] = useState(false);
  const [isReportSubmitted, setIsReportSubmitted] = useState(false);

  const allTubesHaveNaOH = tubes.every(tube => tube.naohAdded);
  const allTubesHaveCuSO4 = tubes.every(tube => tube.cuso4Added);

  const handleDropOnTube = (tubeId: string, droppedItem: string) => {
    if (droppedItem === 'naoh-reagent') {
      setTubes(tubes.map(tube => {
        if (tube.id === tubeId && !tube.naohAdded) {
          return {
            ...tube,
            naohAdded: true,
            liquidLevel: 60,
          };
        }
        return tube;
      }));
    } else if (droppedItem === 'cuso4-reagent') {
      setTubes(tubes.map(tube => {
        if (tube.id === tubeId && tube.naohAdded && !tube.cuso4Added) {
          // Sau 1.5s sẽ đổi màu
          setTimeout(() => {
            setTubes(prevTubes => prevTubes.map(t => {
              if (t.id === tubeId) {
                return {
                  ...t,
                  color: t.sample.finalColor
                };
              }
              return t;
            }));
          }, 1500);

          return {
            ...tube,
            cuso4Added: true,
            liquidLevel: 65,
          };
        }
        return tube;
      }));

      // Kiểm tra nếu tất cả ống đã có CuSO4
      const allAdded = tubes.every(t => t.id === tubeId || t.cuso4Added);
      if (allAdded) {
        setTimeout(() => {
          setShowResults(true);
        }, 2000);
      }
    }
  };

  const handleReset = () => {
    setTubes(samples.map((sample) => ({
      id: sample.id,
      sample: sample,
      naohAdded: false,
      cuso4Added: false,
      liquidLevel: 50,
      color: sample.initialColor,
    })));
    setShowResults(false);
  };

  const handleReportSubmit = () => {
    setIsReportSubmitted(true);
    // Scroll to results
    setTimeout(() => {
      const resultsElement = document.getElementById('results-section');
      if (resultsElement) {
        resultsElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-purple-800 mb-2">
            🎮 {experiment.title} - Phiên Bản Tương Tác
          </h1>
          <p className="text-lg text-gray-600">{experiment.subtitle}</p>
          <p className="text-sm text-purple-600 mt-2">Kéo và thả để thực hiện thí nghiệm!</p>
        </div>

        {/* Instructions */}
        <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl p-6 mb-8 border-2 border-purple-300">
          <div className="flex items-start space-x-3">
            <Info className="h-6 w-6 text-purple-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-bold text-purple-800 mb-2">Hướng Dẫn Sử Dụng:</h3>
              <ol className="space-y-2 text-sm text-gray-700">
                <li><strong>Bước 1:</strong> Kéo pipet NaOH (màu trắng) và thả vào từng ống nghiệm</li>
                <li><strong>Bước 2:</strong> Kéo pipet CuSO₄ (màu xanh) và thả vào từng ống nghiệm</li>
                <li><strong>Bước 3:</strong> Quan sát sự thay đổi màu sắc</li>
                <li><strong>Bước 4:</strong> Hoàn thành báo cáo và trả lời 3 câu hỏi</li>
                <li><strong>Bước 5:</strong> Bấm "Gửi Báo Cáo" để mở khóa kết quả chi tiết</li>
              </ol>
            </div>
          </div>
        </div>

        {/* Lab Workspace */}
        <div className="bg-white rounded-xl border-2 border-purple-200 p-8 mb-6">
          <h2 className="text-2xl font-bold text-purple-800 mb-6 text-center">Bàn Thí Nghiệm</h2>

          {/* Test Tubes Area */}
          <div className="mb-12">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">Ống Nghiệm</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-items-center max-w-2xl mx-auto">
              {tubes.map((tube) => (
                <TestTube
                  key={tube.id}
                  id={tube.id}
                  label={tube.sample.name}
                  color={tube.color}
                  liquidLevel={tube.liquidLevel}
                  onDrop={(item) => handleDropOnTube(tube.id, item)}
                />
              ))}
            </div>
          </div>

          {/* Tools Area */}
          <div className="border-t-2 border-gray-200 pt-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-6 text-center">Dụng Cụ & Hóa Chất</h3>
            <div className="flex flex-col md:flex-row items-center justify-center gap-12">
              {/* NaOH Reagent Dropper */}
              <div className="relative">
                <Dropper
                  label="Dung dịch NaOH 10%"
                  color="#E8E8E8"
                  draggable={true}
                  dropperId="naoh-reagent"
                  disabled={allTubesHaveNaOH}
                />
                {!allTubesHaveNaOH && (
                  <motion.div
                    className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-xs px-3 py-1 rounded-full whitespace-nowrap"
                    animate={{ y: [0, -5, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    👆 Kéo tôi trước!
                  </motion.div>
                )}
              </div>

              {/* CuSO4 Reagent Dropper */}
              <div className="relative">
                <Dropper
                  label="Dung dịch CuSO₄ 1%"
                  color="#64B5F6"
                  draggable={true}
                  dropperId="cuso4-reagent"
                  disabled={!allTubesHaveNaOH || allTubesHaveCuSO4}
                />
                {allTubesHaveNaOH && !allTubesHaveCuSO4 && (
                  <motion.div
                    className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-blue-400 text-white text-xs px-3 py-1 rounded-full whitespace-nowrap"
                    animate={{ y: [0, -5, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    👆 Bây giờ kéo tôi!
                  </motion.div>
                )}
              </div>

              {/* Reset Button */}
              <button
                onClick={handleReset}
                className="flex items-center space-x-2 px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                <RotateCcw className="h-5 w-5" />
                <span>Làm lại</span>
              </button>
            </div>

            {/* Completion Status */}
            {allTubesHaveCuSO4 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-green-100 border-2 border-green-400 rounded-lg p-4 flex items-center justify-center space-x-2 mt-6"
              >
                <CheckCircle className="h-6 w-6 text-green-600" />
                <span className="text-green-800 font-semibold">
                  Hoàn thành! Quan sát kết quả và hoàn thành báo cáo bên dưới.
                </span>
              </motion.div>
            )}
          </div>
        </div>

        {/* Results Section with Password Protection */}
        <div id="results-section" className="mb-6">
          <ResultsSection isReportSubmitted={isReportSubmitted}>
            <div className="bg-white rounded-xl border-2 border-green-200 p-6">
              <h2 className="text-2xl font-bold text-green-800 mb-6 flex items-center space-x-2">
                <CheckCircle className="h-7 w-7" />
                <span>Kết Quả Thí Nghiệm</span>
              </h2>

              <div className="space-y-3">
                {samples.map((sample, index) => (
                  <div key={sample.id} className="flex items-center justify-between bg-white rounded-lg p-3 border-2 border-gray-200">
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
                        {sample.hasProtein ? '✓ Có protein (màu tím)' : '✗ Không có protein'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 bg-purple-50 rounded-lg p-4">
                <h3 className="font-bold text-purple-800 mb-2">Giải thích:</h3>
                <p className="text-gray-700 text-sm">
                  Lòng trắng trứng chứa protein. Trong môi trường kiềm (NaOH), các liên kết peptide trong protein
                  tương tác với ion Cu²⁺ từ CuSO₄ tạo thành phức chất có màu tím đặc trưng.
                  Nước cất không chứa protein nên không có phản ứng màu.
                </p>
              </div>
            </div>
          </ResultsSection>
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
        <ReportForm
          experimentTitle={experiment.title}
          experimentId={experiment.id}
          onReportSubmit={handleReportSubmit}
        />
      </main>

      <Footer />
    </div>
  );
}

