import {
  logOutFailure,
  logOutStart,
  logOutSuccess,
} from '@/Services/Redux/Slice/authSlice'
import http from '@/Configs/http'
import { userSuccess } from '@/Services/Redux/Slice/userSlice'
import { ROLES } from '@/Routers/privateRoutes'

export const logOut = async (role, dispatch, navigate, refreshToken) => {
  dispatch(logOutStart())
  try {
    const dataRefresh = {
      refreshToken: refreshToken,
    }
    if (role === ROLES.S0202) {
      await http.post(`/jwt/Logout`, dataRefresh)
    } else if (role === 'GV') {
      await http.post(`/jwtGV/LogoutGV`, dataRefresh)
    } else {
      navigate('/dang-nhap')
    }
    navigate('/dang-nhap')
    localStorage.removeItem('persist:root')
    localStorage.removeItem('currentUrl')
    dispatch(logOutSuccess())
    dispatch(userSuccess(null))
  } catch (error) {
    dispatch(logOutFailure())
  }
}
