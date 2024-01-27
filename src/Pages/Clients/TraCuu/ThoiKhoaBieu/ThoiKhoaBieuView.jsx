import Breadcrumb from '@/Components/Breadcumb/Breadcrumb'

function ThoiKhoaBieuView(props) {
  const { home, breadcrumbs } = props
  return (
    <div className="bg-white shadow-md rounded-md mx-4 lg:mx-0">
      <div className="p-4 flex flex-col">
        <Breadcrumb home={home} breadcrumbs={breadcrumbs} />
        <div className="w-full rounded-md mt-4 p-3 flex flex-col justify-center items-center">
          <h3 className="text-3xl uppercase text-center mb-4 font-semibold my-3 text-uneti-primary">
            THÔNG TIN LỊCH HỌC/LỊCH THI
          </h3>
          <div className="w-full">abcbc</div>
        </div>
      </div>
    </div>
  )
}

export default ThoiKhoaBieuView
