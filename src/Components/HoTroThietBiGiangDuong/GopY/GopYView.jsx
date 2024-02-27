import Breadcrumb from '@/Components/Breadcumb/Breadcrumb'
import { home, breadcrumbs } from './constants'
import { Link } from 'react-router-dom'
import GopYForm from './GopYForm'

export const GopYView = (props) => {
  const { handleSubmitData } = props

  return (
    <div className="bg-vs-theme-layout rounded-2xl mx-4 lg:mx-0">
      <div className="p-4 flex flex-col gap-4">
        <Breadcrumb home={home} breadcrumbs={breadcrumbs} />

        <div className="form-submit flex flex-col w-full justify-center">
          <h2 className="text-center uppercase text-2xl font-semibold text-sky-800 mb-6">
            Tiếp nhận góp ý
          </h2>
          <div className="lg:px-36">
            <GopYForm {...props} />

            <div className="relative sm:rounded-lg my-6">
              <div className="pb-10 uneti-action flex justify-center gap-2">
                <button
                  onClick={handleSubmitData}
                  className="px-3 py-2 bg-white text-sky-800 font-semibold border border-sky-800 rounded-xl hover:bg-sky-800 hover:text-white"
                >
                  Gửi yêu cầu
                </button>

                <Link to={'/ho-tro-thiet-bi-giang-duong'}>
                  <button className="px-3 py-2 bg-white text-sky-800 font-semibold border border-sky-800 rounded-xl hover:bg-sky-800 hover:text-white">
                    Trở lại
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
