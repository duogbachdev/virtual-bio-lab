'use client';

import { useState } from 'react';
import { FileText, Download, Save, Send, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ReportFormProps {
  experimentTitle: string;
  experimentId: string;
  onReportSubmit?: () => void;
}

export default function ReportForm({ experimentTitle, experimentId, onReportSubmit }: ReportFormProps) {
  const [formData, setFormData] = useState({
    groupName: '',
    studentName: '',
    date: new Date().toLocaleDateString('vi-VN'),
    purpose: '',
    materials: '',
    procedure: '',
    observations: '',
    conclusion: '',
    answer1: '',
    answer2: '',
    answer3: '',
  });

  const [saved, setSaved] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [validationError, setValidationError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateAnswers = () => {
    if (!formData.answer1.trim()) {
      setValidationError('Vui lòng trả lời Câu 1');
      return false;
    }
    if (!formData.answer2.trim()) {
      setValidationError('Vui lòng trả lời Câu 2');
      return false;
    }
    if (!formData.answer3.trim()) {
      setValidationError('Vui lòng trả lời Câu 3');
      return false;
    }
    setValidationError('');
    return true;
  };

  const handleSave = () => {
    localStorage.setItem(`report-${experimentId}`, JSON.stringify(formData));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleSubmit = () => {
    if (!validateAnswers()) {
      setTimeout(() => setValidationError(''), 3000);
      return;
    }

    // Lưu báo cáo
    localStorage.setItem(`report-${experimentId}`, JSON.stringify(formData));
    localStorage.setItem(`report-${experimentId}-submitted`, 'true');

    setSubmitted(true);

    // Gọi callback để mở khóa kết quả
    if (onReportSubmit) {
      onReportSubmit();
    }
  };

  const handleDownload = () => {
    const reportText = `
BÁO CÁO KẾT QUẢ THÍ NGHIỆM
${experimentTitle}

Tên nhóm: ${formData.groupName}
Họ và tên: ${formData.studentName}
Ngày thực hiện: ${formData.date}

MỤC ĐÍCH THÍ NGHIỆM:
${formData.purpose}

CHUẨN BỊ THÍ NGHIỆM:
${formData.materials}

CÁC BƯỚC TIẾN HÀNH:
${formData.procedure}

KẾT QUẢ THÍ NGHIỆM VÀ GIẢI THÍCH:
${formData.observations}

KẾT LUẬN:
${formData.conclusion}

CÂU TRẢ LỜI:
1. ${formData.answer1}
2. ${formData.answer2}
3. ${formData.answer3}
    `.trim();

    const blob = new Blob([reportText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `bao-cao-${experimentId}-${Date.now()}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white rounded-xl border-2 border-green-200 p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-100">
          <FileText className="h-5 w-5 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-green-800">Báo Cáo Kết Quả Thí Nghiệm</h2>
      </div>

      <form className="space-y-6">
        {/* Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Tên nhóm:
            </label>
            <input
              type="text"
              name="groupName"
              value={formData.groupName}
              onChange={handleChange}
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none"
              placeholder="Nhập tên nhóm..."
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Họ và tên:
            </label>
            <input
              type="text"
              name="studentName"
              value={formData.studentName}
              onChange={handleChange}
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none"
              placeholder="Nhập họ và tên..."
            />
          </div>
        </div>

        {/* Purpose */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Mục đích thí nghiệm:
          </label>
          <textarea
            name="purpose"
            value={formData.purpose}
            onChange={handleChange}
            rows={3}
            className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none"
            placeholder="Mô tả mục đích của thí nghiệm..."
          />
        </div>

        {/* Materials */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Chuẩn bị thí nghiệm (Mẫu vật, dụng cụ, hóa chất):
          </label>
          <textarea
            name="materials"
            value={formData.materials}
            onChange={handleChange}
            rows={3}
            className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none"
            placeholder="Liệt kê các mẫu vật, dụng cụ và hóa chất đã sử dụng..."
          />
        </div>

        {/* Procedure */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Các bước tiến hành:
          </label>
          <textarea
            name="procedure"
            value={formData.procedure}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none"
            placeholder="Mô tả các bước thực hiện thí nghiệm..."
          />
        </div>

        {/* Observations */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Kết quả thí nghiệm và giải thích:
          </label>
          <textarea
            name="observations"
            value={formData.observations}
            onChange={handleChange}
            rows={5}
            className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none"
            placeholder="Ghi lại những gì quan sát được và giải thích kết quả..."
          />
        </div>

        {/* Conclusion */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Kết luận:
          </label>
          <textarea
            name="conclusion"
            value={formData.conclusion}
            onChange={handleChange}
            rows={3}
            className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none"
            placeholder="Rút ra kết luận từ thí nghiệm..."
          />
        </div>

        {/* Questions */}
        <div className="bg-purple-50 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-purple-800 mb-4">Trả lời câu hỏi:</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Câu 1:
              </label>
              <textarea
                name="answer1"
                value={formData.answer1}
                onChange={handleChange}
                rows={2}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none"
                placeholder="Nhập câu trả lời..."
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Câu 2:
              </label>
              <textarea
                name="answer2"
                value={formData.answer2}
                onChange={handleChange}
                rows={2}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none"
                placeholder="Nhập câu trả lời..."
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Câu 3:
              </label>
              <textarea
                name="answer3"
                value={formData.answer3}
                onChange={handleChange}
                rows={2}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none"
                placeholder="Nhập câu trả lời..."
              />
            </div>
          </div>
        </div>

        {/* Validation Error */}
        <AnimatePresence>
          {validationError && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="bg-red-50 border-2 border-red-300 rounded-lg p-4 flex items-center space-x-2"
            >
              <AlertCircle className="h-5 w-5 text-red-600" />
              <p className="text-red-700 font-semibold">{validationError}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            type="button"
            onClick={handleSave}
            disabled={submitted}
            className="flex items-center justify-center space-x-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save className="h-5 w-5" />
            <span>{saved ? 'Đã lưu!' : 'Lưu báo cáo'}</span>
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={submitted}
            className="flex items-center justify-center space-x-2 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
          >
            <Send className="h-5 w-5" />
            <span>{submitted ? '✓ Đã gửi!' : 'Gửi Báo Cáo'}</span>
          </button>

          <button
            type="button"
            onClick={handleDownload}
            className="flex items-center justify-center space-x-2 px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
          >
            <Download className="h-5 w-5" />
            <span>Tải xuống</span>
          </button>
        </div>

        {/* Status Messages */}
        <div className="space-y-2">
          {saved && !submitted && (
            <div className="text-center text-blue-600 font-semibold">
              ✓ Báo cáo đã được lưu vào trình duyệt!
            </div>
          )}

          {submitted && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-green-50 border-2 border-green-300 rounded-lg p-4 text-center"
            >
              <p className="text-green-700 font-bold text-lg">
                ✓ Báo cáo đã được gửi thành công!
              </p>
              <p className="text-green-600 text-sm mt-1">
                Kết quả thí nghiệm đã được mở khóa. Cuộn lên để xem kết quả.
              </p>
            </motion.div>
          )}
        </div>
      </form>
    </div>
  );
}

