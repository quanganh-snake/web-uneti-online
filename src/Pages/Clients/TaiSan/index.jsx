import ModuleItem from '@/Components/ModuleItem/ModuleItem'
import { homeTaiSan } from '@/Services/Static/dataStatic'
import React from 'react'

const HomeTaiSan = () => {
  return (
    <>
      <div>
        <h2 className="text-uneti-primary uppercase text-center font-semibold text-2xl mb-10">
          Chuyên trang hỗ trợ thiết bị
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 px-4">
          {homeTaiSan.listFeatures.map((itemTaiSan, index) => {
            return (
              <React.Fragment key={index}>
                <ModuleItem item={itemTaiSan} />
              </React.Fragment>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default HomeTaiSan
