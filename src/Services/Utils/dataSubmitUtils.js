import { isArray, isNil, merge } from 'lodash-unified'
import { convertDataFileToBase64 } from './stringUtils'

export const dataSubmitUtils = () => {}

export const makeDataSv = (dataSV, prefix = '') => {
  const result = {
    [`${prefix}TenCoSo`]: dataSV.CoSo ? dataSV.CoSo : 'null',
    [`${prefix}MaSinhVien`]: dataSV.MaSinhVien ? dataSV.MaSinhVien : 'null',
    [`${prefix}HoDem`]: dataSV.HoDem ? dataSV.HoDem : 'null',
    [`${prefix}Ten`]: dataSV.Ten ? dataSV.Ten : 'null',
    [`${prefix}GioiTinh`]: `${dataSV.GioiTinh}` ?? 'null',
    [`${prefix}TenHeDaoTao`]: dataSV.BacDaoTao ? dataSV.BacDaoTao : 'null',
    [`${prefix}TenLoaiHinhDT`]: dataSV.LoaiHinhDaoTao
      ? dataSV.LoaiHinhDaoTao
      : 'null',
    [`${prefix}TenKhoaHoc`]: dataSV.KhoaHoc ? dataSV.KhoaHoc : 'null',
    [`${prefix}KhoaChuQuanLop`]: dataSV.Khoa ? dataSV.Khoa : 'null',
    [`${prefix}TenNganh`]: dataSV.ChuyenNganh ? dataSV.ChuyenNganh : 'null',
    [`${prefix}TenNghe`]: dataSV.ChuyenNganh ? dataSV.ChuyenNganh : 'null',
    [`${prefix}TenLop`]: dataSV.LopHoc ? dataSV.LopHoc : 'null',
    [`${prefix}DienThoai`]: dataSV.SoDienThoai
      ? dataSV.SoDienThoai
      : dataSV.SoDienThoai2
        ? dataSV.SoDienThoai2
        : dataSV.SoDienThoai3
          ? dataSV.SoDienThoai3
          : '',
    [`${prefix}Email`]: dataSV.Email_TruongCap
      ? dataSV.Email_TruongCap
      : 'null',
    [`${prefix}IDSinhVien`]: dataSV.IdSinhVien
      ? `${dataSV.IdSinhVien}`
      : 'null',
    [`${prefix}NgaySinh2`]: dataSV.NgaySinh
      ? new Date(
          `${dataSV.NgaySinh.split('/')[2]}-${dataSV.NgaySinh.split('/')[1]}-${
            dataSV.NgaySinh.split('/')[0]
          }`,
        ).toISOString()
      : 'null',
  }

  return result
}

export const transformObjKey = (obj, prefixKey = '') => {
  const keys = Object.keys(obj)

  return keys.reduce((result, curr) => {
    result[`${prefixKey}${curr}`] = obj[curr]

    return result
  }, {})
}

export const makePostDataSv = (dataSv = {}, obj = {}, prefixKey = '') => {
  return merge(dataSv, transformObjKey(obj, prefixKey))
}

export const transformSubmitValue = (value, fallback = 'null') => {
  value = isArray(value) ? value : [value]

  const firstValidValue = value
    .map((e) => `${e}`)
    .filter((e) => e !== '' || !isNil(e))
    .shift()
  return firstValidValue ? `${firstValidValue}` : `${fallback}`
}

export const makeDataImages = async (images = [], prefixKey = '') => {
  const getDataFile = images.map(async (e) => {
    const fileURL = URL.createObjectURL(e)
    const fileName = e?.name

    const data = await convertDataFileToBase64(e)
    return {
      data,
      fileName,
    }
  })

  const dataImages = await Promise.all(getDataFile)

  return dataImages.map((e) => ({
    [`${prefixKey}DataFile`]: e.data,
    [`${prefixKey}TenFile`]: e.fileName,
    urlTemp: '',
    lastModified: '',
  }))
}
