import { flatten, isArray, isEqual, isNil, keys, values } from 'lodash-unified'
import { useMemo, useRef } from 'react'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import {
  getAllDeThiThiThu,
  getAllMonHocThiThu,
  getTongSoTrangTheoDe,
  postDanhSachOnThi,
  postKetQuaOnThi,
} from '@/Apis/HocTap/apiOnLuyenThiThu'
import { getCauHoiTheoDe } from '@/Apis/HocTap/apiOnLuyenTracNghiem'

import Col from '@/Components/Base/Col/Col'
import Row from '@/Components/Base/Row/Row'
import CauHoi from '@/Components/HocTap/OnTap/CauHoi'
import XacNhanNopBai from '@/Components/HocTap/Promt/XacNhanNopBai'
import { OnTapContext } from '@/Services/Tokens'
import { DataSinhVien } from '@/Services/Utils/dataSinhVien'
import { convertQuestionToHtml } from '../../../utils'
import TimePause from '@/Components/Base/Icons/TimePause'
import Icon from '@/Components/Base/Icon/Icon'
import TimePlay from '@/Components/Base/Icons/TimePlay'
import Swal from 'sweetalert2'
import { retries } from '@/Services/Utils/requestUtils'
import Button from '@/Components/Base/Button/Button'
import Loading from '@/Components/Loading/Loading'
import { FILTER_ACTIONS } from '../../constants'
import { transformObjKey } from '@/Services/Utils/dataSubmitUtils'
import CauHoiCha from '@/Components/HocTap/OnTap/CauHoiCha'
import { useNamespace } from '@/Services/Hooks'

import './DeThi.scss'

const DANH_SACH_ON_THI_PREFIX = 'TC_SV_OnThi_DanhSachOnThi_'
const DANH_SACH_ON_THI_NGUON_TIEP_NHAN = {
  WEB: '1',
}
function DeThi() {
  const ns = useNamespace('de-thi')
  const STT = useRef(1)
  const uLocation = useLocation()
  const dataSV = DataSinhVien()

  const INTERVAL_ID = useRef(null)

  const [isMounted, setIsMounted] = useState(false)
  const navigate = useNavigate()

  const maMonHoc = uLocation.pathname.split('/').at(-3).toString()
  const maDe = uLocation.pathname.split('/').at(-1).toString()

  const [monHoc, setMonHoc] = useState()
  const [deThi, setDeThi] = useState()
  const [questions, setQuestions] = useState([])
  /**
   * @type {Object<IDCauHoi, IDCauTraLoi>}
   */
  const [answers, setAnswers] = useState({})
  const [questionsTick, setQuestionsTick] = useState({})
  const [filterState, setFilterState] = useState(FILTER_ACTIONS.ALL)

  // Page
  const [selfTotalPage, setSelfTotalPage] = useState(1)
  const [totalPage, setTotalPage] = useState(1)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize] = useState(2)
  const [pageLoaded, setPageLoaded] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [pageJumpByBtn, setPageJumpByBtn] = useState(false)

  // timer is calc by seconds
  const [timeCountDown, setTimeCountDown] = useState(0)
  const [timeUsed, setTimeUsed] = useState(0)
  const [isFinished, setIsFinished] = useState(false)

  // audio playing
  /**
   * @type {
   *  Record<string, {
   *    SoLanNghe: number
   *    src: string
   *  }>[]
   * }
   */

  const [listAudio, setListAudio] = useState({})
  const [audioPlaying, setAudioPlaying] = useState(null)

  /**
   * convert timeCountDown seconds to minutes and seconds like MM:SS
   * @returns {string}
   */
  const convertTime = useMemo(() => {
    const minutes = Math.floor(timeCountDown / 60)
    const seconds = timeCountDown % 60
    return minutes + ':' + (seconds < 10 ? '0' + seconds : seconds)
  }, [timeCountDown])

  const correctAnswers = useMemo(
    () =>
      flatten(questions).reduce((res, curr) => {
        if (answers[curr.ID]) {
          if (answers[curr.ID] === curr.IDCauTraLoiDung) {
            res.push(curr)
          }
        }

        return res
      }, []),
    [isFinished, questions],
  )

  const questionsFiltered = useMemo(() => {
    switch (filterState) {
      case FILTER_ACTIONS.ChuaTraLoi:
        return questions.reduce((res, curr) => {
          if (isArray(curr)) {
            const notAnswered = curr.filter((question) => !answers[question.ID])
            if (notAnswered.length) {
              res.push(notAnswered)
            }
          } else {
            if (!answers[curr.ID]) {
              res.push(curr)
            }
          }
          return res
        }, [])

      case FILTER_ACTIONS.DangPhanVan:
        return questions.reduce((res, curr) => {
          if (isArray(curr)) {
            const questionsTicked = curr.filter(
              (question) => questionsTick[question.ID],
            )
            if (questionsTicked.length) {
              res.push(questionsTicked)
            }
          } else {
            if (questionsTick[curr.ID]) {
              res.push(curr)
            }
          }
          return res
        }, [])

      case FILTER_ACTIONS.ALL:
      default:
        return questions
    }
  }, [filterState, questions])

  const questionsPaginated = useMemo(() => {
    return questionsFiltered.slice(
      (currentPage - 1) * pageSize,
      currentPage * pageSize,
    )
  }, [currentPage, questionsFiltered])

  const getScore = useMemo(() => {
    if (!deThi?.ThangDiemQuyDoi) return 0

    const score = (
      (correctAnswers.length / deThi.TongCauHoi) *
      deThi.ThangDiemQuyDoi
    ).toFixed(2)

    return score
  }, [isFinished])

  async function handleXacNhanNopBai() {
    // // query all questions
    for (let page = 1; page <= totalPage; page++) {
      getQuestions(page)
    }

    setFilterState(FILTER_ACTIONS.ALL)
    setIsFinished(true)
    clearInterval(INTERVAL_ID.current)

    setTimeUsed(() => deThi.ThoiGianThi * 60 - timeCountDown)
    setTimeCountDown(0)
  }

  async function handlePostData() {
    if (keys(answers).length === 0) {
      return
    }

    // post danh sach on thi
    postDanhSachOnThi(
      transformObjKey(
        {
          IDDeThi: `${deThi.Id}`,
          IDSinhVien: `${dataSV.IdSinhVien}`,
          ThoiGianPhut: `${Number(timeUsed / 60).toFixed(2)}`,
          Diem: `${getScore}`,
          NguonTiepNhan: DANH_SACH_ON_THI_NGUON_TIEP_NHAN.WEB,
        },
        DANH_SACH_ON_THI_PREFIX,
      ),
    )
    // post ket qua on thi
    postKetQuaOnThi(
      flatten(questions)
        .filter((question) => answers[question.ID])
        .map((question) =>
          transformObjKey(
            {
              IDDeThi: `${deThi.Id}`,
              IDSinhVien: `${dataSV.IdSinhVien}`,
              IDCauHoi: `${question.ID}`,
              IDCauTraLoi: `${answers[question.ID]}`,
              Dung: `${correctAnswers.includes(question)}`,
            },
            DANH_SACH_ON_THI_PREFIX,
          ),
        ),
    )
  }

  function handleFilter(e) {
    const value = e.target.value

    setFilterState(value)
  }

  /**
   *
   * @param {Number} IDCauHoi
   * @param {Number} IDCauTraLoi
   * @returns
   */
  function handleChangeAnswer(IDCauHoi, IDCauTraLoi) {
    if (isFinished) {
      Swal.fire({
        title: 'Thông báo',
        icon: 'error',
        text: 'Đã hết giờ làm bài',
      })

      return
    }
    setAnswers({
      ...answers,
      [IDCauHoi]: IDCauTraLoi,
    })
  }

  function handleChangeCurrentPage(value) {
    if (value === 'PREV') {
      if (currentPage > 1) {
        setCurrentPage((prev) => prev - 1)
      }
    }
    if (value === 'NEXT') {
      if (currentPage < selfTotalPage) {
        setCurrentPage((prev) => prev + 1)
      }
    }
    setPageJumpByBtn(true)
  }

  function questionStatus(question) {
    if (isFinished) {
      if (question.IDCauTraLoiDung === answers[question.ID]) {
        return 'bg-vs-success !text-white !hover:bg-vs-success'
      }
      return 'bg-vs-danger !text-white !hover:bg-vs-danger'
    }

    if (filterState === FILTER_ACTIONS.DangPhanVan) {
      if (!questionsTick[question.ID]) {
        return 'hidden'
      }
    }
    if (filterState === FILTER_ACTIONS.ChuaTraLoi) {
      if (answers[question.ID]) {
        return 'hidden'
      }
    }

    if (questionsTick[question.ID]) {
      return 'bg-vs-warn text-white'
    } else if (answers[question.ID]) {
      return 'bg-uneti-primary text-white'
    }
    return 'hover:bg-uneti-primary hover:bg-opacity-10 '
  }

  function getPageOfQuestion(question) {
    for (let i = 0; i < selfTotalPage; i++) {
      const _questions = questionsFiltered.slice(
        i * pageSize,
        (i + 1) * pageSize,
      )

      if (
        _questions.some((q) =>
          isArray(q) ? q.includes(question) : isEqual(q, question),
        )
      ) {
        return i + 1
      }
    }
  }

  async function handleGotoQuestion(question) {
    // get page of question
    const page = getPageOfQuestion(question)
    if (page !== currentPage) {
      setCurrentPage(page)

      // await next tick dom update, sleep 100ms
      await new Promise((resolve) => setTimeout(resolve, 100))
    }

    // handle goto dom by ID
    const IDCauHoi = question.ID
    const el = document.getElementById(IDCauHoi)
    if (!el) return

    const headerOffset = 250
    const elementPosition = el.getBoundingClientRect().top
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    })

    await new Promise((resolve) => setTimeout(resolve, 500))
    el.style.transform = 'scale(1.02)'
    el.classList.add('border-uneti-primary')

    setTimeout(() => {
      el.style.transform = 'none'
    }, 400)

    setTimeout(() => {
      el.classList.remove('border-uneti-primary')
    }, 1000)
  }

  useEffect(() => {
    if (isFinished && pageLoaded.length === totalPage) {
      handlePostData()
    }
  }, [deThi, isFinished, pageLoaded])
  useEffect(() => {
    if (filterState === FILTER_ACTIONS.ALL) {
      setSelfTotalPage(totalPage)
    } else setSelfTotalPage(Math.ceil(questionsFiltered.length / pageSize))

    if (currentPage > selfTotalPage) {
      setCurrentPage(1)
    }
  }, [questionsFiltered])
  useEffect(() => {
    const getMonThi = async () => {
      const listMonThi = await getAllMonHocThiThu(dataSV.MaSinhVien)
      const _monHoc = listMonThi?.data?.body.find(
        (mh) => mh.MaMonHoc === maMonHoc,
      )
      if (!_monHoc) {
        navigate('/hoc-tap/on-luyen/thi-thu')
      }
      setMonHoc(_monHoc)
    }
    const getDeThi = async () => {
      const _listDeThi = await getAllDeThiThiThu(maMonHoc)
      const _deThi = _listDeThi.data.body.find((e) => e.MaDeThi == maDe)
      if (!_deThi) {
        navigate('/hoc-tap/on-luyen/thi-thu')
      }
      setDeThi(_deThi)
    }

    getMonThi()
    getDeThi()
  }, [maMonHoc, maDe])
  useEffect(() => {
    if (timeCountDown < 0) {
      Swal.fire({
        title: 'Thông báo',
        icon: 'error',
        text: 'Đã hết thời gian làm bài',
      })
      handleXacNhanNopBai()
    }
  }, [timeCountDown])
  function getQuestions(currentPage) {
    if (!deThi || !currentPage || pageLoaded.includes(currentPage)) return

    retries(async () => {
      setIsLoading(true)
      const res = await getCauHoiTheoDe({
        IDDeThi: deThi.Id,
        SoCauTrenTrang: pageSize,
        SoTrang: currentPage,
      })

      let data = res.data.body.reduce(
        (res, curr) => {
          const key = curr.IDCauHoiCha ?? 'NoParent'
          if (isNil(res[key])) {
            res[key] = []
          }
          res[key].push(curr)
          return res
        },
        {
          NoParent: [],
        },
      )

      // remove NoParent and put to root, and put other children to root
      const questionsNoParent = data.NoParent
      delete data.NoParent

      data = [...values(data), ...questionsNoParent]

      let questionsMapped = []
      for (let i = 0; i < data.length; i++) {
        const _questions = data[i]

        if (_questions.length) {
          questionsMapped.push([])
          for (let j = 0; j < _questions.length; j++) {
            const question = await convertQuestionToHtml(_questions[j])
            question.STT = STT.current++
            questionsMapped[i].push(question)
          }
        } else {
          const question = await convertQuestionToHtml(_questions)
          question.STT = STT.current++

          questionsMapped.push(question)
        }
      }

      // sort questions by PART

      setQuestions((prev) => [...prev, ...questionsMapped])

      setIsLoading(false)
      setPageLoaded((prev) => [...prev, currentPage])
      setIsMounted(true)
    })
  }
  useEffect(() => {
    setAudioPlaying(null)
    if (pageJumpByBtn) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
      setPageJumpByBtn(false)
    }
    if (filterState === FILTER_ACTIONS.ALL) {
      getQuestions(currentPage)
    }
  }, [currentPage, deThi, filterState])
  // get total page
  useEffect(() => {
    const getTongSoTrang = async () => {
      if (deThi) {
        const _tongSoTrangResponse = await getTongSoTrangTheoDe({
          IDDeThi: deThi.Id,
          SoCauTrenTrang: pageSize,
        })

        setTotalPage(_tongSoTrangResponse.data.body[0].TongSoTrang)
        setSelfTotalPage(_tongSoTrangResponse.data.body[0].TongSoTrang)
      }
    }

    getTongSoTrang()
  }, [deThi, pageSize])
  useEffect(() => {
    if (!deThi) return
    // Time count down must be in seconds
    setTimeCountDown(deThi.ThoiGianThi * 60)
  }, [deThi])
  useEffect(() => {
    if (!isMounted) return

    INTERVAL_ID.current = setInterval(() => {
      setTimeCountDown((prev) => {
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(INTERVAL_ID.current)
  }, [isMounted])

  return (
    <OnTapContext.Provider
      value={{
        selected: answers,
        handleSelected: handleChangeAnswer,
        audioPlaying,
        setAudioPlaying,
        questionsTick,
        setQuestionsTick,
        listAudio,
        setListAudio,
      }}
    >
      <div className="flex justify-center items-center flex-col gap-4 rounded-2xl bg-white p-4">
        <h3 className="text-uneti-primary text-center font-semibold text-2xl">
          {monHoc?.TenMonHoc}
        </h3>
        <span className="text-uneti-primary text-sm">
          Mã Môn Học: {monHoc?.MaMonHoc}
        </span>
      </div>

      <div className="mt-6">
        <Row gutter={30}>
          <Col span={12} md={9}>
            {isMounted ? (
              <div className="z-1">
                <div
                  className={`flex flex-col gap-3 md:gap-7 rounded-[26px] ${isFinished ? 'pointer-events-none opacity-90' : ''}`}
                >
                  {questionsPaginated.length ? (
                    questionsPaginated.map((question, rootIndex) => {
                      if (question?.length > 0) {
                        return (
                          <CauHoiCha
                            key={`question-parent-${rootIndex}`}
                            questions={question}
                            disabled={isFinished}
                          />
                        )
                      }

                      return (
                        <CauHoi
                          key={`n-question-${rootIndex}`}
                          {...question}
                          disabled={isFinished}
                        />
                      )
                    })
                  ) : isLoading ? (
                    <Loading />
                  ) : (
                    <div>Không có câu hỏi</div>
                  )}
                </div>

                {questionsPaginated.length ? (
                  <div className="flex gap-2 my-5 justify-between">
                    <Button
                      disabled={currentPage == 1 || audioPlaying != null}
                      onClick={() => handleChangeCurrentPage('PREV')}
                    >
                      Trang trước
                    </Button>
                    <Button
                      disabled={
                        currentPage == selfTotalPage || audioPlaying != null
                      }
                      onClick={() => handleChangeCurrentPage('NEXT')}
                    >
                      Trang sau
                    </Button>
                  </div>
                ) : null}
              </div>
            ) : (
              <div className="flex items-center justify-center">
                <Loading />
              </div>
            )}
          </Col>
          <Col span={12} md={3}>
            {deThi ? (
              <div className={ns.em('questions', 'viewlist')}>
                <div className={ns.em('questions', 'heading')}>
                  <h3>
                    {isFinished ? (
                      <div>
                        <div className="flex flex-col md:flex-row items-center justify-center mb-4 md:mb-0 gap-0 md:gap-1">
                          <p className="text-center text-xs md:text-lg">
                            Điểm của bạn:{' '}
                          </p>{' '}
                          <p
                            className={`font-semibold text-center text-xs md:text-lg`}
                          >
                            {getScore}
                          </p>
                        </div>

                        <div className="flex items-center gap-1">
                          <p>Số câu đúng: </p>{' '}
                          <div className="flex gap-2">
                            <p className="font-semibold">
                              {correctAnswers.length}/{deThi.TongCauHoi}
                            </p>
                            <p>
                              (
                              {(
                                (correctAnswers.length / deThi.TongCauHoi) *
                                100
                              ).toFixed(1)}
                              %)
                            </p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <span className="text-center text-xs md:text-lg">
                        Thời gian còn lại
                      </span>
                    )}
                  </h3>

                  <div className="shadow-sm text-white flex items-center gap-1">
                    <Icon size={30}>
                      {isFinished ? <TimePlay /> : <TimePause />}
                    </Icon>
                    <span>{convertTime}</span>
                  </div>
                </div>

                <div className={ns.em('questions', 'body')}>
                  <div className="max-h-[36dvh] overflow-y-auto flex flex-wrap gap-2 justify-evenly">
                    {flatten(questions).map((e) => {
                      return (
                        <div
                          key={e.STT}
                          className={`${questionStatus(e)} animate__animated animate__zoomInUp animate_faster active:scale-95 transition-all w-8 h-8 border rounded-full cursor-pointer select-none flex items-center justify-center text-opacity-80`}
                          onClick={() => handleGotoQuestion(e)}
                        >
                          {e.STT}
                        </div>
                      )
                    })}
                  </div>

                  {!isFinished ? (
                    <>
                      <div className="pl-2 mt-6">
                        Đã trả lời: {keys(answers).length}/
                        {flatten(questions).length}
                      </div>

                      <div className="mt-4 p-1">
                        <select
                          onChange={handleFilter}
                          className="p-2 pl-3 outline-none rounded-xl border w-full"
                        >
                          <option value={FILTER_ACTIONS.ALL}>Tất cả</option>
                          <option value={FILTER_ACTIONS.ChuaTraLoi}>
                            Chưa trả lời
                          </option>
                          <option value={FILTER_ACTIONS.DangPhanVan}>
                            Đang phân vân
                          </option>
                        </select>
                      </div>
                    </>
                  ) : null}
                </div>

                <div className={ns.em('questions', 'footer')}>
                  {isFinished ? (
                    <Button onClick={() => window.location.reload()}>
                      Làm lại lần nữa?
                    </Button>
                  ) : (
                    <XacNhanNopBai
                      TenMonHoc={monHoc?.TenMonHoc}
                      DaLam={keys(answers).length}
                      TongCauHoi={deThi.TongCauHoi}
                      onConfirm={handleXacNhanNopBai}
                    />
                  )}
                </div>
              </div>
            ) : null}
          </Col>
        </Row>
      </div>
    </OnTapContext.Provider>
  )
}

export default DeThi
