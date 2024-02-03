import { getCauHoiTheoChuong } from '@/Apis/HocTap/apiOnLuyenThiThu'
import {
  getChuongTheoPhanCauHoi,
  getMonHocTheoSinhVien,
  getPhanTheoMonHoc,
} from '@/Apis/HocTap/apiOnLuyenTracNghiem'
import { LOAD_CAU_HOI_DIEU_KIEN_LOC } from '@/Services/Tokens'
import { DataSinhVien } from '@/Services/Utils/dataSinhVien'
import dayjs from 'dayjs'
import { isNil } from 'lodash-unified'
import { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { NguonTiepNhan_WEB } from '@/Services/Static/dataStatic'
import { convertBufferToBase64 } from '@/Services/Utils/stringUtils'
import { rtfToHtml } from '@/Services/Utils/rtfjs'

function DanhSachDeThi() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const dataSV = DataSinhVien()

  const maMonHoc = pathname.split('/').at(-5)
  const idPhanCauHoi = pathname.split('/').at(-3)
  const idChuong = pathname.split('/').at(-1)

  const [monHoc, setMonHoc] = useState(null)
  const [phanCauHoi, setPhanCauHoi] = useState(null)
  const [chuong, setChuong] = useState(null)
  const [listCauHoi, setListCauHoi] = useState([])
  const [listCauTraLoi, setListCauTraLoi] = useState([])
  const thoiGianBatDau = useRef(dayjs().toISOString())
  const [dieuKienLoc, setDieuKienLoc] = useState(
    LOAD_CAU_HOI_DIEU_KIEN_LOC.TatCa,
  )
  const [totalPage, setTotalPage] = useState(1)
  const [currPage, setCurrPage] = useState(1)

  monHoc
  chuong
  listCauTraLoi
  setDieuKienLoc(LOAD_CAU_HOI_DIEU_KIEN_LOC.TatCa)
  totalPage
  setTotalPage(1)
  setCurrPage(1)

  useEffect(() => {
    // lấy thông tin môn học
    const getThongTinMonHoc = async () => {
      const resData = await getMonHocTheoSinhVien(dataSV.MaSinhVien)
      const data = await resData?.data?.body
      const filterData = data.filter(
        (element) => element.MaMonHoc.toString() === maMonHoc,
      )[0]

      if (isNil(filterData)) {
        //   nếu không tìm thấy môn học nào thì trở lại trang danh sách
        navigate('/hoctap/onluyen/ontap')
      } else {
        setMonHoc(filterData)
      }
    }

    //lấy thông tin phần câu hỏi
    const getPhanCauHoi = async () => {
      const resData = await getPhanTheoMonHoc(maMonHoc)
      const data = await resData?.data?.body
      const filterData = data.filter(
        (element) => element.Id.toString() === idPhanCauHoi,
      )[0]

      if (isNil(filterData)) {
        //   nếu không tìm thấy môn học nào thì trở lại trang danh sách
        navigate(`/hoctap/onluyen/ontap/danhsachphan/${maMonHoc}`)
      } else {
        setPhanCauHoi(filterData)
      }
    }

    // lấy thông tin chương
    const getChuong = async () => {
      const resData = await getChuongTheoPhanCauHoi(idPhanCauHoi)
      const data = await resData?.data?.body
      const filterData = data.filter(
        (element) => element.Id.toString() === idChuong,
      )[0]
      if (isNil(filterData)) {
        //   nếu không tìm thấy môn học nào thì trở lại trang danh sách
        navigate(
          `/hoctap/onluyen/ontap/danhsachphan/${maMonHoc}/danhsachchuong/${idPhanCauHoi}`,
        )
      } else {
        setChuong(filterData)
      }
    }

    // lấy danh sách câu hỏi
    const getAllCauHoi = async () => {
      const resData = await getCauHoiTheoChuong({
        IDSinhVien: dataSV.IdSinhVien.toString(),
        IDChuong: idChuong,
        SoTrang: currPage,
        SoCauTrenTrang: '10',
        DieuKienLoc: dieuKienLoc,
      })

      const data = await resData?.data?.body

      const convertData = []

      for (let i = 0; i < data.length; i++) {
        convertData.push(await convertQuestion(data[i]))
      }

      const groupData = groupByCauHoiCha(convertData)

      setListCauHoi(groupData)

      const answersData = convertData.map((element) => {
        return {
          TC_SV_OnThi_KetQuaOnTap_IDSinhVien: dataSV.IdSinhVien.toString(),
          TC_SV_OnThi_KetQuaOnTap_MaMonHoc: maMonHoc,
          TC_SV_OnThi_KetQuaOnTap_IDCauHoi: element.Id,
          TC_SV_OnThi_KetQuaOnTap_IDCauTraLoi: 'null',
          TC_SV_OnThi_KetQuaOnTap_CauPhanVan: 'null',
        }
      })

      setListCauTraLoi(answersData)
    }

    //auto post data
    const autoPostData = setInterval(handlePostData, 60 * 10 * 1000)

    getThongTinMonHoc()
    getPhanCauHoi()
    getChuong()
    getAllCauHoi()

    return () => {
      clearInterval(autoPostData)
      handlePostData()
    }
  }, [])

  const handlePostData = () => {
    const data = {
      TC_SV_OnThi_DanhSachOnTap_IDSinhVien: dataSV.IdSinhVien,
      TC_SV_OnThi_DanhSachOnTap_MaMonHoc: maMonHoc,
      TC_SV_OnThi_DanhSachOnTap_ThoiGianGioBatDau: thoiGianBatDau.current,
      TC_SV_OnThi_DanhSachOnTap_ThoiGianGioKetThuc: dayjs().toISOString(),
      TC_SV_OnThi_DanhSachOnTap_NguonTiepNhan: NguonTiepNhan_WEB,
    }
    console.log(data)

    thoiGianBatDau.current = dayjs().toISOString()
  }

  const convertQuestion = async (question) => {
    const listAnhCauHoiCha = convertListBuffersToListImages([
      question.AnhCauHoiCha_1,
      question.AnhCauHoiCha_2,
      question.AnhCauHoiCha_3,
      question.AnhCauHoiCha_4,
      question.AnhCauHoiCha_5,
    ])

    const listAnhCauHoiCon = convertListBuffersToListImages([
      question.AnhCauHoiCon_1,
      question.AnhCauHoiCon_2,
      question.AnhCauHoiCon_3,
      question.AnhCauHoiCon_4,
      question.AnhCauHoiCon_5,
    ])

    const anhCauTraLoi1 = convertBufferToImage(question.AnhCauTraLoi_1)
    const anhCauTraLoi2 = convertBufferToImage(question.AnhCauTraLoi_2)
    const anhCauTraLoi3 = convertBufferToImage(question.AnhCauTraLoi_3)
    const anhCauTraLoi4 = convertBufferToImage(question.AnhCauTraLoi_4)

    const CauHoiCha = await convertQuestionElement(question.CauHoiCha)
    const CauHoi = await convertQuestionElement(question.CauHoi)
    const CauTraLoi1 = await convertQuestionElement(question.CauTraLoi1)
    const CauTraLoi2 = await convertQuestionElement(question.CauTraLoi2)
    const CauTraLoi3 = await convertQuestionElement(question.CauTraLoi3)
    const CauTraLoi4 = await convertQuestionElement(question.CauTraLoi4)

    return {
      Id: question.Id.toString(),
      IdPage: question.IDPage,
      IdCauHoiCha: question.IDCauHoiCha,
      IdCauTraLoi1: question.IDCauTraLoi1,
      IdCauTraLoi2: question.IDCauTraLoi2,
      IdCauTraLoi3: question.IDCauTraLoi3,
      IdCauTraLoi4: question.IDCauTraLoi4,
      listAnhCauHoiCha,
      listAnhCauHoiCon,
      CauHoiCha,
      CauHoi,
      CauTraLoi1,
      CauTraLoi2,
      CauTraLoi3,
      CauTraLoi4,
      anhCauTraLoi1,
      anhCauTraLoi2,
      anhCauTraLoi3,
      anhCauTraLoi4,
      IsAudioCauHoiCha: question.IsAudioCauHoiCha,
      IsAudioCauHoiCon: question.IsAudioCauHoiCon,
      CauPhanVan: question.CauPhanVan,
      CauTraLoi: question.CauTraLoi,
      Dung: question.Dung,
    }
  }

  const convertQuestionElement = async (element) => {
    const str = `<svg viewBox="0 0 529 529" preserveAspectRatio="none" width="15pt" height="15pt"><svg x="0" y="0" width="529" height="529" viewBox="0 0 529 529" preserveAspectRatio="none"><image x="0" y="0" width="529" height="529" xlink:href="data:image/bmp;base64,Qk3mBAAAAAAAADYAAAAoAAAAFAAAABQAAAABABgAAAAAALAEAADEDgAAxA4AAAAAAAAAAAAA09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PTubm5ZWVlsLCw09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PTsLCwLCwshISES0tL09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PTtLS0KSkpr6+vwsLCPT0909PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PTs7OzKSkpsLCw09PTwsLCPT0909PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PTsrKyKCgosLCw09PT09PTwsLCPT0909PT09PTjY2NT09Py8vL09PT09PT09PT09PTqKiocXFxcXFxXl5eJycnt7e309PT09PT09PTwsLCPT0909PT09PT09PTi4uLPz8/0dHR09PT09PT09PTJiYmjIyMjY2NLCwstbW109PT09PT09PT09PTwsLCPT09wsLCg4ODzc3N09PTampqf39/09PT09PT09PTKCgo09PT09PTLS0t09PT09PT09PT09PT09PTwsLCPT09zs7OcXFxQkJC09PTx8fHMTEx09PT09PT09PTKCgo09PT09PTLS0t09PT09PT09PT09PT09PTwsLCPT0909PT09PTS0tLra2t09PTLS0t0dHR09PT09PTKCgo09PT09PTLS0t09PT09PT09PT09PT09PTwsLCPT0909PT09PTVFRUpaWl09PTLy8vz8/P09PT09PTKCgo09PT09PTLS0t09PT09PT09PT09PT09PTwsLCPT090tLSjY2NLi4u0dHRzMzMLS0t09PT09PT09PTJCQktLS0t7e3MjIyx8fH09PT09PT09PT09PTwsLCPT09vb29WlpawsLC09PTenp6cnJy09PT09PT09PTj4+PPDw8ODg4Li4uNjY2x8fH09PT09PT09PTwsLCPT0909PT09PT09PTqqqqMTExy8vL09PT09PT09PT09PT09PT09PT09PTkJCQOzs7y8vL09PT09PTwsLCPT0909PT09PTkpKSNzc3vLy809PT09PT09PT09PT09PT09PT09PT09PT09PTkZGROzs7y8vL09PTwsLCPT0909PT09PTxMTE0dHR09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PTkZGROzs7ysrKwsLCPT0909PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PTmJiYNDQ0q6urRERE09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PTn5+fMDAwmpqa09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT"></image></svg></svg>`

    let CauHoi = {
      type: null,
      data: null,
    }

    if (typeof element === 'object') {
      CauHoi = {
        type: 'image',
        data: convertBufferToBase64(element?.data),
      }
    } else {
      CauHoi = {
        type: 'html',
        data: await rtfToHtml(element).then((res) =>
          res.map((e) =>
            e
              .map((e1) => e1.innerHTML)
              .join('')
              .replace(str, '')
              .replace(/\[[^\]]+\.mp3\]/g, ''),
          ),
        ),
      }
    }

    return CauHoi
  }

  const convertListBuffersToListImages = (array) => {
    return array
      .filter((element) => !isNil(element))
      .map((element) => convertBufferToBase64(element?.data))
  }

  const convertBufferToImage = (buffer) => {
    return isNil(buffer) ? null : convertBufferToBase64(buffer?.data)
  }

  const groupByCauHoiCha = (array) => {
    const groupArray = []
    for (const obj of array) {
      // Tìm kiếm đối tượng trong kết quả với thuộc tính A
      const existingObj = groupArray.find(
        (item) => item.IdCauHoiCha === obj.IdCauHoiCha,
      )

      // Nếu không tìm thấy, tạo một đối tượng mới và thêm vào kết quả
      if (!existingObj) {
        const newObj = {
          IdCauHoiCha: obj.IdCauHoiCha,
          CauHoiCha: obj.CauHoiCha,
          IsAudioCauHoiCha: obj.IsAudioCauHoiCha,
          listAnhCauHoiCha: obj.listAnhCauHoiCha,
          listCauHoiCon: [
            {
              Id: obj.Id,
              IdPage: obj.IdPage,
              IdCauTraLoi1: obj.IdCauTraLoi1,
              IdCauTraLoi2: obj.IdCauTraLoi2,
              IdCauTraLoi3: obj.IdCauTraLoi3,
              IdCauTraLoi4: obj.IdCauTraLoi4,
              listAnhCauHoiCon: obj.listAnhCauHoiCon,
              CauHoi: obj.CauHoi,
              CauTraLoi1: obj.CauTraLoi1,
              CauTraLoi2: obj.CauTraLoi2,
              CauTraLoi3: obj.CauTraLoi3,
              CauTraLoi4: obj.CauTraLoi4,
              anhCauTraLoi1: obj.anhCauTraLoi1,
              anhCauTraLoi2: obj.anhCauTraLoi2,
              anhCauTraLoi3: obj.anhCauTraLoi3,
              anhCauTraLoi4: obj.anhCauTraLoi4,
              IsAudioCauHoiCon: obj.IsAudioCauHoiCon,
              CauPhanVan: obj.CauPhanVan,
              CauTraLoi: obj.CauTraLoi,
              Dung: obj.Dung,
            },
          ],
        }
        groupArray.push(newObj)
      } else {
        // Nếu tìm thấy, thêm đối tượng mới vào mảng list của đối tượng đã có
        existingObj.listCauHoiCon.push({
          Id: obj.Id,
          IdPage: obj.IdPage,
          IdCauTraLoi1: obj.IdCauTraLoi1,
          IdCauTraLoi2: obj.IdCauTraLoi2,
          IdCauTraLoi3: obj.IdCauTraLoi3,
          IdCauTraLoi4: obj.IdCauTraLoi4,
          listAnhCauHoiCon: obj.listAnhCauHoiCon,
          CauHoi: obj.CauHoi,
          CauTraLoi1: obj.CauTraLoi1,
          CauTraLoi2: obj.CauTraLoi2,
          CauTraLoi3: obj.CauTraLoi3,
          CauTraLoi4: obj.CauTraLoi4,
          anhCauTraLoi1: obj.anhCauTraLoi1,
          anhCauTraLoi2: obj.anhCauTraLoi2,
          anhCauTraLoi3: obj.anhCauTraLoi3,
          anhCauTraLoi4: obj.anhCauTraLoi4,
          IsAudioCauHoiCon: obj.IsAudioCauHoiCon,
          CauPhanVan: obj.CauPhanVan,
          CauTraLoi: obj.CauTraLoi,
          Dung: obj.Dung,
        })
      }
    }

    return groupArray
  }

  console.log(listCauHoi)

  return (
    <div>
      <div className="flex flex-col text-center justify-start items-center gap-4 bg-white shadow-sm rounded-[26px] mb-4 p-4">
        <h3 className="text-uneti-primary text-center uppercase font-semibold text-xl">
          {phanCauHoi?.TenPhan}
        </h3>
        <span className="text-uneti-primary uppercase text-sm">
          Mã phần câu hỏi: {phanCauHoi?.MaPhan}
        </span>
      </div>
      <div className="flex flex-col text-center justify-start items-center gap-4 bg-white shadow-sm rounded-[26px] mb-4 p-4">
        {listCauHoi.map((element, index) => (
          <div
            key={index}
            className="w-full bg-white transition-all text-vs-theme-color text-sm select-none rounded-[20px] border-2 p-5 border-slate-100 padding focus-within:border-uneti-primary hover:border-uneti-primary"
          >
            <div className="flex flex-col gap-4 items-start mb-3 text-base text-vs-text">
              <div className="font-semibold text-left flex-1">
                {(() => {
                  if (element.CauHoiCha.type === 'image') {
                    return (
                      <img
                        src={`data:image/png;base64,${element.CauHoiCha.data}`}
                      />
                    )
                  }
                  return (
                    <span
                      dangerouslySetInnerHTML={{
                        __html: `${element.CauHoiCha}`,
                      }}
                    />
                  )
                })()}
              </div>
              {element.listCauHoiCon.map((e, i) => (
                <div key={i}>
                  <div>
                    {(() => {
                      if (e.CauHoi.type === 'image') {
                        return (
                          <img src={`data:image/png;base64,${e.CauHoi.data}`} />
                        )
                      }
                      return (
                        <span
                          dangerouslySetInnerHTML={{
                            __html: `${e.CauHoi}`,
                          }}
                        />
                      )
                    })()}
                  </div>
                  <div className="flex">
                    <input
                      value={element.IdCauTraLoi1}
                      id={element.IdCauTraLoi1}
                      name={element.Id}
                      type="radio"
                      className="aspect-square w-[20px] mr-2"
                    />
                    <label htmlFor={element.IdCauTraLoi1}>
                      <span>A. </span>
                      {(() => {
                        if (e.CauTraLoi1.type === 'image') {
                          return (
                            <img
                              src={`data:image/png;base64,${e.CauTraLoi1.data}`}
                            />
                          )
                        }
                        return (
                          <span
                            dangerouslySetInnerHTML={{
                              __html: `${e.CauTraLoi1}`,
                            }}
                          />
                        )
                      })()}
                    </label>
                  </div>
                  <div className="flex">
                    <input
                      value={element.IdCauTraLoi2}
                      id={element.IdCauTraLoi2}
                      name={element.Id}
                      type="radio"
                      className="aspect-square w-[20px] mr-2"
                    />
                    <label htmlFor={element.IdCauTraLoi2}>
                      <span>B. </span>
                      {(() => {
                        if (e.CauTraLoi2.type === 'image') {
                          return (
                            <img
                              src={`data:image/png;base64,${e.CauTraLoi2.data}`}
                            />
                          )
                        }
                        return (
                          <span
                            dangerouslySetInnerHTML={{
                              __html: `${e.CauTraLoi2}`,
                            }}
                          />
                        )
                      })()}
                    </label>
                  </div>
                  <div className="flex">
                    <input
                      value={element.IdCauTraLoi3}
                      id={element.IdCauTraLoi3}
                      name={element.Id}
                      type="radio"
                      className="aspect-square w-[20px] mr-2"
                    />
                    <label htmlFor={element.IdCauTraLoi3}>
                      <span>C. </span>
                      {(() => {
                        if (e.CauTraLoi3.type === 'image') {
                          return (
                            <img
                              src={`data:image/png;base64,${e.CauTraLoi3.data}`}
                            />
                          )
                        }
                        return (
                          <span
                            dangerouslySetInnerHTML={{
                              __html: `${e.CauTraLoi3}`,
                            }}
                          />
                        )
                      })()}
                    </label>
                  </div>
                  <div className="flex">
                    <input
                      value={element.IdCauTraLoi4}
                      id={element.IdCauTraLoi4}
                      name={element.Id}
                      type="radio"
                      className="aspect-square w-[20px] mr-2"
                    />
                    <label htmlFor={element.IdCauTraLoi4}>
                      <span>D. </span>
                      {(() => {
                        if (e.CauTraLoi4.type === 'image') {
                          return (
                            <img
                              src={`data:image/png;base64,${e.CauTraLoi4.data}`}
                            />
                          )
                        }
                        return (
                          <span
                            dangerouslySetInnerHTML={{
                              __html: `${e.CauTraLoi4}`,
                            }}
                          />
                        )
                      })()}
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <button onClick={handlePostData}>Nộp bài</button>
    </div>
  )
}

export default DanhSachDeThi
