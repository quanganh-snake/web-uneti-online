import { Pagination } from '@mui/material'
import { flatten, isNil, keys } from 'lodash-unified'
import { useMemo, useRef } from 'react'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

// import {
//   getAllDeThiThiThu,
//   getAllMonHocThiThu,
// } from '@/Apis/HocTap/apiOnLuyenThiThu'
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

const DETHI_QUESTION_CACHED = new Map()
function DeThi() {
  const questionsCached = useRef(new Map())
  const uLocation = useLocation()
  const dataSV = DataSinhVien()

  const INTERVAL_ID = useRef(null)

  const [isMounted, setIsMounted] = useState(false)
  // const navigate = useNavigate()

  // const maMonHoc = uLocation.pathname.split('/').at(-3).toString()
  // const maDe = uLocation.pathname.split('/').at(-1).toString()

  const [monHoc, setMonHoc] = useState({
    TenMonHoc: 'Tiếng Anh',
    MaMonHoc: '510201014',
  })
  const [deThi, setDeThi] = useState({
    Id: '413',
    ThoiGian: 1,
    TongSoCau: 94,
    ThangDiem: 10,
  })

  const [questions, setQuestions] = useState([])
  /**
   * @type {Object<IDCauHoi, IDCauTraLoi>}
   */
  const [answers, setAnswers] = useState({})

  // Page
  const [totalPage, setTotalPage] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize] = useState(10)

  // timer is calc by seconds
  const [timeCountDown, setTimeCountDown] = useState(deThi.ThoiGian * 60)
  const [isFinished, setIsFinished] = useState(false)

  const keyQuestionCached = (currentPage) =>
    JSON.stringify({ IDDeThi: deThi.Id, currentPage, pageSize })

  const questionsGroupByParent = useMemo(() => {
    const obj = questions.reduce((res, curr) => {
      const key = curr.IDCauHoiCha ?? 'NoParent'

      if (isNil(res[key])) {
        res[key] = []
      }

      res[key].push(curr)

      return res
    }, {})

    return Object.keys(obj).map((key) => {
      return obj[key]
    })
  }, [questions])

  /**
   * convert timeCountDown seconds to minutes and seconds like MM:SS
   * @returns {string}
   */
  const convertTime = useMemo(() => {
    const minutes = Math.floor(timeCountDown / 60)
    const seconds = timeCountDown % 60
    return minutes + ':' + (seconds < 10 ? '0' + seconds : seconds)
  }, [timeCountDown])

  const allQuestions = useMemo(() => {
    const _questions = []
    // TODO: if user can change pageSize, need to update cache or other resolver
    for (const [key, value] of questionsCached.current) {
      _questions.push(...value)
    }

    return _questions
  }, [isFinished, questionsCached.current])

  const correctAnswers = useMemo(
    () =>
      allQuestions.reduce((res, curr) => {
        if (answers[curr.ID]) {
          if (answers[curr.ID] === curr.IDCauTraLoiDung) {
            res.push(curr)
          }
        }

        return res
      }, []),
    [isFinished, allQuestions],
  )

  const getScore = useMemo(() => {
    const score = (
      (correctAnswers.length / allQuestions.length) *
      deThi.ThangDiem
    ).toFixed(2)

    return score
  }, [correctAnswers])

  function handleXacNhanNopBai() {
    console.log('Nộp bài')

    setIsFinished(true)
    clearInterval(INTERVAL_ID.current)

    if (timeCountDown != 0) {
      setTimeCountDown(0)
    }
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

  function getQuestionsAndPageByIndexQuestion(index) {
    let questions = []
    let page = 1

    for (let i = 1; i <= totalPage; i++) {
      const key = keyQuestionCached(i)
      const value = questionsCached.current.get(key)

      if (value.length <= index) {
        index = index - value.length
        continue
      }

      page = i
      questions = value
      break
    }

    return {
      questions,
      page,
      question: questions[index],
    }
  }

  function isCorrectAnswer(index) {
    const { question } = getQuestionsAndPageByIndexQuestion(index)
    if (question.IDCauTraLoiDung === answers[question.ID]) {
      return 'bg-vs-success !text-white !hover:bg-vs-success'
    }
    return 'bg-vs-danger !text-white !hover:bg-vs-danger'
  }

  async function handleGotoQuestion(qIndex) {
    // get page of index question
    const { questions, page, question } =
      getQuestionsAndPageByIndexQuestion(qIndex)

    if (!question) return
    setQuestions(questions)
    setCurrentPage(page)

    // await next tick dom update, sleep 100ms
    await new Promise((resolve) => setTimeout(resolve, 100))

    // handle goto dom by ID
    const IDCauHoi = question.ID
    const el = document.getElementById(IDCauHoi)
    if (!el) return

    const headerOffset = 250
    const elementPosition = el.getBoundingClientRect().top
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset
    window.scrollTo({
      top: offsetPosition,
    })
    el.style.transform = 'scale(1.02)'
    el.classList.add('border-uneti-primary')

    setTimeout(() => {
      el.style.transform = 'none'
    }, 400)

    setTimeout(() => {
      el.classList.remove('border-uneti-primary')
    }, 1000)
  }
  // useEffect(() => {
  // const getMonThi = async () => {
  //   const listMonThi = await getAllMonHocThiThu(dataSV.MaSinhVien)
  //   const _monHoc = listMonThi?.data?.body.find(
  //     (mh) => mh.MaMonHoc === maMonHoc,
  //   )
  //   if (!_monHoc) {
  //     navigate('/hoctap/onluyen/thithu')
  //   }
  //   setMonHoc(_monHoc)
  // }
  // const getDeThi = async () => {
  //   const _listDeThi = await getAllDeThiThiThu(maMonHoc)
  //   const _deThi = _listDeThi.data.body.find((e) => e.MaDeThi == maDe)
  //   if (!_deThi) {
  //     navigate('/hoctap/onluyen/thithu')
  //   }
  //   setDeThi(_deThi)
  // }
  // getMonThi()
  // getDeThi()
  // }, [maMonHoc, maDe])

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
    const key = keyQuestionCached(currentPage)
    if (!questionsCached.current.has(key)) return

    setQuestions(questionsCached.current.get(key))
  }, [currentPage])

  // get total questions
  useEffect(() => {
    async function getTotalQuestions(currPage) {
      if (!deThi) return

      retries(async () => {
        const res = await getCauHoiTheoDe({
          IDDeThi: deThi.Id,
          SoCauTrenTrang: pageSize,
          SoTrang: currPage,
        })

        const data = []
        for (let i = 0; i < res.data.body.length; i++) {
          data.push(await convertQuestionToHtml(res.data.body[i]))
        }

        questionsCached.current.set(keyQuestionCached(currPage), data)

        if (currPage == 1) {
          setQuestions(data)
        }
        if (questionsCached.current.size == totalPage) {
          setIsMounted(true)
        }
      })
    }

    ;(async () => {
      if (totalPage == 0) return

      for (let i = 1; i <= totalPage; i++) {
        await getTotalQuestions(i)
      }
    })()
  }, [deThi, totalPage])

  // get total page
  useEffect(() => {
    const getTongSoTrang = async () => {
      if (deThi) {
        const _tongSoTrangResponse = await getTongSoTrangTheoDe({
          IDDeThi: deThi.Id,
          SoCauTrenTrang: pageSize,
        })

        setTotalPage(_tongSoTrangResponse.data.body[0].TongSoTrang)
      }
    }

    getTongSoTrang()
  }, [deThi, pageSize])

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
      }}
    >
      <div className="flex justify-center items-center flex-col gap-4 rounded-2xl bg-white p-4">
        <h3 className="text-uneti-primary text-center font-semibold text-2xl">
          {monHoc.TenMonHoc}
        </h3>
        <span className="text-uneti-primary text-sm">
          Mã Môn Học: {monHoc.MaMonHoc}
        </span>
      </div>
      {!isMounted ? (
        <div className="flex items-center justify-center">
          <Loading />
        </div>
      ) : (
        <div className="mt-6">
          <Row gutter={30}>
            <Col span={12} md={9}>
              <div className="z-1">
                <div
                  className={`flex flex-col gap-7 p-6 bg-white rounded-[26px] shadow-sm ${isFinished ? 'pointer-events-none opacity-90' : ''}`}
                >
                  {questionsGroupByParent?.map((question, index) => {
                    if (question?.length > 0) {
                      return (
                        <div
                          id={question[0].IDCauHoiCha}
                          key={`parent-${index}`}
                          className="p-6 rounded-[26px] border-2 border-slate-200 flex flex-col gap-4 transition-all hover:border-opacity-90"
                        >
                          <div className="flex items-start gap-2 flex-wrap">
                            <div
                              className="flex-1 mt-[2px]"
                              dangerouslySetInnerHTML={{
                                __html: `<span class="text-vs-danger font-bold whitespace-nowrap">
                            Câu hỏi ${(currentPage - 1) * pageSize + index + 1}:
                          </span> ${question[0].CauHoiCha}`,
                              }}
                            />
                          </div>

                          {question.map((child, i) => (
                            <CauHoi
                              key={`child-${index}-${i}`}
                              STT={`${(currentPage - 1) * pageSize + index + 1}.${i + 1}`}
                              {...child}
                              disabled={isFinished}
                              isFinished={isFinished}
                            />
                          ))}
                        </div>
                      )
                    } else
                      return (
                        <CauHoi
                          key={`parent-${index}`}
                          STT={(currentPage - 1) * pageSize + index + 1}
                          {...question}
                          disabled={isFinished}
                          isFinished={isFinished}
                        />
                      )
                  })}
                </div>

                <div className="p-4 bg-white my-5 rounded-xl shadow-sm">
                  <Pagination
                    count={totalPage}
                    page={currentPage}
                    onChange={handleChangeCurrentPage}
                    shape="rounded"
                  />
                </div>
              </div>
            </Col>
            <Col span={12} md={3}>
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
                              {correctAnswers.length}/{allQuestions.length}
                            </p>
                            <p>
                              (
                              {(
                                (correctAnswers.length / allQuestions.length) *
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
                  <div className="h-[36dvh] overflow-y-auto flex flex-wrap gap-2 justify-evenly">
                    {Array.from({ length: deThi.TongSoCau }, (_, i) => i).map(
                      (e) => {
                        return (
                          <div
                            key={e}
                            className={`${isFinished ? isCorrectAnswer(e) : 'hover:bg-uneti-primary hover:bg-opacity-10'} animate__animated animate__zoomInUp animate_faster active:scale-95 transition-all w-8 h-8 border rounded-full cursor-pointer select-none flex items-center justify-center text-opacity-80`}
                            onClick={() => handleGotoQuestion(e)}
                          >
                            {e + 1}
                          </div>
                        )
                      },
                    )}
                  </div>

                  <div className="pl-2 mt-6">
                    Đã trả lời: {keys(answers).length}/{deThi.TongSoCau}
                  </div>
                </div>

                <div className="p-3">
                  {isFinished ? (
                    <Button>Làm lại lần nữa?</Button>
                  ) : (
                    <XacNhanNopBai
                      TenMonHoc={monHoc.TenMonHoc}
                      onConfirm={handleXacNhanNopBai}
                    />
                  )}
                </div>
              </div>
            </Col>
          </Row>
        </div>
      )}
    </OnTapContext.Provider>
  )
}

export default DeThi
