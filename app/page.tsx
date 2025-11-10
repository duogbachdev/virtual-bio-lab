import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ExperimentCard from '@/components/experiments/ExperimentCard';
import { experiments } from '@/data/experiments';
import { Microscope, Beaker, FlaskConical } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-50 via-blue-50 to-green-50">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-blue-500 rounded-full blur-xl opacity-30 animate-pulse" />
              <div className="relative flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-green-400 to-blue-500">
                <Microscope className="h-12 w-12 text-white" />
              </div>
            </div>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-green-800 mb-4">
            Phòng Thí Nghiệm Ảo
          </h1>

          <p className="text-xl text-gray-700 mb-2">
            Thực hành nhận biết các phân tử sinh học
          </p>

          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
            Khám phá thế giới sinh học và hóa học thông qua các thí nghiệm tương tác.
            Học tập an toàn, hiệu quả và thú vị!
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-white rounded-xl p-6 border-2 border-green-200 text-center">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-100 mx-auto mb-4">
              <Beaker className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="font-bold text-green-800 mb-2">An Toàn</h3>
            <p className="text-sm text-gray-600">
              Thực hành không cần hóa chất thật, hoàn toàn an toàn cho học sinh
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 border-2 border-blue-200 text-center">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 mx-auto mb-4">
              <FlaskConical className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="font-bold text-blue-800 mb-2">Tương Tác</h3>
            <p className="text-sm text-gray-600">
              Mô phỏng chân thực với hiệu ứng hình ảnh sinh động
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 border-2 border-purple-200 text-center">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-purple-100 mx-auto mb-4">
              <Microscope className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="font-bold text-purple-800 mb-2">Học Tập</h3>
            <p className="text-sm text-gray-600">
              Hiểu rõ cơ sở khoa học và ghi chép kết quả thí nghiệm
            </p>
          </div>
        </div>

        {/* Experiments Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-green-800 text-center mb-8">
            Các Thí Nghiệm
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {experiments.map((experiment) => (
              <ExperimentCard key={experiment.id} experiment={experiment} />
            ))}
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-white rounded-2xl border-2 border-green-200 p-8 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-green-800 mb-6 text-center">
            Hướng Dẫn Sử Dụng
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold">
                  1
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Chọn thí nghiệm</h3>
                  <p className="text-sm text-gray-600">Nhấn vào thẻ thí nghiệm bạn muốn thực hiện</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold">
                  2
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Đọc lý thuyết</h3>
                  <p className="text-sm text-gray-600">Tìm hiểu cơ sở khoa học và chuẩn bị</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold">
                  3
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Thực hành</h3>
                  <p className="text-sm text-gray-600">Tương tác với mô phỏng thí nghiệm</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold">
                  4
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Ghi chép kết quả</h3>
                  <p className="text-sm text-gray-600">Điền báo cáo và trả lời câu hỏi</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
