import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'animate.css'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Provider } from 'react-redux'
import { persistor, store } from './Services/Redux/store.js'
import { PersistGate } from 'redux-persist/integration/react'

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import 'dayjs/locale/vi'
import { LocalizationProvider } from '@mui/x-date-pickers'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <>
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="vi">
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </LocalizationProvider>
    <ToastContainer />
  </>,
  // </StrictMode>,
)
