'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Unlock, Eye, EyeOff } from 'lucide-react';

interface ResultsSectionProps {
  isReportSubmitted: boolean;
  children: React.ReactNode;
  requirePassword?: boolean;
  password?: string;
}

export default function ResultsSection({
  isReportSubmitted,
  children,
  requirePassword = true,
  password = '123456',
}: ResultsSectionProps) {
  const [showResults, setShowResults] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordSubmit = () => {
    if (passwordInput === password) {
      setShowResults(true);
      setPasswordError(false);
    } else {
      setPasswordError(true);
      setTimeout(() => setPasswordError(false), 2000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handlePasswordSubmit();
    }
  };

  // Nếu báo cáo đã submit, hiển thị kết quả luôn
  if (isReportSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-green-50 border-2 border-green-300 rounded-xl p-4 mb-4">
          <div className="flex items-center space-x-2 text-green-700">
            <Unlock className="h-5 w-5" />
            <p className="font-semibold">✓ Báo cáo đã được gửi! Kết quả đã được mở khóa.</p>
          </div>
        </div>
        {children}
      </motion.div>
    );
  }

  // Nếu yêu cầu password và đã nhập đúng
  if (requirePassword && showResults) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-blue-50 border-2 border-blue-300 rounded-xl p-4 mb-4">
          <div className="flex items-center space-x-2 text-blue-700">
            <Unlock className="h-5 w-5" />
            <p className="font-semibold">✓ Mật khẩu chính xác! Kết quả đã được mở khóa.</p>
          </div>
        </div>
        {children}
      </motion.div>
    );
  }

  // Hiển thị form nhập password hoặc thông báo
  return (
    <div className="bg-yellow-50 border-2 border-yellow-300 rounded-xl p-6">
      <div className="flex items-start space-x-3 mb-4">
        <Lock className="h-6 w-6 text-yellow-600 flex-shrink-0 mt-1" />
        <div className="flex-1">
          <h3 className="text-lg font-bold text-yellow-800 mb-2">
            Kết Quả Đang Bị Khóa
          </h3>
          <p className="text-gray-700 mb-4">
            Để xem kết quả thí nghiệm, bạn cần:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
            <li>Hoàn thành báo cáo và trả lời đầy đủ 3 câu hỏi</li>
            <li>Bấm nút <strong>"Gửi Báo Cáo"</strong> ở phần báo cáo bên dưới</li>
            <li>Hoặc nhập mật khẩu để xem kết quả ngay</li>
          </ul>

          {requirePassword && (
            <div className="bg-white rounded-lg p-4 border-2 border-yellow-200">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Nhập mật khẩu để xem kết quả:
              </label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className={`w-full px-4 py-2 pr-10 border-2 rounded-lg focus:outline-none ${
                      passwordError
                        ? 'border-red-500 focus:border-red-600'
                        : 'border-gray-300 focus:border-blue-500'
                    }`}
                    placeholder="Nhập mật khẩu..."
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                <button
                  onClick={handlePasswordSubmit}
                  className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-semibold"
                >
                  Xác nhận
                </button>
              </div>
              <AnimatePresence>
                {passwordError && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-red-600 text-sm mt-2"
                  >
                    ✗ Mật khẩu không chính xác!
                  </motion.p>
                )}
              </AnimatePresence>
              <p className="text-xs text-gray-500 mt-2">
                Gợi ý: Mật khẩu mặc định là "123456"
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

