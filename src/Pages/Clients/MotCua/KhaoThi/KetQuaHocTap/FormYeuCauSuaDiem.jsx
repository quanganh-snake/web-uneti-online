import { MenuItem, Select, TextField } from '@mui/material'

function FormYeuCauSuaDiem(props) {
  const {
    lyDo,
    listLyDoDTK,
    listLyDoDT,
    lyDoChiTiet,
    setLyDoChiTiet,
    diemSua,
    setDiemSua,
    handleSubmitData,
  } = props

  const listLyDoView =
    lyDo === 'Điều chỉnh, bổ sung: Điểm thường kỳ' ? listLyDoDTK : listLyDoDT

  return (
    <form className="py-8 flex flex-col justify-center items-center gap-4">
      <div className="w-[75%] flex flex-col md:flex-row md:justify-between md:items-center gap-2">
        <span className="block pr-10 w-[300px]">
          {lyDo === 'Điều chỉnh, bổ sung: Điểm thường kỳ'
            ? `Điểm thường kỳ (*)`
            : `Điểm thi (*)`}
        </span>
        <TextField
          value={diemSua}
          onChange={(e) => setDiemSua(e.target.value)}
          type="number"
          InputProps={{ inputProps: { min: 0, max: 10 } }}
          className="flex-1 md:max-w-[75%] p-2 rounded-md border border-solid border-gray-300"
        />
      </div>
      <div className="w-[75%] flex flex-col md:flex-row md:justify-between md:items-center gap-2">
        <span className="block pr-10 w-[300px]">
          {lyDo === 'Điều chỉnh, bổ sung: Điểm thường kỳ'
            ? `Lý do điều chỉnh điểm thường kỳ (*)`
            : `Lý do điều chỉnh điểm thi (*)`}
        </span>
        <Select
          value={lyDoChiTiet}
          onChange={(e) => {
            setLyDoChiTiet(e.target.value)
          }}
          className="flex-1 md:max-w-[75%] rounded-md border border-solid border-gray-300"
        >
          {listLyDoView.map((e, index) => (
            <MenuItem key={index} value={e}>
              {e}
            </MenuItem>
          ))}
        </Select>
      </div>
      {lyDoChiTiet.length ? (
        <button
          onClick={handleSubmitData}
          className="mt-8 px-5 py-3 border-2 border-solid text-[#245D7C] border-[#245D7C] rounded-md font-bold transition-all duration-200 hover:bg-[#245D7C] hover:text-white"
        >
          Gửi Yêu Cầu
        </button>
      ) : null}
    </form>
  )
}

export default FormYeuCauSuaDiem
