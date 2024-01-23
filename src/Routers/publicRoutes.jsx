import { Route } from 'react-router-dom'
import Login from '@/Pages/Login/Login'
import Default from '@/Pages/Default'
import { Error403 } from '@/Pages/Errors/403/Error403'

export const publicRoutes = (
    <>
        <Route path={'/'}>
            <Route index element={<Default />} />
            <Route path="/dangnhap" element={<Login />} />
            <Route path="/error/403" element={<Error403 />} />
        </Route>
    </>
)
