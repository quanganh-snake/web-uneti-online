import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import { publicRoutes } from './publicRoutes'
import { privateRoutes } from './privateRoutes'
import Loading from '@/Components/Loading/Loading'
const Error404 = lazy(() => import('@/Pages/Errors/404/Error404'))

function RouterCore() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        {publicRoutes}
        {privateRoutes}
        <Route path="*" element={<Error404 />} />
      </Routes>
    </Suspense>
  )
}

export default RouterCore
