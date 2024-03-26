import React from 'react'
import PropTypes from 'prop-types'
import { useNamespace } from '@/Services/Hooks'
import Chart from 'react-apexcharts'
import ChartNhanLuc from './ChartDuLieuKiemDinh/ChartNhanLuc'
import ChartNguoiHoc from './ChartDuLieuKiemDinh/ChartNguoiHoc'
import ChartNguonThuNhap from './ChartDuLieuKiemDinh/ChartNguonThuNhap'
import ChartCongBoKhoaHoc from './ChartDuLieuKiemDinh/ChartCongBoKhoaHoc'

const DuLieuDamBaoChatLuong = (props) => {
  const ns = useNamespace('dbcl')
  return (
    <>
      <div
        className={[
          ns.b('header'),
          ' my-10 flex items-center justify-between bg-uneti-primary p-2 text-white',
        ]}
      >
        <p className="font-bold uppercase">Dữ liệu đảm bảo chất lượng</p>
        <p>Chi tiết</p>
      </div>
      <div className={[ns.b('list'), ' bg-white']}>
        <div className="grid grid-cols-2 gap-4">
          {/* START: item dữ liệu đảm bảo chất lượng */}
          <div className="col-span-2 lg:col-span-1">
            <div className={'h-full bg-uneti-primary/30 p-2'}>
              <p className="font-semibold uppercase text-uneti-primary">
                Nhân lực
              </p>
              {/* START: Chart Nhân lực */}
              <div className={[ns.em('chart', 'nhan-luc'), ' h-full']}>
                <ChartNhanLuc />
              </div>
              {/* End: Chart Nhân lực */}
            </div>
          </div>
          {/* END: item dữ liệu đảm bảo chất lượng */}
          {/* START: item dữ liệu đảm bảo chất lượng */}
          <div className="col-span-2 lg:col-span-1">
            <div className={'h-full bg-uneti-primary/30 p-2'}>
              <p className="font-semibold uppercase text-uneti-primary">
                Người học
              </p>
              {/* START: Chart người học */}
              <div className={[ns.em('chart', 'nguoi-hoc'), ' h-full']}>
                <ChartNguoiHoc />
              </div>
              {/* END: Chart người học */}
            </div>
          </div>
          {/* END: item dữ liệu đảm bảo chất lượng */}
          {/* START: item dữ liệu đảm bảo chất lượng */}
          <div className="col-span-2 h-full lg:col-span-1">
            <div className={'h-full bg-uneti-primary/30 p-2'}>
              <p className="font-semibold uppercase text-uneti-primary">
                Nguồn thu nhập
              </p>
              {/* START: Chart nguồn thu nhập */}
              <div className={[ns.em('chart', 'nguon-thu-nhap'), ' h-full']}>
                <ChartNguonThuNhap />
              </div>
              {/* END: Chart nguồn thu nhập */}
            </div>
          </div>
          {/* END: item dữ liệu đảm bảo chất lượng */}
          {/* START: item dữ liệu đảm bảo chất lượng */}
          <div className="col-span-2 lg:col-span-1">
            <div className={'bg-uneti-primary/30 p-2'}>
              <p className="font-semibold uppercase text-uneti-primary">
                Công bố khoa học
              </p>
              {/* START: Chart công bố khoa học */}
              <div className={[ns.em('chart', 'cong-bo-khoa-hoc'), ' h-full']}>
                <ChartCongBoKhoaHoc />
              </div>
              {/* END: Chart công bố khoa học */}
            </div>
          </div>
          {/* END: item dữ liệu đảm bảo chất lượng */}
        </div>
      </div>
    </>
  )
}

DuLieuDamBaoChatLuong.propTypes = {}

export default DuLieuDamBaoChatLuong
