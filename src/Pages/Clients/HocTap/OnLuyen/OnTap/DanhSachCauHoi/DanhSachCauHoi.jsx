import {
  getCauHoiTheoChuong,
  getChuongTheoPhanCauHoi,
  getMonHocTheoSinhVien,
  getPhanTheoMonHoc,
  getTongSoTrangTheoChuong,
  postDanhSachOnTap,
  postKetQuaOnTap,
} from '@/Apis/HocTap/apiOnLuyenTracNghiem'
import { LOAD_CAU_HOI_DIEU_KIEN_LOC } from '@/Services/Tokens'
import { DataSinhVien } from '@/Services/Utils/dataSinhVien'
import dayjs from 'dayjs'
import { isArray, isNil, values } from 'lodash-unified'
import { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { NguonTiepNhan_WEB } from '@/Services/Static/dataStatic'
import { convertBufferToBase64 } from '@/Services/Utils/stringUtils'
import { rtfToHtml } from '@/Services/Utils/rtfjs'
import Button from '@/Components/Base/Button/Button'
import { retries } from '@/Services/Utils/requestUtils'
import Loading from '@/Components/Loading/Loading'
import UAudio from '@/Components/HocTap/OnTap/Audio'
import { BsFlag, BsFlagFill } from 'react-icons/bs'

import './DanhSachCauHoi.scss'
import { Radio } from '@/Components/Base/Radio/Radio'
import Swal from 'sweetalert2'
import { getSourceAudio } from '../../utils'
import { ONTAP_SOCAUTRENTRANG } from '../constants'

const BASE64_ICON_LOA = `iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAG8SURBVDhPrZJLq0FRGIb9GLmUe0IhJTMDEyMDMxMzhiYGzJDLSCZGSiRySYqJlHINP+g9fV+t1d7OcuRk19Ne69vvfvZe31qGx+OBb2GgS/VAS7fbhcvlQqfTUT7X8lbYbrfh9XoxHA4Ri8WUGS1/CpvNJoLBIA6HA7bbLcLhsDKn5aVQyI7HI8+fhbvdDrfbTc4FSmGj0dDJiGdhq9WC3+/Her2WNYKF9XodoVAIgUAADocDPp8P+/1eF1QteTAYwO126z7MQqPRiPl8juVyCY/H80tGCOFms0EqleI51QuFAvL5vMyx0GKxyILdbpdjLUJ4v99Rq9V4JdTD0+mke+djoZgnk0n0ej0eO51OXK9XHv9bGI/HMRqNeEzviB3/WHi5XJDL5RCNRrlO/aaNETkWmkwmVKtV7o3NZsNisZABgRDSvVQq4Xw+cz2bzaJYLMocC/v9Pn+VSKfTMJvNvOMiRDwvmahUKohEIroDzkJtiJhOp6A2TCYTWXsW0moSiYTuDBJKITGbzWC1WqVU9YcqXgoJOuwkHY/H3xES9Ie0UeVymY+KKqPlrZBYrVbIZDK6nr6Chd+9DIYfXVBcwSrtT6gAAAAASUVORK5CYII=`

function DanhSachDeThi() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const dataSV = DataSinhVien()

  const maMonHoc = pathname.split('/').at(-5)
  const idPhanCauHoi = pathname.split('/').at(-3)
  const idChuong = pathname.split('/').at(-1)

  const [isShowAnswer, setIsShowAnswer] = useState(false)
  const [monHoc, setMonHoc] = useState(null)
  const [phanCauHoi, setPhanCauHoi] = useState(null)
  const [chuong, setChuong] = useState(null)
  const [listCauHoi, setListCauHoi] = useState([])
  const [listCauTraLoi, setListCauTraLoi] = useState(null)
  const thoiGianBatDau = useRef(dayjs().toISOString())
  const [dieuKienLoc, setDieuKienLoc] = useState(
    LOAD_CAU_HOI_DIEU_KIEN_LOC.TatCa,
  )
  const [totalPage, setTotalPage] = useState(1)
  const [currPage, setCurrPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const listCauTraLoiPost = useRef([])

  useEffect(() => {
    if (!dataSV || !maMonHoc || !idChuong) return
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
      setIsLoading(true)
      const resData = await getCauHoiTheoChuong({
        IDSinhVien: dataSV.IdSinhVien.toString(),
        IDChuong: idChuong.toString(),
        SoTrang: currPage.toString(),
        SoCauTrenTrang: ONTAP_SOCAUTRENTRANG,
        DieuKienLoc: dieuKienLoc.toString(),
      })

      const data = await resData?.data?.body

      const convertData = []

      for (let i = 0; i < data.length; i++) {
        convertData.push(await convertQuestion(data[i]))
      }

      const groupData = groupByCauHoiCha(convertData)

      setListCauHoi(groupData)

      let answerData = {}

      groupData.forEach((e) => {
        e?.listCauHoiCon.forEach((e1) => {
          answerData[e1.Id] = {
            TC_SV_OnThi_KetQuaOnTap_IDSinhVien: dataSV.IdSinhVien.toString(),
            TC_SV_OnThi_KetQuaOnTap_MaMonHoc: maMonHoc,
            TC_SV_OnThi_KetQuaOnTap_IDCauHoi: e1.Id,
            TC_SV_OnThi_KetQuaOnTap_IDCauTraLoi:
              e1.CauTraLoi == null ? 'null' : e1.CauTraLoi.toString(),
            TC_SV_OnThi_KetQuaOnTap_CauPhanVan:
              e1.CauPhanVan == null ? 'null' : e1.CauPhanVan.toString(),
          }
        })
      })

      setListCauTraLoi(answerData)

      setIsLoading(false)
    }

    // lấy danh tổng số trang câu hỏi
    const getTotalPage = async () => {
      const resData = await getTongSoTrangTheoChuong({
        IDSinhVien: dataSV.IdSinhVien,
        IDChuong: idChuong,
        SoCauTrenTrang: ONTAP_SOCAUTRENTRANG,
        DieuKienLoc: dieuKienLoc,
      })

      const { TongSoTrang } = (await resData.data.body[0]) || { TongSoTrang: 1 }

      setTotalPage(TongSoTrang)
    }

    //auto post data
    const autoPostData = setInterval(handlePostData, 60 * 10 * 1000)

    retries(getThongTinMonHoc)
    retries(getPhanCauHoi)
    retries(getChuong)
    retries(getAllCauHoi)
    retries(getTotalPage)

    return () => {
      clearInterval(autoPostData)
      handlePostData()
    }
  }, [])

  useEffect(() => {
    setAudioPlaying(null)
    // lấy danh sách câu hỏi
    const getAllCauHoi = async () => {
      setIsLoading(true)
      setCurrPage(1)
      const resData = await getCauHoiTheoChuong({
        IDSinhVien: dataSV.IdSinhVien.toString(),
        IDChuong: idChuong.toString(),
        SoTrang: currPage.toString(),
        SoCauTrenTrang: ONTAP_SOCAUTRENTRANG,
        DieuKienLoc: dieuKienLoc.toString(),
      })

      const data = await resData?.data?.body

      const convertData = []

      for (let i = 0; i < data.length; i++) {
        convertData.push(await convertQuestion(data[i]))
      }

      const groupData = groupByCauHoiCha(convertData)

      setListCauHoi(groupData)

      let answerData = {}

      groupData.forEach((e) => {
        e?.listCauHoiCon.forEach((e1) => {
          answerData[e1.Id] = {
            TC_SV_OnThi_KetQuaOnTap_IDSinhVien: dataSV.IdSinhVien.toString(),
            TC_SV_OnThi_KetQuaOnTap_MaMonHoc: maMonHoc,
            TC_SV_OnThi_KetQuaOnTap_IDCauHoi: e1.Id,
            TC_SV_OnThi_KetQuaOnTap_IDCauTraLoi:
              e1.CauTraLoi == null ? 'null' : e1.CauTraLoi.toString(),
            TC_SV_OnThi_KetQuaOnTap_CauPhanVan:
              e1.CauPhanVan == null ? 'null' : e1.CauPhanVan.toString(),
          }
        })
      })

      setListCauTraLoi(answerData)

      setIsLoading(false)
    }

    // lấy danh tổng số trang câu hỏi
    const getTotalPage = async () => {
      const resData = await getTongSoTrangTheoChuong({
        IDSinhVien: dataSV.IdSinhVien,
        IDChuong: idChuong,
        SoCauTrenTrang: ONTAP_SOCAUTRENTRANG,
        DieuKienLoc: dieuKienLoc,
      })

      const { TongSoTrang } = (await resData.data.body[0]) || { TongSoTrang: 1 }

      setTotalPage(TongSoTrang)
    }

    retries(getAllCauHoi)
    retries(getTotalPage)
  }, [dieuKienLoc, currPage, isShowAnswer])

  useEffect(() => {
    listCauTraLoiPost.current = values(listCauTraLoi)
  }, [listCauTraLoi])

  const handlePostData = async () => {
    if (listCauTraLoiPost.current.length == 0) return
    const data = {
      TC_SV_OnThi_DanhSachOnTap_IDSinhVien: dataSV.IdSinhVien.toString(),
      TC_SV_OnThi_DanhSachOnTap_IdChuong: parseInt(idChuong),
      TC_SV_OnThi_DanhSachOnTap_ThoiGianGioBatDau: thoiGianBatDau.current,
      TC_SV_OnThi_DanhSachOnTap_ThoiGianGioKetThuc: dayjs().toISOString(),
      TC_SV_OnThi_DanhSachOnTap_NguonTiepNhan: NguonTiepNhan_WEB.toString(),
    }

    // danh sách ôn tập
    await postDanhSachOnTap(data)

    // kết quả ôn tập
    let convertedListCauTraLoiPost = listCauTraLoiPost.current?.map((item) => ({
      ...item,
      TC_SV_OnThi_KetQuaOnTap_CauPhanVan:
        item.TC_SV_OnThi_KetQuaOnTap_CauPhanVan === 'true' ? true : false,
      TC_SV_OnThi_KetQuaOnTap_IDCauTraLoi:
        item.TC_SV_OnThi_KetQuaOnTap_IDCauTraLoi
          ? parseInt(item.TC_SV_OnThi_KetQuaOnTap_IDCauTraLoi)
          : null,
    }))
    await postKetQuaOnTap(convertedListCauTraLoiPost)

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
      Id: (question.Id || question.ID).toString(),
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
        data: await rtfToHtml(element).then((res) => {
          const arr = isArray(res) ? res : [res]

          return (
            arr
              .map((e) => e.innerHTML)
              .join('')
              .replace(str, '')
              // replace [Img_xxxxx.xxx] or [Audio_xxxxx.xxx] from questions
              .replace(/\[(Img|Audio)_[^\]]+\]/g, '')
          )
        }),
      }
    }

    return CauHoi
  }

  const convertListBuffersToListImages = (array) => {
    return array
      .filter((element) => !isNil(element))
      .map((element) => convertBufferToBase64(element?.data))
      .filter((element) => element != BASE64_ICON_LOA)
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

  const handleChangePage = async (val) => {
    await handlePostData()
    setCurrPage((_currPage) => _currPage + val)
  }

  const handleChangeDieuKienLoc = async (e) => {
    await handlePostData()
    setDieuKienLoc(e.target.value)
  }

  const handleSelectAnswer = (question, answer) => {
    setListCauTraLoi((_listCauTraLoi) => ({
      ..._listCauTraLoi,
      [question.Id]: {
        ..._listCauTraLoi[question.Id],
        TC_SV_OnThi_KetQuaOnTap_IDCauTraLoi:
          `${answer}` ==
          _listCauTraLoi[question.Id]?.TC_SV_OnThi_KetQuaOnTap_IDCauTraLoi
            ? undefined
            : `${answer}`,
      },
    }))
  }

  const handleWonderQuestion = (question) => {
    setListCauTraLoi((_listCauTraLoi) => ({
      ..._listCauTraLoi,
      [question.Id]: {
        ..._listCauTraLoi[question.Id],
        TC_SV_OnThi_KetQuaOnTap_CauPhanVan:
          _listCauTraLoi[question?.Id]?.TC_SV_OnThi_KetQuaOnTap_CauPhanVan ==
          'true'
            ? 'false'
            : 'true',
      },
    }))
  }

  // audio playing
  const [audioPlaying, setAudioPlaying] = useState(null)
  const [listAudio, setListAudio] = useState({})
  const [audioLoading, setAudioLoading] = useState(null)

  const handlePlayAudio = async (ID) => {
    if (audioLoading == ID) return

    if (ID !== null && !listAudio[ID]) {
      await setAudioLoading(ID)
      const src = await getSourceAudio(ID)
      await setListAudio((prev) => ({
        ...prev,
        [ID]: src,
      }))
      await setAudioLoading(() => null)
    }

    setTimeout(() => {
      setAudioPlaying(ID)
    })
  }

  const handleOnAudioFinish = () => {
    setAudioPlaying(null)
  }

  const handleSaveData = async () => {
    if (!isShowAnswer) {
      await handlePostData()
      Swal.fire({
        title: 'Thông báo',
        text: 'Đã lưu thành công',
        icon: 'success',
        confirmButtonText: 'Đóng',
      })
    }
    setIsShowAnswer((_isShowAnswer) => !_isShowAnswer)
  }

  return (
    <div>
      <div className="flex flex-col text-center justify-start items-center gap-4 bg-white shadow-sm rounded-[26px] mb-4 p-4">
        <h3 className="text-uneti-primary text-center uppercase font-semibold text-xl">
          {monHoc?.TenMonHoc}
        </h3>
        <span className="text-uneti-primary uppercase text-sm">
          {phanCauHoi?.TenPhan} - {chuong?.TenChuong}
        </span>
      </div>
      <div>
        <div className="flex flex-col text-center justify-start items-center gap-4 rounded-[26px] mb-4">
          <div className="w-full flex items-center justify-end gap-2">
            <select
              className="px-3 py-2 shadow-sm w-full max-w-[200px] outline-none border-none p-5 rounded-xl cursor-pointer"
              onChange={(e) => handleChangeDieuKienLoc(e)}
            >
              <option value={LOAD_CAU_HOI_DIEU_KIEN_LOC.TatCa}>Tất cả</option>
              <option value={LOAD_CAU_HOI_DIEU_KIEN_LOC.DaLam}>Đã làm</option>
              <option value={LOAD_CAU_HOI_DIEU_KIEN_LOC.ChuaLam}>
                Chưa làm
              </option>
              <option value={LOAD_CAU_HOI_DIEU_KIEN_LOC.PhanVan}>
                Phân vân
              </option>
            </select>
            <Button onClick={handleSaveData}>
              {isShowAnswer ? 'Tiếp tục làm' : 'Lưu đáp án'}
            </Button>
          </div>
          {isLoading ? (
            <div className="w-full flex justify-center items-center">
              <Loading />
            </div>
          ) : listCauHoi.length ? (
            listCauHoi.map((element, index) => (
              <div
                key={index}
                className="w-full bg-white transition-all text-vs-theme-color text-sm select-none rounded-[26px] border-2 p-3 border-slate-200 padding"
              >
                <div className="relative flex flex-col mb-3 last-of-type:mb-0 gap-4 items-start text-base text-vs-text">
                  <div className="text-left flex-1">
                    {
                      // hiển thị câu hỏi cha
                      (() => {
                        if (element.CauHoiCha.type === 'image') {
                          return (
                            <img
                              className="w-full"
                              src={`data:image/png;base64,${element.CauHoiCha.data}`}
                            />
                          )
                        }
                        return (
                          <span
                            dangerouslySetInnerHTML={{
                              __html: `${element.CauHoiCha.data}`,
                            }}
                          />
                        )
                      })()
                    }
                    {element.IsAudioCauHoiCha ? (
                      <div className="">
                        <UAudio
                          id={element.IdCauHoiCha}
                          isPlaying={element.IdCauHoiCha == audioPlaying}
                          maxPlayCount={0}
                          isLoading={audioLoading === element.IdCauHoiCha}
                          onPlaying={handlePlayAudio}
                          src={listAudio[element.IdCauHoiCha]}
                          onFinish={handleOnAudioFinish}
                        />
                      </div>
                    ) : null}
                    {
                      // hiển thị ảnh câu hỏi cha
                      element.listAnhCauHoiCha.map((e, i) => (
                        <img
                          className="w-full"
                          key={i}
                          src={`data:image/png;base64,${e}`}
                        />
                      ))
                    }
                  </div>
                  {element.listCauHoiCon.map((e, i) => (
                    <div
                      key={i}
                      className="relative w-full flex flex-col md:flex-row gap-3 bg-white transition-all text-vs-theme-color text-sm select-none rounded-[20px] border-2 p-5 border-slate-100 padding focus-within:border-uneti-primary hover:border-uneti-primary"
                    >
                      <div className="absolute top-2 right-2 flex justify-end items-start">
                        {e.IsAudioCauHoiCon && (
                          <div className="cursor-pointer">
                            <UAudio
                              id={e.Id}
                              isPlaying={e.Id == audioPlaying}
                              maxPlayCount={0}
                              isLoading={audioLoading === e.Id}
                              onPlaying={handlePlayAudio}
                              src={listAudio[e.Id]}
                              onFinish={handleOnAudioFinish}
                            />
                          </div>
                        )}
                        <div
                          onClick={() => handleWonderQuestion(e)}
                          className="w-[36px] text-vs-warn cursor-pointer aspect-square flex justify-center items-center rounded-full hover:bg-vs-warn hover:bg-opacity-20 transition-all duration-200"
                        >
                          {listCauTraLoi[e.Id]
                            .TC_SV_OnThi_KetQuaOnTap_CauPhanVan == 'true' ? (
                            <BsFlagFill size={24} />
                          ) : (
                            <BsFlag size={24} />
                          )}
                        </div>
                      </div>
                      <div className="flex flex-col gap-3 flex-1 md:max-w-[50%]">
                        <div className="text-left">
                          <span className="text-vs-danger font-semibold mr-1">
                            Câu hỏi {i + 1}:{' '}
                          </span>
                          {(() => {
                            if (e.CauHoi.type === 'image') {
                              return (
                                <img
                                  className="w-full"
                                  src={`data:image/png;base64,${e.CauHoi.data}`}
                                />
                              )
                            }
                            return (
                              <span
                                dangerouslySetInnerHTML={{
                                  __html: `${e.CauHoi.data}`,
                                }}
                              />
                            )
                          })()}
                        </div>
                        <div>
                          {
                            // hiển thị ảnh câu hỏi
                            e.listAnhCauHoiCon.map((e1, i1) => {
                              return (
                                <img
                                  className="mx-auto"
                                  key={i1}
                                  src={`data:image/png;base64,${e1}`}
                                />
                              )
                            })
                          }
                        </div>
                      </div>
                      <div className="flex-1 flex flex-col justify-center items-start gap-4">
                        <div className="flex items-start justify-start">
                          <Radio
                            color={
                              isShowAnswer
                                ? e.Dung
                                  ? 'primary'
                                  : 'danger'
                                : 'primary'
                            }
                            disabled={isShowAnswer}
                            align="start"
                            onChange={(IDCauTraLoi) =>
                              handleSelectAnswer(e, IDCauTraLoi)
                            }
                            value={e.IdCauTraLoi1}
                            modelValue={
                              listCauTraLoi[e.Id]
                                ?.TC_SV_OnThi_KetQuaOnTap_IDCauTraLoi
                            }
                            id={e.IdCauTraLoi1}
                          >
                            <label
                              className="cursor-pointer text-left"
                              htmlFor={e.IdCauTraLoi1}
                            >
                              <span className="text-xs mr-2">A.</span>
                              {(() => {
                                if (e.CauTraLoi1.type === 'image') {
                                  return (
                                    <img
                                      className="w-full"
                                      src={`data:image/png;base64,${e.CauTraLoi1.data}`}
                                    />
                                  )
                                }
                                return (
                                  <span
                                    dangerouslySetInnerHTML={{
                                      __html: `${e.CauTraLoi1.data}`,
                                    }}
                                  />
                                )
                              })()}
                              {e.anhCauTraLoi1 !== null ? (
                                <img
                                  className="w-full"
                                  src={`data:image/png;base64,${e.anhCauTraLoi1}`}
                                />
                              ) : null}
                            </label>
                          </Radio>
                        </div>
                        <div className="flex items-start justify-start">
                          <Radio
                            color={
                              isShowAnswer
                                ? e.Dung
                                  ? 'primary'
                                  : 'danger'
                                : 'primary'
                            }
                            disabled={isShowAnswer}
                            align="start"
                            onChange={(IDCauTraLoi) =>
                              handleSelectAnswer(e, IDCauTraLoi)
                            }
                            value={e.IdCauTraLoi2}
                            modelValue={
                              listCauTraLoi[e.Id]
                                ?.TC_SV_OnThi_KetQuaOnTap_IDCauTraLoi
                            }
                            id={e.IdCauTraLoi2}
                          >
                            <label
                              className="cursor-pointer text-left"
                              htmlFor={e.IdCauTraLoi2}
                            >
                              <span className="text-xs mr-2">B.</span>
                              {(() => {
                                if (e.CauTraLoi2.type === 'image') {
                                  return (
                                    <img
                                      className="w-full"
                                      src={`data:image/png;base64,${e.CauTraLoi2.data}`}
                                    />
                                  )
                                }
                                return (
                                  <span
                                    dangerouslySetInnerHTML={{
                                      __html: `${e.CauTraLoi2.data}`,
                                    }}
                                  />
                                )
                              })()}
                              {e.anhCauTraLoi2 !== null ? (
                                <img
                                  className="w-full"
                                  src={`data:image/png;base64,${e.anhCauTraLoi2}`}
                                />
                              ) : null}
                            </label>
                          </Radio>
                        </div>
                        <div className="flex items-start justify-start">
                          <Radio
                            color={
                              isShowAnswer
                                ? e.Dung
                                  ? 'primary'
                                  : 'danger'
                                : 'primary'
                            }
                            disabled={isShowAnswer}
                            align="start"
                            onChange={(IDCauTraLoi) =>
                              handleSelectAnswer(e, IDCauTraLoi)
                            }
                            value={e.IdCauTraLoi3}
                            modelValue={
                              listCauTraLoi[e.Id]
                                ?.TC_SV_OnThi_KetQuaOnTap_IDCauTraLoi
                            }
                            id={e.IdCauTraLoi3}
                          >
                            <label
                              className="cursor-pointer text-left"
                              htmlFor={e.IdCauTraLoi3}
                            >
                              <span className="text-xs mr-2">C.</span>
                              {(() => {
                                if (e.CauTraLoi3.type === 'image') {
                                  return (
                                    <img
                                      className="w-full"
                                      src={`data:image/png;base64,${e.CauTraLoi3.data}`}
                                    />
                                  )
                                }
                                return (
                                  <span
                                    dangerouslySetInnerHTML={{
                                      __html: `${e.CauTraLoi3.data}`,
                                    }}
                                  />
                                )
                              })()}
                              {e.anhCauTraLoi3 !== null ? (
                                <img
                                  className="w-full"
                                  src={`data:image/png;base64,${e.anhCauTraLoi3}`}
                                />
                              ) : null}
                            </label>
                          </Radio>
                        </div>
                        {e.CauTraLoi4.data.length > 0 ? (
                          <div className="flex items-start justify-start">
                            <Radio
                              color={
                                isShowAnswer
                                  ? e.Dung
                                    ? 'primary'
                                    : 'danger'
                                  : 'primary'
                              }
                              disabled={isShowAnswer}
                              align="start"
                              onChange={(IDCauTraLoi) =>
                                handleSelectAnswer(e, IDCauTraLoi)
                              }
                              value={e.IdCauTraLoi4}
                              modelValue={
                                listCauTraLoi[e.Id]
                                  ?.TC_SV_OnThi_KetQuaOnTap_IDCauTraLoi
                              }
                              id={e.IdCauTraLoi4}
                            >
                              <label
                                className="cursor-pointer text-left"
                                htmlFor={e.IdCauTraLoi4}
                              >
                                <span className="text-xs mr-2">D.</span>
                                {(() => {
                                  if (e.CauTraLoi4.type === 'image') {
                                    return (
                                      <img
                                        className="w-full"
                                        src={`data:image/png;base64,${e.CauTraLoi4.data}`}
                                      />
                                    )
                                  }
                                  return (
                                    <span
                                      dangerouslySetInnerHTML={{
                                        __html: `${e.CauTraLoi4.data}`,
                                      }}
                                    />
                                  )
                                })()}
                                {
                                  // hiển thị ảnh câu hỏi
                                  e.anhCauTraLoi4 !== null ? (
                                    <img
                                      className="w-full"
                                      src={`data:image/png;base64,${e.anhCauTraLoi4}`}
                                    />
                                  ) : null
                                }
                              </label>
                            </Radio>
                          </div>
                        ) : null}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div>Không có câu hỏi</div>
          )}
        </div>
        {totalPage > 1 ? (
          <div className="flex justify-between items-center">
            <Button
              disabled={currPage == 1}
              onClick={() => handleChangePage(-1)}
            >
              Trang trước
            </Button>
            <Button
              disabled={currPage >= totalPage}
              onClick={() => handleChangePage(1)}
            >
              Trang sau
            </Button>
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default DanhSachDeThi
