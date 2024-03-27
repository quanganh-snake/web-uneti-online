export const MC_TTHC_GV_DoiTuongXuLy_PheDuyet = [
  {
    id: '24',
    name: 'Trưởng/Phó đơn vị',
  },
  {
    id: '25',
    name: 'Ban giám hiệu',
  },
]

export const listYeuCauPheDuyet = [
  {
    id: 0,
    value: 0,
    label: 'Phê duyệt',
  },
  {
    id: 1,
    value: 1,
    label: 'Không phê duyệt',
  },
  {
    id: 2,
    value: 2,
    label: 'Trình duyệt',
  },
]

export const typeEditThuTuc = {
  typeHidden: 0,
  typeShow: 1,
}

export const listMucDoThuTuc = [
  {
    id: 1,
    mucDo: 1,
    moTaMucDo:
      'Có công khai: Quy trình, biểu mẫu và hướng dẫn. Thực hiện trực tiếp.',
  },
  {
    id: 2,
    mucDo: 2,
    moTaMucDo: 'Có biểu mẫu cho phép tải về và điền dữ liệu nộp trực tiếp.',
  },
  {
    id: 3,
    mucDo: 3,
    moTaMucDo: 'Cho phép đề nghị trực tuyến, trả kết quả trực tiếp.',
  },
  {
    id: 4,
    mucDo: 4,
    moTaMucDo: 'Cho phép đề nghị trực tuyến và trả kết quả trực tuyến.',
  },
]

// List trạng thái cho mức độ 2-3
export const listTrangThai_4Buoc_MD23 = [
  {
    MC_TTHC_GV_TrangThai_IDTTHC: '',
    MC_TTHC_GV_TrangThai_STT: '1',
    MC_TTHC_GV_TrangThai_TenTrangThai: 'Tiếp nhận hồ sơ',
    MC_TTHC_GV_TrangThai_DoiTuongXuLy: '',
    MC_TTHC_GV_TrangThai_IsHienThiThongTin: true,
    MC_TTHC_GV_TrangThai_MoTa: 'Tiếp nhận hồ sơ',
  },
  {
    MC_TTHC_GV_TrangThai_IDTTHC: '',
    MC_TTHC_GV_TrangThai_STT: '2',
    MC_TTHC_GV_TrangThai_TenTrangThai: 'Xử lý hồ sơ',
    MC_TTHC_GV_TrangThai_DoiTuongXuLy: '',
    MC_TTHC_GV_TrangThai_IsHienThiThongTin: true,
    MC_TTHC_GV_TrangThai_MoTa: 'Xử lý hồ sơ',
  },
  {
    MC_TTHC_GV_TrangThai_IDTTHC: '',
    MC_TTHC_GV_TrangThai_STT: '3',
    MC_TTHC_GV_TrangThai_TenTrangThai: 'Trả kết quả',
    MC_TTHC_GV_TrangThai_DoiTuongXuLy: '',
    MC_TTHC_GV_TrangThai_IsHienThiThongTin: true,
    MC_TTHC_GV_TrangThai_MoTa: 'Trả kết quả',
  },
  {
    MC_TTHC_GV_TrangThai_IDTTHC: '',
    MC_TTHC_GV_TrangThai_STT: '4',
    MC_TTHC_GV_TrangThai_TenTrangThai: 'Xác nhận hoàn thành',
    MC_TTHC_GV_TrangThai_DoiTuongXuLy: '',
    MC_TTHC_GV_TrangThai_IsHienThiThongTin: true,
    MC_TTHC_GV_TrangThai_MoTa: 'Xác nhận hoàn thành',
  },
]

export const listTrangThai_5Buoc_MD23 = [
  {
    MC_TTHC_GV_TrangThai_IDTTHC: '',
    MC_TTHC_GV_TrangThai_STT: '1',
    MC_TTHC_GV_TrangThai_TenTrangThai: 'Tiếp nhận hồ sơ',
    MC_TTHC_GV_TrangThai_DoiTuongXuLy: '',
    MC_TTHC_GV_TrangThai_IsHienThiThongTin: true,
    MC_TTHC_GV_TrangThai_MoTa: 'Tiếp nhận hồ sơ',
  },
  {
    MC_TTHC_GV_TrangThai_IDTTHC: '',
    MC_TTHC_GV_TrangThai_STT: '2',
    MC_TTHC_GV_TrangThai_TenTrangThai: 'Xử lý hồ sơ',
    MC_TTHC_GV_TrangThai_DoiTuongXuLy: '',
    MC_TTHC_GV_TrangThai_IsHienThiThongTin: true,
    MC_TTHC_GV_TrangThai_MoTa: 'Xử lý hồ sơ',
  },
  {
    MC_TTHC_GV_TrangThai_IDTTHC: '',
    MC_TTHC_GV_TrangThai_STT: '3',
    MC_TTHC_GV_TrangThai_TenTrangThai: MC_TTHC_GV_DoiTuongXuLy_PheDuyet[0].name,
    MC_TTHC_GV_TrangThai_DoiTuongXuLy: MC_TTHC_GV_DoiTuongXuLy_PheDuyet[0].id,
    MC_TTHC_GV_TrangThai_IsHienThiThongTin: true,
    MC_TTHC_GV_TrangThai_MoTa: MC_TTHC_GV_DoiTuongXuLy_PheDuyet[0].name,
  },
  {
    MC_TTHC_GV_TrangThai_IDTTHC: '',
    MC_TTHC_GV_TrangThai_STT: '4',
    MC_TTHC_GV_TrangThai_TenTrangThai: 'Trả kết quả',
    MC_TTHC_GV_TrangThai_DoiTuongXuLy: '',
    MC_TTHC_GV_TrangThai_IsHienThiThongTin: true,
    MC_TTHC_GV_TrangThai_MoTa: 'Trả kết quả',
  },
  {
    MC_TTHC_GV_TrangThai_IDTTHC: '',
    MC_TTHC_GV_TrangThai_STT: '5',
    MC_TTHC_GV_TrangThai_TenTrangThai: 'Xác nhận hoàn thành',
    MC_TTHC_GV_TrangThai_DoiTuongXuLy: '',
    MC_TTHC_GV_TrangThai_IsHienThiThongTin: true,
    MC_TTHC_GV_TrangThai_MoTa: 'Xác nhận hoàn thành',
  },
]

export const listTrangThai_6Buoc_MD23 = [
  {
    MC_TTHC_GV_TrangThai_IDTTHC: '',
    MC_TTHC_GV_TrangThai_STT: '1',
    MC_TTHC_GV_TrangThai_TenTrangThai: 'Tiếp nhận hồ sơ',
    MC_TTHC_GV_TrangThai_DoiTuongXuLy: '',
    MC_TTHC_GV_TrangThai_IsHienThiThongTin: true,
    MC_TTHC_GV_TrangThai_MoTa: 'Tiếp nhận hồ sơ',
  },
  {
    MC_TTHC_GV_TrangThai_IDTTHC: '',
    MC_TTHC_GV_TrangThai_STT: '2',
    MC_TTHC_GV_TrangThai_TenTrangThai: 'Xử lý hồ sơ',
    MC_TTHC_GV_TrangThai_DoiTuongXuLy: '',
    MC_TTHC_GV_TrangThai_IsHienThiThongTin: true,
    MC_TTHC_GV_TrangThai_MoTa: 'Xử lý hồ sơ',
  },
  {
    MC_TTHC_GV_TrangThai_IDTTHC: '',
    MC_TTHC_GV_TrangThai_STT: '3',
    MC_TTHC_GV_TrangThai_TenTrangThai: MC_TTHC_GV_DoiTuongXuLy_PheDuyet[0].name,
    MC_TTHC_GV_TrangThai_DoiTuongXuLy: MC_TTHC_GV_DoiTuongXuLy_PheDuyet[0].id,
    MC_TTHC_GV_TrangThai_IsHienThiThongTin: true,
    MC_TTHC_GV_TrangThai_MoTa: MC_TTHC_GV_DoiTuongXuLy_PheDuyet[0].name,
  },
  {
    MC_TTHC_GV_TrangThai_IDTTHC: '',
    MC_TTHC_GV_TrangThai_STT: '4',
    MC_TTHC_GV_TrangThai_TenTrangThai: MC_TTHC_GV_DoiTuongXuLy_PheDuyet[1].name,
    MC_TTHC_GV_TrangThai_DoiTuongXuLy: MC_TTHC_GV_DoiTuongXuLy_PheDuyet[1].id,
    MC_TTHC_GV_TrangThai_IsHienThiThongTin: true,
    MC_TTHC_GV_TrangThai_MoTa: MC_TTHC_GV_DoiTuongXuLy_PheDuyet[1].name,
  },
  {
    MC_TTHC_GV_TrangThai_IDTTHC: '',
    MC_TTHC_GV_TrangThai_STT: '5',
    MC_TTHC_GV_TrangThai_TenTrangThai: 'Trả kết quả',
    MC_TTHC_GV_TrangThai_DoiTuongXuLy: '',
    MC_TTHC_GV_TrangThai_IsHienThiThongTin: true,
    MC_TTHC_GV_TrangThai_MoTa: 'Trả kết quả',
  },
  {
    MC_TTHC_GV_TrangThai_IDTTHC: '',
    MC_TTHC_GV_TrangThai_STT: '6',
    MC_TTHC_GV_TrangThai_TenTrangThai: 'Xác nhận hoàn thành',
    MC_TTHC_GV_TrangThai_DoiTuongXuLy: '',
    MC_TTHC_GV_TrangThai_IsHienThiThongTin: true,
    MC_TTHC_GV_TrangThai_MoTa: 'Xác nhận hoàn thành',
  },
]

// List trạng thái cho mức độ 4
export const listTrangThai_3Buoc_MD4 = [
  {
    MC_TTHC_GV_TrangThai_IDTTHC: '',
    MC_TTHC_GV_TrangThai_STT: '1',
    MC_TTHC_GV_TrangThai_TenTrangThai: 'Tiếp nhận hồ sơ',
    MC_TTHC_GV_TrangThai_DoiTuongXuLy: '',
    MC_TTHC_GV_TrangThai_IsHienThiThongTin: true,
    MC_TTHC_GV_TrangThai_MoTa: 'Tiếp nhận hồ sơ',
  },
  {
    MC_TTHC_GV_TrangThai_IDTTHC: '',
    MC_TTHC_GV_TrangThai_STT: '2',
    MC_TTHC_GV_TrangThai_TenTrangThai: 'Xử lý hồ sơ',
    MC_TTHC_GV_TrangThai_DoiTuongXuLy: '',
    MC_TTHC_GV_TrangThai_IsHienThiThongTin: true,
    MC_TTHC_GV_TrangThai_MoTa: 'Xử lý hồ sơ',
  },
  {
    MC_TTHC_GV_TrangThai_IDTTHC: '',
    MC_TTHC_GV_TrangThai_STT: '3',
    MC_TTHC_GV_TrangThai_TenTrangThai: 'Trả kết quả, hoàn thành',
    MC_TTHC_GV_TrangThai_DoiTuongXuLy: '',
    MC_TTHC_GV_TrangThai_IsHienThiThongTin: true,
    MC_TTHC_GV_TrangThai_MoTa: 'Trả kết quả, hoàn thành',
  },
]

export const listTrangThai_4Buoc_MD4 = [
  {
    MC_TTHC_GV_TrangThai_IDTTHC: '',
    MC_TTHC_GV_TrangThai_STT: '1',
    MC_TTHC_GV_TrangThai_TenTrangThai: 'Tiếp nhận hồ sơ',
    MC_TTHC_GV_TrangThai_DoiTuongXuLy: '',
    MC_TTHC_GV_TrangThai_IsHienThiThongTin: true,
    MC_TTHC_GV_TrangThai_MoTa: 'Tiếp nhận hồ sơ',
  },
  {
    MC_TTHC_GV_TrangThai_IDTTHC: '',
    MC_TTHC_GV_TrangThai_STT: '2',
    MC_TTHC_GV_TrangThai_TenTrangThai: 'Xử lý hồ sơ',
    MC_TTHC_GV_TrangThai_DoiTuongXuLy: '',
    MC_TTHC_GV_TrangThai_IsHienThiThongTin: true,
    MC_TTHC_GV_TrangThai_MoTa: 'Xử lý hồ sơ',
  },
  {
    MC_TTHC_GV_TrangThai_IDTTHC: '',
    MC_TTHC_GV_TrangThai_STT: '3',
    MC_TTHC_GV_TrangThai_TenTrangThai: MC_TTHC_GV_DoiTuongXuLy_PheDuyet[0].name,
    MC_TTHC_GV_TrangThai_DoiTuongXuLy: MC_TTHC_GV_DoiTuongXuLy_PheDuyet[0].id,
    MC_TTHC_GV_TrangThai_IsHienThiThongTin: true,
    MC_TTHC_GV_TrangThai_MoTa: MC_TTHC_GV_DoiTuongXuLy_PheDuyet[0].name,
  },
  {
    MC_TTHC_GV_TrangThai_IDTTHC: '',
    MC_TTHC_GV_TrangThai_STT: '4',
    MC_TTHC_GV_TrangThai_TenTrangThai: 'Trả kết quả, hoàn thành',
    MC_TTHC_GV_TrangThai_DoiTuongXuLy: '',
    MC_TTHC_GV_TrangThai_IsHienThiThongTin: true,
    MC_TTHC_GV_TrangThai_MoTa: 'Trả kết quả, hoàn thành',
  },
]

export const listTrangThai_5Buoc_MD4 = [
  {
    MC_TTHC_GV_TrangThai_IDTTHC: '',
    MC_TTHC_GV_TrangThai_STT: '1',
    MC_TTHC_GV_TrangThai_TenTrangThai: 'Tiếp nhận hồ sơ',
    MC_TTHC_GV_TrangThai_DoiTuongXuLy: '',
    MC_TTHC_GV_TrangThai_IsHienThiThongTin: true,
    MC_TTHC_GV_TrangThai_MoTa: 'Tiếp nhận hồ sơ',
  },
  {
    MC_TTHC_GV_TrangThai_IDTTHC: '',
    MC_TTHC_GV_TrangThai_STT: '2',
    MC_TTHC_GV_TrangThai_TenTrangThai: 'Xử lý hồ sơ',
    MC_TTHC_GV_TrangThai_DoiTuongXuLy: '',
    MC_TTHC_GV_TrangThai_IsHienThiThongTin: true,
    MC_TTHC_GV_TrangThai_MoTa: 'Xử lý hồ sơ',
  },
  {
    MC_TTHC_GV_TrangThai_IDTTHC: '',
    MC_TTHC_GV_TrangThai_STT: '3',
    MC_TTHC_GV_TrangThai_TenTrangThai: MC_TTHC_GV_DoiTuongXuLy_PheDuyet[0].name,
    MC_TTHC_GV_TrangThai_DoiTuongXuLy: MC_TTHC_GV_DoiTuongXuLy_PheDuyet[0].id,
    MC_TTHC_GV_TrangThai_IsHienThiThongTin: true,
    MC_TTHC_GV_TrangThai_MoTa: MC_TTHC_GV_DoiTuongXuLy_PheDuyet[0].name,
  },
  {
    MC_TTHC_GV_TrangThai_IDTTHC: '',
    MC_TTHC_GV_TrangThai_STT: '4',
    MC_TTHC_GV_TrangThai_TenTrangThai: MC_TTHC_GV_DoiTuongXuLy_PheDuyet[1].name,
    MC_TTHC_GV_TrangThai_DoiTuongXuLy: MC_TTHC_GV_DoiTuongXuLy_PheDuyet[1].id,
    MC_TTHC_GV_TrangThai_IsHienThiThongTin: true,
    MC_TTHC_GV_TrangThai_MoTa: MC_TTHC_GV_DoiTuongXuLy_PheDuyet[1].name,
  },
  {
    MC_TTHC_GV_TrangThai_IDTTHC: '',
    MC_TTHC_GV_TrangThai_STT: '5',
    MC_TTHC_GV_TrangThai_TenTrangThai: 'Trả kết quả, hoàn thành',
    MC_TTHC_GV_TrangThai_DoiTuongXuLy: '',
    MC_TTHC_GV_TrangThai_IsHienThiThongTin: true,
    MC_TTHC_GV_TrangThai_MoTa: 'Trả kết quả, hoàn thành',
  },
]
