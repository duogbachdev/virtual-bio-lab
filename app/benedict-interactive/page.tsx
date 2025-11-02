'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import TestTube from '@/components/lab-equipment/TestTube';
import Burner from '@/components/lab-equipment/Burner';
import Dropper from '@/components/lab-equipment/Dropper';
import { getBenedictSamples } from '@/data/experiments';
import { ArrowRight, RotateCcw, CheckCircle, Info } from 'lucide-react';

export default function BenedictInteractivePage() {
  const samples = getBenedictSamples();
  
  const [tubes, setTubes] = useState([
    { id: '1', sample: samples[0], liquidLevel: 50, color: samples[0].initialColor, reagentAdded: false, heated: false },
    { id: '2', sample: samples[1], liquidLevel: 50, color: samples[1].initialColor, reagentAdded: false, heated: false },
    { id: '3', sample: samples[2], liquidLevel: 50, color: samples[2].initialColor, reagentAdded: false, heated: false },
    { id: '4', sample: samples[3], liquidLevel: 50, color: samples[3].initialColor, reagentAdded: false, heated: false },
  ]);

  const [burnerOn, setBurnerOn] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleDropOnTube = (tubeId: string, droppedItem: string) => {
    if (droppedItem === 'benedict-reagent') {
      setTubes(tubes.map(tube => {
        if (tube.id === tubeId && !tube.reagentAdded) {
          return {
            ...tube,
            reagentAdded: true,
            liquidLevel: 65,
            color: '#64B5F6' // Benedict blue
          };
        }
        return tube;
      }));
    }
  };

  const handleBurnerToggle = () => {
    if (!burnerOn) {
      setBurnerOn(true);
      // Heat all tubes with reagent
      setTimeout(() => {
        setTubes(tubes.map(tube => {
          if (tube.reagentAdded) {
            return {
              ...tube,
              heated: true,
              color: tube.sample.finalColor
            };
          }
          return tube;
        }));
        setTimeout(() => {
          setBurnerOn(false);
          setShowResults(true);
        }, 3000);
      }, 1000);
    }
  };

  const handleReset = () => {
    setTubes([
      { id: '1', sample: samples[0], liquidLevel: 50, color: samples[0].initialColor, reagentAdded: false, heated: false },
      { id: '2', sample: samples[1], liquidLevel: 50, color: samples[1].initialColor, reagentAdded: false, heated: false },
      { id: '3', sample: samples[2], liquidLevel: 50, color: samples[2].initialColor, reagentAdded: false, heated: false },
      { id: '4', sample: samples[3], liquidLevel: 50, color: samples[3].initialColor, reagentAdded: false, heated: false },
    ]);
    setBurnerOn(false);
    setShowResults(false);
  };

  const allTubesHaveReagent = tubes.every(t => t.reagentAdded);
  const anyTubeHeated = tubes.some(t => t.heated);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-green-50 to-blue-50">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-800 mb-2">
            🧪 Thí Nghiệm Benedict - Phiên Bản Tương Tác
          </h1>
          <p className="text-lg text-gray-600">Kéo thả và trộn dung dịch như thật!</p>
        </div>

        {/* Instructions */}
        <div className="bg-gradient-to-r from-blue-100 to-green-100 rounded-xl p-6 mb-8 border-2 border-blue-300">
          <div className="flex items-start space-x-3">
            <Info className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-bold text-blue-800 mb-2">Hướng Dẫn Sử Dụng:</h3>
              <ol className="space-y-2 text-sm text-gray-700">
                <li><strong>Bước 1:</strong> Kéo pipet Benedict (màu xanh) và thả vào từng ống nghiệm</li>
                <li><strong>Bước 2:</strong> Sau khi thêm thuốc thử vào tất cả ống, nhấn nút "Lắc" để trộn đều</li>
                <li><strong>Bước 3:</strong> Bật đèn cồn để đun nóng các ống nghiệm</li>
                <li><strong>Bước 4:</strong> Quan sát sự thay đổi màu sắc và rút ra kết luận</li>
              </ol>
            </div>
          </div>
        </div>

        {/* Lab Workspace */}
        <div className="bg-white rounded-xl border-2 border-blue-200 p-8 mb-6">
          <h2 className="text-2xl font-bold text-blue-800 mb-6 text-center">Bàn Thí Nghiệm</h2>
          
          {/* Test Tubes Area */}
          <div className="mb-12">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">Ống Nghiệm</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 justify-items-center">
              {tubes.map((tube) => (
                <TestTube
                  key={tube.id}
                  id={tube.id}
                  label={tube.sample.name}
                  color={tube.color}
                  liquidLevel={tube.liquidLevel}
                  onDrop={(item) => handleDropOnTube(tube.id, item)}
                  canShake={tube.reagentAdded && !tube.heated}
                  heated={burnerOn && tube.reagentAdded}
                />
              ))}
            </div>
          </div>

          {/* Tools Area */}
          <div className="border-t-2 border-gray-200 pt-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-6 text-center">Dụng Cụ & Hóa Chất</h3>
            <div className="flex flex-col md:flex-row items-center justify-center gap-12">
              {/* Benedict Reagent Dropper */}
              <div className="relative">
                <Dropper
                  label="Thuốc thử Benedict"
                  color="#64B5F6"
                  draggable={true}
                  dropperId="benedict-reagent"
                  disabled={allTubesHaveReagent}
                />
                {!allTubesHaveReagent && (
                  <motion.div
                    className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-xs px-3 py-1 rounded-full whitespace-nowrap"
                    animate={{ y: [0, -5, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    👆 Kéo tôi!
                  </motion.div>
                )}
              </div>

              {/* Burner */}
              <div className="relative">
                <Burner
                  isOn={burnerOn}
                  onClick={handleBurnerToggle}
                />
                {allTubesHaveReagent && !anyTubeHeated && (
                  <motion.div
                    className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-orange-400 text-xs px-3 py-1 rounded-full whitespace-nowrap"
                    animate={{ y: [0, -5, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    👆 Đun nóng!
                  </motion.div>
                )}
              </div>
            </div>
          </div>

          {/* Progress Indicator */}
          <div className="mt-8 bg-blue-50 rounded-lg p-4">
            <div className="flex items-center justify-between text-sm">
              <div className={`flex items-center space-x-2 ${allTubesHaveReagent ? 'text-green-600' : 'text-gray-500'}`}>
                {allTubesHaveReagent ? '✓' : '○'} Đã thêm thuốc thử
              </div>
              <div className={`flex items-center space-x-2 ${anyTubeHeated ? 'text-green-600' : 'text-gray-500'}`}>
                {anyTubeHeated ? '✓' : '○'} Đã đun nóng
              </div>
              <div className={`flex items-center space-x-2 ${showResults ? 'text-green-600' : 'text-gray-500'}`}>
                {showResults ? '✓' : '○'} Hoàn thành
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        <AnimatePresence>
          {showResults && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-green-50 rounded-lg p-6 border-2 border-green-300 mb-6"
            >
              <div className="flex items-center space-x-2 mb-4">
                <CheckCircle className="h-6 w-6 text-green-600" />
                <h3 className="text-xl font-bold text-green-800">Kết Quả Thí Nghiệm</h3>
              </div>
              
              <div className="space-y-3">
                {tubes.map((tube) => (
                  <div key={tube.id} className="flex items-center justify-between bg-white rounded-lg p-3">
                    <div className="flex items-center space-x-3">
                      <span className="font-semibold text-gray-700">Ống {tube.id}:</span>
                      <span className="text-gray-600">{tube.sample.name}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div 
                        className="w-8 h-8 rounded-full border-2 border-gray-300"
                        style={{ backgroundColor: tube.color }}
                      />
                      <span className={`font-semibold ${
                        tube.sample.hasReducingSugar ? 'text-green-600' : 'text-gray-500'
                      }`}>
                        {tube.sample.hasReducingSugar ? '✓ Có đường khử' : '✗ Không có đường khử'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 bg-blue-50 rounded-lg p-4">
                <p className="text-sm font-semibold text-blue-800 mb-2">Giải thích:</p>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• <strong>Glucose và dịch quả</strong> chứa đường khử → màu đỏ gạch (Cu₂O)</li>
                  <li>• <strong>Sucrose</strong> không phải đường khử → giữ màu xanh (Cu²⁺)</li>
                  <li>• <strong>Nước cất</strong> là mẫu đối chứng → không có phản ứng</li>
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4">
          <button
            onClick={handleReset}
            className="flex items-center space-x-2 px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors shadow-lg"
          >
            <RotateCcw className="h-5 w-5" />
            <span>Làm lại</span>
          </button>
          
          {showResults && (
            <button
              onClick={() => window.location.href = '/benedict'}
              className="flex items-center space-x-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors shadow-lg"
            >
              <span>Xem phiên bản đơn giản</span>
              <ArrowRight className="h-5 w-5" />
            </button>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

