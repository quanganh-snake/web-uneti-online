export const kiemdinhSidebar = [
  {
    path: '/kiem-dinh-chat-luong',
    label: 'Kiểm định chất lượng',
    sidebarActive: true,
  },
  {
    path: '',
    label: 'Đảm bảo chất lượng',
    sidebarActive: true,
    children: [
      {
        path: '/dam-bao-chat-luong/chat-luong-ctdt',
        label: 'Kiểm định chất lượng CTĐT',
        sidebarActive: true,
      },
      {
        path: '/dam-bao-chat-luong/chat-luong-csgd',
        label: 'Kiểm định chất lượng CSGD',
        sidebarActive: true,
      },
      {
        path: '/dam-bao-chat-luong/cau-hinh-nhiem-vu',
        label: 'Cấu hình nhiệm vụ',
        sidebarActive: true,
      },
    ],
  },
  {
    path: '',
    label: 'Khảo sát và đánh giá chất lượng',
    sidebarActive: true,
    children: [
      {
        path: '/khao-sat-va-dgcl/danh-gia-cua-cac-ben-lien-quan',
        label: 'Phản hồi từ các bên liên quan',
        sidebarActive: true,
      },
    ],
  },
  {
    path: '/csdl-don-vi/tong-quan',
    label: 'CSDL Đơn vị',
    sidebarActive: true,
  },
  {
    path: '',
    label: 'Quản lý minh chứng',
    sidebarActive: true,
    children: [
      {
        path: '/quan-ly-minh-chung/minh-chung-dung-chung-don-vi',
        label: 'MC dùng chung đơn vị',
        sidebarActive: true,
      },
      {
        path: '/quan-ly-minh-chung/cau-hinh-ma-minh-chung',
        label: 'Cấu hình định dạng mã MC',
        sidebarActive: true,
      },
    ],
  },
  {
    path: '',
    label: 'Tiện ích',
    sidebarActive: false,
    children: [
      {
        path: '/tien-ich/danh-sach-thuat-ngu-chuyen-mon',
        label: 'Thuật ngữ chuyên môn',
        sidebarActive: true,
      },
      {
        path: '/tien-ich/quy-trinh-chuyen-mon',
        label: 'Quy trình chuyên môn',
        sidebarActive: true,
      },
      {
        path: '/tien-ich/quy-trinh-chuyen-mon',
        label: 'Tài liệu văn bản',
        sidebarActive: true,
      },
      {
        path: '/tien-ich/quy-trinh-chuyen-mon',
        label: 'Tin nhắn',
        sidebarActive: true,
      },
      {
        path: '/tien-ich/quy-trinh-chuyen-mon',
        label: 'Hỏi đáp',
        sidebarActive: true,
      },
    ],
  },
  {
    path: '',
    label: 'Quản trị hệ thống',
    sidebarActive: true,
    children: [
      {
        path: '/quan-tri-he-thong/nguoi-dung',
        label: 'Quản lý người dùng',
        sidebarActive: true,
      },
      {
        path: '/quan-tri-he-thong/quan-ly-nhom-quyen',
        label: 'Quản lý nhóm quyền',
        sidebarActive: true,
      },
      {
        path: '/quan-tri-he-thong/danh-muc',
        label: 'Quản lý danh mục',
        sidebarActive: true,
      },
      {
        path: '/quan-tri-he-thong/so-do-to-chuc',
        label: 'Sơ đồ tổ chức',
        sidebarActive: true,
      },
      {
        path: '/quan-tri-he-thong/tham-so-he-thong',
        label: 'Tham số hệ thống',
        sidebarActive: true,
      },
      {
        path: '/quan-tri-he-thong/bo-tieu-chuan-kiem-dinh',
        label: 'Cấu hình bộ TC kiểm định',
        sidebarActive: true,
      },
      {
        path: '/quan-tri-he-thong/mau-khao-sat',
        label: 'Mẫu khảo sát',
        sidebarActive: true,
      },
      {
        path: '/quan-tri-he-thong/nam-hoc',
        label: 'Năm học',
        sidebarActive: true,
      },
      {
        path: '/quan-tri-he-thong/thu-muc',
        label: 'Quản lý thư mục',
        sidebarActive: true,
      },
    ],
  },
]
