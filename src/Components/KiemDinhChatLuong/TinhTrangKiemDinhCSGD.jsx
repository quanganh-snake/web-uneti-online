import React from 'react'
import PropTypes from 'prop-types'
import { useNamespace } from '@/Services/Hooks'
import ChartKiemDinhCTDT from './ChartTinhTrangKiemDinh/ChartKiemDinhCTDT'

const TinhTrangKiemDinhCSGD = (props) => {
  const ns = useNamespace('tt-kiemdinh-csgd')
  return (
    <>
      <div
        className={[
          ns.b('header'),
          ' my-10 flex items-center justify-between bg-uneti-primary p-2 text-white',
        ]}
      >
        <p className="font-bold uppercase">
          Tình trạng kiểm định cơ sở giáo dục
        </p>
        <p>Chi tiết</p>
      </div>
    </>
  )
}

TinhTrangKiemDinhCSGD.propTypes = {}

export default TinhTrangKiemDinhCSGD
