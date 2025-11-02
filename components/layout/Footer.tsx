export default function Footer() {
  return (
    <footer className="w-full border-t border-green-200 bg-white mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold text-green-800 mb-3">Về Phòng Thí Nghiệm Ảo</h3>
            <p className="text-sm text-gray-600">
              Nền tảng thí nghiệm ảo giúp học sinh và giáo viên thực hành các thí nghiệm 
              sinh học và hóa học một cách an toàn và hiệu quả.
            </p>
          </div>
          
          <div>
            <h3 className="font-bold text-green-800 mb-3">Các Thí Nghiệm</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Nhận biết đường khử (Benedict)</li>
              <li>• Nhận biết tinh bột (Lugol)</li>
              <li>• Nhận biết protein (Biuret)</li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-green-800 mb-3">Hướng Dẫn</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Đọc kỹ cơ sở khoa học</li>
              <li>• Chuẩn bị đầy đủ dụng cụ</li>
              <li>• Thực hiện theo từng bước</li>
              <li>• Ghi chép kết quả quan sát</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-green-100 text-center text-sm text-gray-500">
          <p>© 2025 Phòng Thí Nghiệm Ảo - Sinh Học. Phát triển cho mục đích giáo dục.</p>
        </div>
      </div>
    </footer>
  );
}

