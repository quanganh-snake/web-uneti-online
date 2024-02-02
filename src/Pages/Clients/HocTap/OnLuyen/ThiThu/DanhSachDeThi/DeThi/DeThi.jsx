import { Pagination } from '@mui/material'
import {
  flatten,
  isArray,
  isNil,
  keys,
  mapValues,
  toArray,
  values,
} from 'lodash-unified'
import { useMemo, useRef } from 'react'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import {
  getAllDeThiThiThu,
  getAllMonHocThiThu,
} from '@/Apis/HocTap/apiOnLuyenThiThu'
import {
  getCauHoiTheoDe,
  getTongSoTrangTheoDe,
} from '@/Apis/HocTap/apiOnLuyenTracNghiem'

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
import { useTimeout } from '@/Services/Hooks/useTimeout'
import { retries } from '@/Services/Utils/requestUtils'
import Button from '@/Components/Base/Button/Button'
import Loading from '@/Components/Loading/Loading'
import GroupCauHoi from '@/Components/HocTap/OnTap/GroupCauHoi'
import { FILTER_ACTIONS } from '../../constants'

function DeThi() {
  const questionsCached = useRef(new Map())
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
  const [filterState, setFilterState] = useState(null)

  // Page
  const [totalPage, setTotalPage] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  // timer is calc by seconds
  const [timeCountDown, setTimeCountDown] = useState(0)
  const [isFinished, setIsFinished] = useState(false)

  // audio playing
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
    if (!deThi?.ThangDiem) return

    const score = (
      (correctAnswers.length / flatten(questions).length) *
      deThi.ThangDiem
    ).toFixed(2)

    return score
  }, [isFinished])

  function handleXacNhanNopBai() {
    console.log('post Nộp bài')

    setIsFinished(true)
    setFilterState(FILTER_ACTIONS.ALL)
    clearInterval(INTERVAL_ID.current)

    if (timeCountDown != 0) {
      setTimeCountDown(0)
    }
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

  function handleChangeCurrentPage(event, value) {
    setCurrentPage(value)
  }

  function questionStatus(question) {
    if (isFinished) {
      if (question.IDCauTraLoiDung === answers[question.ID]) {
        return 'bg-vs-success !text-white !hover:bg-vs-success'
      }
      return 'bg-vs-danger !text-white !hover:bg-vs-danger'
    }

    if (!!questionsTick[question.ID]) {
      return 'bg-vs-warn text-white'
    } else if (answers[question.ID]) {
      return 'bg-uneti-primary text-white'
    }
    return 'hover:bg-uneti-primary hover:bg-opacity-10 '
  }

  function getPageOfQuestion(question) {
    for (let i = 0; i < totalPage; i++) {
      const _questions = questionsFiltered.slice(
        i * pageSize,
        (i + 1) * pageSize,
      )

      if (_questions.includes(question)) {
        return i + 1
      }
    }
  }

  async function handleGotoQuestion(question) {
    // get page of question
    const page = getPageOfQuestion(question)
    console.log(page, currentPage)
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
    setTotalPage(Math.ceil(questionsFiltered.length / pageSize))

    if (currentPage > totalPage) {
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
        navigate('/hoctap/onluyen/thithu')
      }
      setMonHoc(_monHoc)
    }
    const getDeThi = async () => {
      const _listDeThi = await getAllDeThiThiThu(maMonHoc)
      const _deThi = _listDeThi.data.body.find((e) => e.MaDeThi == maDe)
      if (!_deThi) {
        navigate('/hoctap/onluyen/thithu')
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

  useEffect(() => {
    if (!deThi) return

    // Time count down must be in seconds
    setTimeCountDown(deThi.ThoiGianThi * 60)

    async function getTotalQuestions() {
      if (!deThi) return

      await retries(async () => {
        const res = await getCauHoiTheoDe({
          IDDeThi: deThi.Id,
          SoCauTrenTrang: deThi.TongCauHoi,
          SoTrang: 1,
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

        let STT = 1
        let questionsMapped = []
        for (let i = 0; i < data.length; i++) {
          const _questions = data[i]

          if (_questions.length) {
            questionsMapped.push([])
            for (let j = 0; j < _questions.length; j++) {
              const question = await convertQuestionToHtml(_questions[j])
              question.STT = STT++
              questionsMapped[i].push(question)
            }
          } else {
            const question = await convertQuestionToHtml(_questions)
            question.STT = STT++

            questionsMapped.push(question)
          }
        }

        setQuestions(questionsMapped)

        setIsMounted(true)
      })
    }

    getTotalQuestions()
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
                  className={`flex flex-col gap-7 p-6 bg-white rounded-[26px] shadow-sm ${isFinished ? 'pointer-events-none opacity-90' : ''}`}
                >
                  {questionsPaginated.length ? (
                    questionsPaginated.map((question, rootIndex) => {
                      if (question?.length > 0) {
                        return (
                          <div
                            id={question[0].IDCauHoiCha}
                            key={`question-parent-${rootIndex}`}
                            className="p-6 rounded-[26px] border-2 border-slate-200 flex flex-col gap-4 transition-all hover:border-opacity-90"
                          >
                            <div className="flex items-start gap-2 flex-wrap">
                              <div
                                className="flex-1 mt-[2px]"
                                dangerouslySetInnerHTML={{
                                  __html: `<div>${question[0].CauHoiCha}</div>`,
                                }}
                              />
                            </div>

                            {question.map((child, i) => (
                              <CauHoi
                                key={`p-question-${rootIndex}-${i}`}
                                {...child}
                                disabled={isFinished}
                                isFinished={isFinished}
                              />
                            ))}
                          </div>
                        )
                      }

                      return (
                        <CauHoi
                          key={`n-question-${rootIndex}`}
                          {...question}
                          disabled={isFinished}
                          isFinished={isFinished}
                        />
                      )
                    })
                  ) : (
                    <div>Không có câu hỏi</div>
                  )}
                </div>

                {questionsPaginated.length ? (
                  <div className="p-4 bg-white my-5 rounded-xl shadow-sm">
                    <Pagination
                      count={totalPage}
                      page={currentPage}
                      onChange={handleChangeCurrentPage}
                      shape="rounded"
                    />
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
              <div className="z-100 border shadow-sm sticky top-28 bg-vs-theme-layout rounded-2xl">
                <div className="flex flex-col gap-3 items-center bg-uneti-primary-lighter text-white rounded-tr-2xl rounded-tl-2xl p-3">
                  <h3>
                    {isFinished ? (
                      <div>
                        <div className="flex items-center gap-1">
                          <p>Điểm của bạn: </p>{' '}
                          <p className={`font-semibold`}>{getScore}</p>
                        </div>

                        <div className="flex items-center gap-1">
                          <p>Số câu đúng: </p>{' '}
                          <div className="flex gap-2">
                            <p className="font-semibold">
                              {correctAnswers.length}/
                              {flatten(questions).length}
                            </p>
                            <p>
                              (
                              {(
                                (correctAnswers.length /
                                  flatten(questions).length) *
                                100
                              ).toFixed(1)}
                              %)
                            </p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      'Thời gian còn lại'
                    )}
                  </h3>

                  <div className="text-white flex items-center gap-1">
                    <Icon size={30}>
                      {isFinished ? <TimePlay /> : <TimePause />}
                    </Icon>
                    <span>{convertTime}</span>
                  </div>
                </div>

                <div className="p-2">
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

                <div className="p-3">
                  {isFinished ? (
                    <Button onClick={() => window.location.reload()}>
                      Làm lại lần nữa?
                    </Button>
                  ) : (
                    <XacNhanNopBai
                      TenMonHoc={monHoc?.TenMonHoc}
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
