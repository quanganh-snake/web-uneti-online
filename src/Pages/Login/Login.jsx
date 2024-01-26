import { useState } from 'react'
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineGlobal,
  AiOutlineYoutube,
} from 'react-icons/ai'
import { FaSquareFacebook } from 'react-icons/fa6'
import { toast } from 'react-toastify'
import logoUneti from '@/assets/Images/LOGO_UNETI.ico'
import {
  tokenGVLogin,
  tokenSVLogin,
  userGVLogin,
  userSVLogin,
} from '@/Apis/apiLogin.js'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Loading from '@/Components/Loading/Loading'

function Login() {
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()
  // event handlers
  const handleChangevalue = async (e) => {
    if (e.target.id === 'taikhoan') {
      setUsername(e.target.value)
    }

    if (e.target.id === 'matkhau') {
      setPassword(e.target.value)
    }
  }

  const checkedSinhVien = async (username, password) => {
    // Check Sinh Viên
    setLoading(true)
    const userSV = {
      TC_SV_MaSinhVien: username,
      TC_SV_MaSinhVien_Pass: password,
    }
    const tokenSV = await tokenSVLogin(userSV, dispatch)

    if (tokenSV) {
      const dataSV = await userSVLogin({ TC_SV_MaSinhVien: username }, dispatch)

      if (!dataSV) {
        setLoading(false)
        return null
      }

      if (
        dataSV?.LoaiHinhDaoTao === '' ||
        dataSV?.LoaiHinhDaoTao == null ||
        dataSV?.LoaiHinhDaoTao === undefined
      ) {
        setLoading(false)
        return 'Invalid-LoaiHinhDaoTao'
      }

      if (
        dataSV?.Email_TruongCap === '' ||
        dataSV?.Email_TruongCap == null ||
        dataSV?.Email_TruongCap === undefined
      ) {
        setLoading(false)
        return 'Invalid-Email'
      }

      if (dataSV?.TrangThaiHocTap === 'Đang học') {
        setLoading(false)
        return 'SV'
      } else if (dataSV?.TrangThaiHocTap === 'Đã tốt nghiệp') {
        setLoading(false)
        return 'SV-Done'
      }
    } else {
      setLoading(false)
      return null
    }
  }

  const checkedGiangVien = async (username, password) => {
    // Check Giảng Viên
    setLoading(true)
    const userGV = {
      HT_USER_TenDN: username,
      HT_USER_MK: password,
    }
    try {
      const tokenGV = await tokenGVLogin(userGV, dispatch)
      if (tokenGV) {
        const dataGV = await userGVLogin(userGV, dispatch, navigate)

        if (!dataGV) {
          setLoading(false)
          return null
        }

        if (dataGV?.LoaiTaiKhoan === 'Giảng viên') {
          setLoading(false)
          return 'CB'
        } else {
          return null
        }
      } else {
        setLoading(false)
        return null
      }
    } catch (error) {
      setLoading(false)
      console.log([error])
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    if (username === '' || username === null || username === undefined) {
      setLoading(false)
      return toast.error('Vui lòng nhập tài khoản!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      })
    }

    if (password === '' || password === null || password === undefined) {
      setLoading(false)
      return toast.error('Vui lòng nhập mật khẩu!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      })
    }

    const sinhvien = await checkedSinhVien(username, password)
    const giangvien = await checkedGiangVien(username, password)

    if (!sinhvien && !giangvien) {
      setLoading(false)
      return toast.error(
        'Thông tin đăng nhập không chính xác. Vui lòng kiểm tra lại!',
        {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        },
      )
    }

    if (sinhvien === 'Invalid-Email') {
      setLoading(false)
      return toast.error(
        'Tài khoản của bạn thiếu thông tin email của trường cấp không thể đăng nhập. Vui lòng đợi cập nhật thông tin và quay lại sau!',
        {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        },
      )
    } else if (sinhvien === 'Invalid-LoaiHinhDaoTao') {
      setLoading(false)
      return toast.error(
        'Tài khoản của bạn thiếu thông tin bậc đào tạo không thể đăng nhập. Vui lòng đợi cập nhật thông tin và quay lại sau!',
        {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        },
      )
    } else if (sinhvien === 'SV-Done') {
      setLoading(false)
      return toast.error(
        'Tài khoản đã tốt nghiệp không thể sử dụng hệ thống UNETI.',
        {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        },
      )
    }
    setLoading(false)
    const currentUrl = localStorage.getItem('currentUrl') ?? '/uneti'
    navigate(currentUrl)
  }

  const handleEnterPressKey = (e) => {
    if (e.key === 'Enter') {
      handleLogin(e)
    }
  }

  return (
    <section
      className={`absolute right-0 left-0 top-0 bottom-0 w-full h-full flex justify-center items-center bg-center bg-no-repeat  bg-gray-400 bg-blend-multiply px-4 lg:px-0`}
      style={{
        backgroundImage: `url("images/uneti-banner.png")`,
        backgroundPositionY: `86%`,
      }}
    >
      {loading ? (
        <div className="fixed bg-[#4d4d4d3a] inset-0 flex items-center justify-center z-50">
          <Loading />
        </div>
      ) : (
        <div className="w-[600px] p-10 bg-white rounded-xl">
          <div className="login-brand flex justify-center mb-6">
            <img src={logoUneti} className="w-32" alt="" />
          </div>
          <h3 className="font-semibold uppercase text-3xl text-sky-700 mb-10 text-center">
            Đăng nhập hệ thống UNETI
          </h3>
          <form
            onSubmit={handleLogin}
            onKeyDown={handleEnterPressKey}
            className="flex flex-col justify-center"
          >
            <div className="flex flex-col mb-4">
              <label htmlFor="taikhoan" className="font-semibold text-sky-900">
                Tài khoản
              </label>
              <input
                id="taikhoan"
                type="text"
                className="px-4 py-2 border border-slate-300 rounded-full outline-none valid:bg-white"
                placeholder="Tài khoản"
                onChange={handleChangevalue}
              />
            </div>
            <div className="flex flex-col  mb-4">
              <label htmlFor="matkhau" className="font-semibold text-sky-900">
                Mật khẩu
              </label>
              <div className="relative">
                <input
                  id="matkhau"
                  autoComplete="current-password"
                  type={showPassword ? 'text' : 'password'}
                  className="px-4 py-2 border border-slate-300 w-full rounded-full outline-none valid:bg-white"
                  placeholder="Mật khẩu"
                  onChange={handleChangevalue}
                />
                <span
                  className="absolute right-5 top-3 cursor-pointer text-xl"
                  onClick={() => {
                    setShowPassword(!showPassword)
                  }}
                >
                  {!showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                </span>
              </div>
            </div>
            <button
              type="submit"
              className="px-3 py-2 rounded-full bg-white text-sky-800 font-semibold border border-sky-800 hover:bg-sky-800 hover:text-white"
            >
              Đăng nhập
            </button>
          </form>

          <div className="login-bottom text-center mt-6">
            <p>Trường Đại Học Kinh Tế - Kỹ Thuật Công Nghiệp</p>
            <p>Tel: (024)38621504 - (0228)3848706</p>
            <div className="flex justify-center gap-4 mt-2">
              <Link to={'https://uneti.edu.vn'} target="_blank">
                <AiOutlineGlobal size={24} />
              </Link>
              <Link
                to={'https://www.facebook.com/Daihoc.uneti'}
                target="_blank"
              >
                <FaSquareFacebook size={24} />
              </Link>
              <Link to={'https://www.youtube.com/@nokia88e1'} target="_blank">
                <AiOutlineYoutube size={24} />
              </Link>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default Login
