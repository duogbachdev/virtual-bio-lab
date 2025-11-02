import { Experiment } from '@/types/experiments';

export const experiments: Experiment[] = [
  {
    id: 'benedict',
    title: 'Nhận biết đường khử',
    subtitle: 'Phản ứng Benedict',
    description: 'Thí nghiệm nhận biết đường khử thông qua phản ứng với thuốc thử Benedict, quan sát sự thay đổi màu từ xanh dương sang đỏ gạch.',
    icon: '🧪',
    color: 'from-blue-400 to-red-400',
    path: '/benedict',
    theory: {
      title: 'Cơ sở khoa học',
      content: 'Trong môi trường kiềm ở nhiệt độ cao, đường khử sẽ khử ion kim loại. Cụ thể, đường khử sẽ khử Cu²⁺ (màu xanh dương) tạo thành Cu₂O (kết tủa màu đỏ gạch).',
      formula: 'Cu²⁺ (xanh dương) + Đường khử → Cu₂O (đỏ gạch)',
    },
    preparation: {
      samples: [
        'Dịch chiết quả tươi (cam, chuối chín, ...)',
        'Dung dịch glucose 5%',
        'Dung dịch sucrose 5%',
        'Nước cất',
      ],
      chemicals: [
        'Thuốc thử Benedict (chứa Cu²⁺ trong môi trường kiềm)',
      ],
      equipment: [
        'Ống nghiệm (4 ống)',
        'Đèn cồn',
        'Kẹp gỗ',
        'Pipet nhựa (1-3 mL)',
      ],
      safetyNotes: [
        'Hướng miệng ống nghiệm nghiêng khoảng 45° ra phía không có người khi đun',
        'Sử dụng kẹp gỗ để cầm ống nghiệm',
        'Cẩn thận với ngọn lửa đèn cồn',
      ],
    },
    procedure: [
      'Lấy bốn ống nghiệm và đánh số các ống nghiệm',
      'Cho 1 mL nước cất vào ống 1; 1 mL dịch chiết quả tươi vào ống 2; 1 mL dung dịch glucose 5% vào ống 3; 1 mL dung dịch sucrose 5% vào ống 4',
      'Thêm 1 mL thuốc thử Benedict vào từng ống nghiệm và lắc đều',
      'Kẹp đầu ống nghiệm bằng kẹp gỗ, đun sôi dung dịch trong mỗi ống nghiệm trên ngọn lửa đèn cồn trong khoảng 2-3 phút',
      'Quan sát sự thay đổi màu dung dịch trong các ống nghiệm',
    ],
    questions: [
      'Ống nghiệm nào chứa đường khử? Giải thích.',
      'Ống nghiệm chỉ chứa nước cất và thuốc thử Benedict có ý nghĩa gì trong thí nghiệm này?',
      'Tại sao cần đun nóng dung dịch trong thí nghiệm này?',
    ],
  },
  {
    id: 'lugol',
    title: 'Nhận biết tinh bột',
    subtitle: 'Phản ứng với Iodine',
    description: 'Thí nghiệm nhận biết tinh bột thông qua phản ứng với thuốc thử Lugol (iodine), quan sát sự thay đổi màu sang xanh đen.',
    icon: '🍌',
    color: 'from-yellow-400 to-indigo-900',
    path: '/lugol',
    theory: {
      title: 'Cơ sở khoa học',
      content: 'Khi trộn dung dịch chứa iodine với tinh bột, iodine sẽ đi vào bên trong chuỗi xoắn amylose của tinh bột tạo thành phức hợp có màu xanh đen.',
      formula: 'Iodine (I₂) + Tinh bột (Amylose) → Phức hợp màu xanh đen',
    },
    preparation: {
      samples: [
        'Lát cắt chuối xanh',
        'Lát cắt chuối chín',
      ],
      chemicals: [
        'Thuốc thử Lugol (chứa I₂ và KI)',
      ],
      equipment: [
        'Đĩa petri (2 cái)',
        'Pipet nhựa',
      ],
    },
    procedure: [
      'Đặt hai lát cắt chuối xanh và chuối chín lên đĩa petri',
      'Thêm hai giọt thuốc thử Lugol vào mỗi lát cắt chuối',
      'Quan sát sự thay đổi màu ở vị trí nhỏ thuốc thử Lugol trên các lát cắt chuối',
    ],
    questions: [
      'Tinh bột có ở chuối chín hay chuối xanh? Giải thích.',
      'Tại sao chuối chín có vị ngọt hơn chuối xanh?',
      'Thuốc thử Lugol có thể dùng để nhận biết những chất nào khác?',
    ],
  },
  {
    id: 'biuret',
    title: 'Nhận biết protein',
    subtitle: 'Phản ứng Biuret',
    description: 'Thí nghiệm nhận biết protein thông qua phản ứng Biuret, quan sát sự thay đổi màu sang tím đặc trưng.',
    icon: '🥚',
    color: 'from-blue-400 to-purple-600',
    path: '/biuret',
    theory: {
      title: 'Cơ sở khoa học',
      content: 'Trong môi trường kiềm, các liên kết peptide trong phân tử protein tương tác với ion Cu²⁺ tạo thành phức chất có màu tím.',
      formula: 'Liên kết peptide + Cu²⁺ (môi trường kiềm) → Phức chất màu tím',
    },
    preparation: {
      samples: [
        'Dung dịch lòng trắng trứng pha loãng',
        'Nước cất',
      ],
      chemicals: [
        'Dung dịch NaOH 10%',
        'Dung dịch CuSO₄ 1%',
      ],
      equipment: [
        'Ống nghiệm (2 ống)',
        'Pipet nhựa (1-3 mL)',
      ],
    },
    procedure: [
      'Lấy hai ống nghiệm và đánh số các ống nghiệm',
      'Cho 1 mL nước cất vào ống nghiệm 1; 1 mL dung dịch lòng trắng trứng vào ống nghiệm 2',
      'Thêm 1 mL NaOH 10% và 2-3 giọt CuSO₄ 1% vào mỗi ống và lắc đều',
      'Quan sát sự thay đổi màu dung dịch trong các ống nghiệm',
    ],
    questions: [
      'Xác định sự có mặt của protein trong các ống nghiệm.',
      'Nếu tăng nồng độ dung dịch lòng trắng trứng thì màu dung dịch sẽ thay đổi như thế nào? Giải thích.',
      'Phản ứng Biuret có thể dùng để nhận biết những chất nào khác ngoài protein?',
    ],
  },
];

export const getBenedictSamples = () => [
  {
    id: 'water',
    name: 'Nước cất',
    type: 'water' as const,
    initialColor: '#B3E5FC', // Xanh nhạt rõ hơn
    finalColor: '#64B5F6', // Xanh Benedict
    hasReducingSugar: false,
  },
  {
    id: 'fruit',
    name: 'Dịch chiết quả',
    type: 'fruit' as const,
    initialColor: '#FFF59D', // Vàng nhạt
    finalColor: '#EF5350', // Đỏ cam
    hasReducingSugar: true,
  },
  {
    id: 'glucose',
    name: 'Glucose 5%',
    type: 'glucose' as const,
    initialColor: '#B3E5FC', // Xanh nhạt
    finalColor: '#C62828', // Đỏ gạch đậm
    hasReducingSugar: true,
  },
  {
    id: 'sucrose',
    name: 'Sucrose 5%',
    type: 'sucrose' as const,
    initialColor: '#B3E5FC', // Xanh nhạt
    finalColor: '#64B5F6', // Xanh Benedict (không đổi)
    hasReducingSugar: false,
  },
];

export const getLugolSamples = () => [
  {
    id: 'green-banana',
    name: 'Chuối xanh',
    type: 'green-banana' as const,
    initialColor: '#A5D6A7', // Xanh lá nhạt
    finalColor: '#1A237E', // Xanh đen (có tinh bột)
    hasStarch: true,
  },
  {
    id: 'ripe-banana',
    name: 'Chuối chín',
    type: 'ripe-banana' as const,
    initialColor: '#FFF59D', // Vàng chuối
    finalColor: '#FFEB3B', // Vàng (không có tinh bột)
    hasStarch: false,
  },
];

export const getBiuretSamples = () => [
  {
    id: 'water',
    name: 'Nước cất',
    type: 'water' as const,
    initialColor: '#B3E5FC', // Xanh nhạt
    finalColor: '#4FC3F7', // Xanh nhạt (không có protein)
    hasProtein: false,
  },
  {
    id: 'egg-white',
    name: 'Lòng trắng trứng',
    type: 'egg-white' as const,
    initialColor: '#E0E0E0', // Xám trắng
    finalColor: '#AB47BC', // Tím đậm (có protein)
    hasProtein: true,
  },
];

