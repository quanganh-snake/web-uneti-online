import React from 'react'
import PropTypes from 'prop-types'
import { useTable } from 'react-table'

function ThanhPhanHoSoDeNghiView(props) {

    const fakeDataColumns = [
		{
			Header: "STT",
		},
		{
			Header: "Tên giấy tờ",
			accessor: "MC_TTHC_GV_ThanhPhanHoSo_TenGiayTo",
		},
		{
			Header: "Mẫu hồ sơ/Hướng dẫn",
			accessor: "MC_TTHC_GV_ThanhPhanHoSo_DataFile",
		},
		{
			Header: "Bản chính",
			accessor: "MC_TTHC_GV_ThanhPhanHoSo_BanChinh",
		},
		{
			Header: "Bản sao",
			accessor: "MC_TTHC_GV_ThanhPhanHoSo_BanSao",
		},
		{
			Header: "Bắt buộc",
			accessor: "MC_TTHC_GV_ThanhPhanHoSo_BatBuoc",
		},
		{
			Header: "",
		},
    ];
    
    const fakeDataRows = [
        {
            
        }
    ]

    useTable({
        columns: fakeDataColumns,
        data: fakeDataRows,
	});

  return (
    <div>ThanhPhanHoSoDeNghiView</div>
  )
}

ThanhPhanHoSoDeNghiView.propTypes = {}

export default ThanhPhanHoSoDeNghiView
