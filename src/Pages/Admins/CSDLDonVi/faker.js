export const THONG_KE_LIST = [
  {
    path: '/csdl-don-vi/gioi-thieu',
    label: 'giới thiệu',
  },
  {
    path: '/csdl-don-vi/thong-ke-nguoi-hoc',
    label: 'thống kê người học',
  },
  {
    path: '/csdl-don-vi/danh-sach-can-bo-chu-chot',
    label: 'danh sách cán bộ chủ chốt',
  },
  {
    path: '/csdl-don-vi/thong-ke-khoa-hoc',
    label: 'thống kê khoa học',
  },
  {
    path: '/csdl-don-vi/danh-sach-cac-don-vi',
    label: 'danh sách các đơn vị',
  },
  {
    path: '/csdl-don-vi/co-so-vat-chat',
    label: 'cơ sở vật chất',
  },
  {
    path: '/csdl-don-vi/thong-ke-nhan-luc',
    label: 'thống kê nhân lực',
  },
  {
    path: '/csdl-don-vi/doi-tac',
    label: 'đối tác',
  },
]

export const data = [
  {
    Id: '1',
    MaCTDT: 'root',
    TenTiengViet: 'Trường Đại học Kinh tế - Kỹ thuật Công nghiệp',
    TenTiengAnh: 'Trường Đại học Kinh tế - Kỹ thuật Công nghiệp',
    children: [
      {
        Id: '2',
        MaCTDT: 'TCKT',
        TenTiengViet: 'Khoa Tài Chính Kế Toán',
        TenTiengAnh: 'Khoa Tài Chính Kế Toán',
        children: [
          {
            Id: '3',
            MaCTDT: '',
            TenTiengViet: 'Chương trình đào tạo bậc đại học',
            TenTiengAnh: 'Chương trình đào tạo bậc đại học',
            children: [
              {
                Id: '4',
                MaCTDT: 'KT',
                TenTiengViet: 'Kế Toán',
                TenTiengAnh: 'Kế Toán',
                BacDaoTao: 'Cử nhân',
                TenTruocDay: '',
                LoaiHinhDT: 'CTĐT Chuẩn',
                ThoiDiemDaoTaoKhoa1: '2022',
                ThoiDiemCapBangKhoa1: '2022',
              },
              {
                Id: '5',
                MaCTDT: 'TCNH',
                TenTiengViet: 'Tài Chính Ngân Hàng',
                TenTiengAnh: 'Tài Chính Ngân Hàng',
                BacDaoTao: 'Cử nhân',
                TenTruocDay: '',
                LoaiHinhDT: 'CTĐT Chuẩn',
                ThoiDiemDaoTaoKhoa1: '2022',
                ThoiDiemCapBangKhoa1: '2022',
              },
            ],
          },
          {
            Id: '6',
            MaCTDT: 'dsa',
            TenTiengViet: 'Chương trình đào tạo bậc thạc sĩ',
            TenTiengAnh: 'Chương trình đào tạo bậc thạc sĩ',
          },
          {
            Id: '7',
            MaCTDT: 'dsa',
            TenTiengViet: 'Chương trình đào tạo bậc tiến sĩ',
            TenTiengAnh: 'Chương trình đào tạo bậc tiến sĩ',
          },
        ],
      },
      {
        Id: '8',
        MaCTDT: 'CK',
        TenTiengViet: 'Khoa Cơ khí',
        TenTiengAnh: 'Khoa Cơ khí',
        children: [
          {
            Id: '9',
            MaCTDT: '',
            TenTiengViet: 'Chương trình đào tạo bậc đại học',
            TenTiengAnh: 'Chương trình đào tạo bậc đại học',
            children: [
              {
                Id: '10',
                MaCTDT: 'CK',
                TenTiengViet: 'Cơ khí',
                TenTiengAnh: 'Cơ khí',
                BacDaoTao: 'Cử nhân',
                TenTruocDay: '',
                LoaiHinhDT: 'CTĐT Chuẩn',
                ThoiDiemDaoTaoKhoa1: '2022',
                ThoiDiemCapBangKhoa1: '2022',
              },
            ],
          },
          {
            Id: '12',
            MaCTDT: 'CK_THacSi',
            TenTiengViet: 'Chương trình đào tạo bậc thạc sĩ',
            TenTiengAnh: 'Chương trình đào tạo bậc thạc sĩ',
          },
          {
            Id: '13',
            MaCTDT: 'CK_TienSi',
            TenTiengViet: 'Chương trình đào tạo bậc tiến sĩ',
            TenTiengAnh: 'Chương trình đào tạo bậc tiến sĩ',
          },
        ],
      },
    ],
  },
]
