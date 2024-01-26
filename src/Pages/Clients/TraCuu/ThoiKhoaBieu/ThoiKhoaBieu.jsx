import { useEffect, useMemo, useRef, useState } from 'react'
import {
  getLichHocSinhVien,
  getLichThiSinhVien,
} from '@/Apis/TraCuu/apiLichHoc'
import { Radio } from '@/Components/Base/Radio/Radio'
import LichBieu from '@/Components/TraCuu/ThoiKhoaBieu/LichBieu/LichBieu'
import CommonLayout from '@/Layouts/Common/CommonLayout'
import { DataSinhVien } from '@/Services/Utils/dataSinhVien'
import { TYPE_LICH } from './constants'
import { transformKeys } from '@/Services/Utils/objectUtils'
import { compareWeekInYear, dayjs } from '@/Services/Utils/dayjs'
import Datepicker from '@/Components/Base/Datepicker/Datepicker'
import Button from '@/Components/Base/Button/Button'
import ThuTrongTuan from '@/Components/TraCuu/ThoiKhoaBieu/ThuTrongTuan/ThuTrongTuan'
import { buildTableRow, getDate } from './utils'

const LICH_HOC_PREFIX = 'TC_SV_KetQuaHocTap_LichHocSinhVien_'
const LICH_THI_PREFIX = 'TC_SV_KetQuaHocTap_LichThiSinhVien_'
const DATE_ACTIONS = {
  CURRENT_WEEK: 'current_week',
  PREV_WEEK: 'prev_week',
  NEXT_WEEK: 'next_week',
}
const CA_HOC = {
  CaSang: 'Sáng',
  CaChieu: 'Chiều',
}

function ThoiKhoaBieu() {
  const lichCached = useRef(new Map())

  const [lichHoc, setLichHoc] = useState([])
  const [lichThi, setLichThi] = useState([])
  const [loaiLich, setLoaiLich] = useState(TYPE_LICH.ALL)

  const [currentDate, setCurrentDate] = useState(dayjs('2023/05/14'))

  const dataSV = DataSinhVien()

  const lichHocTheoTuan = useMemo(() => {
    return lichHoc.filter((e) => compareWeekInYear(e.NgayBatDau, currentDate))
  }, [lichHoc, currentDate])

  const lichThiTheoTuan = useMemo(() => {
    return lichThi.filter((e) => compareWeekInYear(e.NgayThi, currentDate))
  }, [lichThi, currentDate])

  const tatCaLichTheoTuan = useMemo(() => {
    let list = []
    if (loaiLich === TYPE_LICH.ALL) {
      list = [...lichHocTheoTuan, ...lichThiTheoTuan]
    }

    if (loaiLich == TYPE_LICH.LichHoc) {
      list = lichHocTheoTuan
    }

    if (loaiLich == TYPE_LICH.LichThi) {
      list = lichThiTheoTuan
    }

    return list.sort((a, b) => getDate(a).isBefore(getDate(b)))
  }, [lichHocTheoTuan, lichThiTheoTuan, loaiLich])

  const lichCaSang = useMemo(() => {
    const listLich = tatCaLichTheoTuan.filter(
      (e) => (e.CaHoc || e.CaThi) === CA_HOC.CaSang,
    )

    return buildTableRow(listLich)
  }, [tatCaLichTheoTuan])

  const lichCaChieu = useMemo(() => {
    const listLich = tatCaLichTheoTuan.filter(
      (e) => (e.CaHoc || e.CaThi) === CA_HOC.CaChieu,
    )

    return buildTableRow(listLich)
  }, [tatCaLichTheoTuan])

  const handleDateAction = (action) => {
    switch (action) {
      case DATE_ACTIONS.CURRENT_WEEK: {
        setCurrentDate(dayjs())
        break
      }
      case DATE_ACTIONS.PREV_WEEK: {
        setCurrentDate(currentDate.date(currentDate.date() - 7))
        break
      }
      case DATE_ACTIONS.NEXT_WEEK: {
        setCurrentDate(currentDate.date(currentDate.date() + 7))
        break
      }
    }
  }

  const handleChangeLoaiLich = (_loaiLich) => {
    setLoaiLich(_loaiLich)
  }

  useEffect(() => {
    const getLichThi = async () => {
      if (lichCached.current.has(TYPE_LICH.LichThi)) {
        setLichThi(lichCached.current.get(TYPE_LICH.LichThi))
        return
      }

      const res = await getLichThiSinhVien({
        MaSinhVien: dataSV.MaSinhVien,
      })

      const listLichThi = res.data?.body || []

      const lichThiWithoutPrefixKey = listLichThi.map((e) =>
        transformKeys(e, (key) => {
          return `${key}`.replace(LICH_THI_PREFIX, '')
        }),
      )
      setLichThi(lichThiWithoutPrefixKey)

      lichCached.current.set(TYPE_LICH.LichThi, lichThiWithoutPrefixKey)
    }

    const getLichHoc = async () => {
      if (lichCached.current.has(TYPE_LICH.LichHoc)) {
        setLichHoc(lichCached.current.get(TYPE_LICH.LichHoc))
        return
      }

      const res = await getLichHocSinhVien({
        MaSinhVien: dataSV.MaSinhVien,
      })

      const listLichHoc = res.data?.body || []

      const lichHocWithoutPrefixKey = listLichHoc.map((e) =>
        transformKeys(e, (key) => {
          return `${key}`.replace(LICH_HOC_PREFIX, '')
        }),
      )
      setLichHoc(lichHocWithoutPrefixKey)

      lichCached.current.set(TYPE_LICH.LichHoc, lichHocWithoutPrefixKey)
    }

    const getLich = () => {
      if (TYPE_LICH.LichHoc) getLichHoc()
      if (TYPE_LICH.LichThi) getLichThi()
      if (TYPE_LICH.ALL) {
        getLichHoc()
        getLichThi()
      }
    }

    getLich()
  }, [loaiLich])

  return (
    <>
      <CommonLayout>
        <div className="text-center text-uneti-primary text-2xl font-semibold uppercase">
          Tra cứ lịch học / lịch thi
        </div>

        {/* options */}
        <div className="flex gap-6 items-center my-6 justify-end">
          <div className="flex items-center gap-2">
            <Radio
              modelValue={loaiLich}
              name="loai-lich"
              onChange={handleChangeLoaiLich}
              value={TYPE_LICH.ALL}
            >
              Tất cả
            </Radio>
            <Radio
              modelValue={loaiLich}
              name="loai-lich"
              onChange={handleChangeLoaiLich}
              value={TYPE_LICH.LichHoc}
            >
              Lịch học
            </Radio>
            <Radio
              modelValue={loaiLich}
              name="loai-lich"
              onChange={handleChangeLoaiLich}
              value={TYPE_LICH.LichThi}
            >
              Lịch thi
            </Radio>
          </div>
          <div className="h-[20px] w-[2px] rounded-lg bg-slate-200" />
          <div className="flex items-center gap-2">
            <Datepicker
              modelValue={currentDate}
              onUpdateModelValue={setCurrentDate}
            />
            <Button onClick={() => handleDateAction(DATE_ACTIONS.PREV_WEEK)}>
              Tuần trước
            </Button>
            <Button onClick={() => handleDateAction(DATE_ACTIONS.NEXT_WEEK)}>
              Tuần sau
            </Button>
            <Button onClick={() => handleDateAction(DATE_ACTIONS.CURRENT_WEEK)}>
              Hôm nay
            </Button>
            <Button onClick={console.log}>In lịch</Button>
          </div>
        </div>

        {/* List lich hoc */}
        <div className="overflow-x-scroll border border-uneti-primary border-opacity-30 rounded-[24px]">
          <div>
            <ThuTrongTuan currentDate={currentDate} />
          </div>
          <div>
            <div className="flex min-h-[300px]">
              <div className="flex flex-col w-60">
                <div className="w-[100px] font-semibold flex justify-center items-center h-full border-b border-r border-uneti-primary border-opacity-30">
                  Ca sáng
                </div>
              </div>
              {lichCaSang.map((e, i) => {
                return (
                  <div
                    className="flex flex-col w-60 min-w-[220px] py-2 px-2 border-b border-r border-uneti-primary border-opacity-30 last:border-r-0"
                    key={`s-col-${i}`}
                  >
                    <div className="flex flex-col gap-4">
                      {e.length
                        ? e.map((x) => <LichBieu key={x.MaLopHocPhan} {...x} />)
                        : null}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
          <div>
            <div className="flex min-h-[300px]">
              <div className="flex flex-col w-60">
                <div className="w-[100px] font-semibold flex justify-center items-center h-full border-b border-r border-uneti-primary border-opacity-30">
                  Ca chiều
                </div>
              </div>
              {lichCaChieu.map((e, i) => {
                return (
                  <div
                    className="flex flex-col w-60 min-w-[220px] py-2 px-2 border-b border-r border-uneti-primary border-opacity-30 last:border-r-0"
                    key={`c-col-${i}`}
                  >
                    <div className="flex flex-col gap-4">
                      {e.length
                        ? e.map((x) => <LichBieu key={x.MaLopHocPhan} {...x} />)
                        : null}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </CommonLayout>
    </>
  )
}

export default ThoiKhoaBieu
