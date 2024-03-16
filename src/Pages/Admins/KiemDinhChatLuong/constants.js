export const home = {
  path: '/uneti',
  title: 'Trang chủ',
}

export const breadcrumbs = [
  {
    path: '/kiem-dinh-chat-luong',
    title: 'Kiểm định chất lượng',
  },
]

export const kiemdinhSidebar = [
  {
    path: '/kiem-dinh-chat-luong',
    label: 'Kiểm định chất lượng',
  },
  {
    path: '',
    label: 'Đảm bảo chất lượng',
    children: [
      {
        path: '/dam-bao-chat-luong/chat-luong-ctdt',
        label: 'Kiểm định chất lượng CTĐT',
      },
      {
        path: '/dam-bao-chat-luong/chat-luong-csgd',
        label: 'Kiểm định chất lượng CSGD',
      },
      {
        path: '/dam-bao-chat-luong/cau-hinh-nhiem-vu',
        label: 'Cấu hình nhiệm vụ',
      },
    ],
  },
  {
    path: '',
    label: 'Đảm bảo chất lượng',
    children: [
      {
        path: '/khao-sat-va-dgcl/danh-gia-cua-cac-ben-lien-quan',
        label: 'Phản hồi từ các bên liên quan',
      },
    ],
  },
  {
    path: '/csdl-don-vi/tong-quan',
    label: 'CSDL Đơn vị',
  },
  {
    path: '',
    label: 'Quản lý minh chứng',
    children: [
      {
        path: '/quan-ly-minh-chung/minh-chung-dung-chung-don-vi',
        label: 'MC dùng chung đơn vị',
      },
      {
        path: '/quan-ly-minh-chung/cau-hinh-ma-minh-chung',
        label: 'Cấu hình định dạng mã MC',
      },
    ],
  },
  {
    path: '',
    label: 'Tiện ích',
    children: [
      {
        path: '/tien-ich/danh-sach-thuat-ngu-chuyen-mon',
        label: 'Thuật ngữ chuyên môn',
      },
      {
        path: '/tien-ich/quy-trinh-chuyen-mon',
        label: 'Quy trình chuyên môn',
      },
      {
        path: '/tien-ich/quy-trinh-chuyen-mon',
        label: 'Tài liệu văn bản',
      },
      {
        path: '/tien-ich/quy-trinh-chuyen-mon',
        label: 'Tin nhắn',
      },
      {
        path: '/tien-ich/quy-trinh-chuyen-mon',
        label: 'Hỏi đáp',
      },
    ],
  },
  {
    path: '',
    label: 'Quản trị hệ thống',
    children: [
      {
        path: '/quan-tri-he-thong/nguoi-dung',
        label: 'Quản lý người dùng',
      },
      {
        path: '/quan-tri-he-thong/quan-ly-nhom-quyen',
        label: 'Quản lý nhóm quyền',
      },
      {
        path: '/quan-tri-he-thong/danh-muc',
        label: 'Quản lý danh mục',
      },
      {
        path: '/quan-tri-he-thong/so-do-to-chuc',
        label: 'Sơ đồ tổ chức',
      },
      {
        path: '/quan-tri-he-thong/tham-so-he-thong',
        label: 'Tham số hệ thống',
      },
      {
        path: '/quan-tri-he-thong/bo-tieu-chuan-kiem-dinh',
        label: 'Cấu hình bộ TC kiểm định',
      },
      {
        path: '/quan-tri-he-thong/mau-khao-sat',
        label: 'Mẫu khảo sát',
      },
      {
        path: '/quan-tri-he-thong/nam-hoc',
        label: 'Năm học',
      },
      {
        path: '/quan-tri-he-thong/thu-muc',
        label: 'Quản lý thư mục',
      },
    ],
  },
]
