import Breadcrumb from '@/Components/Breadcumb/Breadcrumb'
import { XacNhanDTForm } from './XacNhanDTForm'
import { breadcrumbs, home } from './constants'
import { GiayToKemTheoAlert } from '@/Components/MotCua/GiayToKemTheoAlert'

export const XacNhanDTView = (props) => {
  const { handleSubmitData } = props
  return (
    <div className='bg-white shadow-md rounded-md mx-4 lg:mx-0'>
      <div className='p-4 flex flex-col gap-4'>
        <Breadcrumb home={home} breadcrumbs={breadcrumbs} />

        <div className='form-submit flex flex-col w-full justify-center'>
          <h2 className='text-center uppercase text-2xl font-bold text-sky-800 mb-6'>
            Tiếp nhận yêu cầu xác nhận
          </h2>
          <h1 className='uppercase'>Lỗi 2 options cuối</h1>
          <div className='lg:px-36'>
            <XacNhanDTForm {...props} />

            <div className='relative sm:rounded-lg my-6'>
              <div className='pb-10 uneti-action flex justify-center'>
                <button
                  onClick={handleSubmitData}
                  className='px-3 py-2 bg-white text-sky-800 font-semibold border border-sky-800 rounded-full hover:bg-sky-800 hover:text-white'
                >
                  Gửi yêu cầu
                </button>
              </div>
            </div>
          </div>

          <div className='lg:px-36'>
            <GiayToKemTheoAlert downloadText='Xác nhận hoàn thành khoá học' />
          </div>
        </div>
      </div>
    </div>
  )
}