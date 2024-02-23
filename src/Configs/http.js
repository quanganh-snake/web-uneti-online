import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import { tokenSuccess } from '@/Services/Redux/Slice/authSlice'
import { store } from '@/Services/Redux/store'
import { refreshDataToken } from '@/Apis/apiLogin'

const http = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}`,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': 'https://uneti.edu.vn',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
  },
})

const requestToRefreshToken = async () => {
  const dataCurrentToken = store.getState()?.auth?.login?.currentToken
  if (dataCurrentToken) {
    const { token: accessToken, refreshToken } = dataCurrentToken
    let currentDate = new Date()
    const decodedToken = jwtDecode(accessToken)
    const decodedRefreshToken = jwtDecode(refreshToken)

    if (decodedRefreshToken.exp < currentDate.getTime() / 1000) {
      return null
    }

    if (decodedToken.exp < currentDate.getTime() / 1000) {
      const newDataToken = await refreshDataToken(refreshToken).then(
        (res) => res,
      )
      return newDataToken
    }
  }
}

// Add a request interceptor
http.interceptors.request.use(
  async (config) => {
    const dataToken = store.getState()?.auth?.login?.currentToken
    let currentDate = new Date()
    if (dataToken) {
      const { token: accessToken, refreshToken } = dataToken
      config.headers['Authorization'] = `Bearer ${accessToken}`

      // Check expire
      const decodedToken = jwtDecode(accessToken)
      //   console.log('🚀 ~ file: http.js:92 ~ check accessToken expire: ', {
      //     expire: decodedToken.exp < currentDate.getTime() / 1000,
      //     timeout:
      //       currentDate.getHours() +
      //       ':' +
      //       currentDate.getMinutes() +
      //       ':' +
      //       currentDate.getSeconds() +
      //       's',
      //   })

      const decodedRefreshToken = jwtDecode(refreshToken)
      //   console.log('🚀 ~ file: http.js:92 ~ check refreshToken expire: ', {
      //     expire: decodedRefreshToken.exp < currentDate.getTime() / 1000,
      //     timeout:
      //       currentDate.getHours() +
      //       ':' +
      //       currentDate.getMinutes() +
      //       ':' +
      //       currentDate.getSeconds() +
      //       's',
      //   })

      if (decodedRefreshToken.exp < currentDate.getTime() / 1000) {
        window.location.href = '/'
        return
      }

      if (decodedToken.exp < currentDate.getTime() / 1000) {
        // const resNewDataToken = await axios.post(`${import.meta.env.VITE_API_URL}/jwt/RefreshToken`, { refreshToken });
        const resNewDataToken = await requestToRefreshToken()
        const refreshUser = {
          ...dataToken,
          token: resNewDataToken?.token,
        }
        store.dispatch(tokenSuccess(refreshUser))
        config.headers.Authorization = `Bearer ${resNewDataToken.token}`
      }
    }
    return config
  },
  (error) => {
    localStorage.setItem('>>>Error http.js', error.message)
    Promise.reject(error)
    window.location.href = '/'
  },
)

http.interceptors.response.use(
  async (response) => {
    return response
  },
  async (error) => {
    const dataToken = store.getState()?.auth?.login?.currentToken
    const originalRequest = error.config
    // console.log("🚀 ~ file: http.js:74 ~ error:", [error]);
    if (error.response?.status === 401 || error.response?.status === 403) {
      if (!originalRequest._retry) {
        originalRequest._retry = true
        let currentDate = new Date()
        try {
          const resNewDataToken = await requestToRefreshToken()

          const { refreshToken } = resNewDataToken
          const decodedRefreshToken = jwtDecode(refreshToken)
          //   console.log('🚀 ~ file: http.js:81 ~ check refreshToken expire: ', {
          //     expire: decodedRefreshToken.exp < currentDate.getTime() / 1000,
          //     timeout:
          //       currentDate.getHours() +
          //       ':' +
          //       currentDate.getMinutes() +
          //       ':' +
          //       currentDate.getSeconds() +
          //       's',
          //   })

          if (decodedRefreshToken.exp < currentDate.getTime() / 1000) {
            window.location.href = '/'
          } else {
            const refreshUser = {
              ...dataToken,
              token: resNewDataToken.token,
            }
            store.dispatch(tokenSuccess(refreshUser))
            originalRequest.headers.Authorization = `Bearer ${resNewDataToken.token}`
            return http(originalRequest)
          }
        } catch (refreshError) {
          window.location.href = '/'
          return Promise.reject(refreshError)
        }
      } else {
        window.location.href = '/'
      }
    }

    return Promise.reject(error)
  },
)

export default http
