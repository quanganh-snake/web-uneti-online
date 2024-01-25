import React from 'react'
import { homeHTTBGD } from '@/Services/Static/dataStatic.js'
import ModuleItem from '@/Components/ModuleItem/ModuleItem.jsx'

function HomeTBGD() {
  return (
    <>
      <div>
        <h2 className="text-uneti-primary uppercase text-center font-semibold text-2xl mb-10">
          Chuyên trang hỗ trợ thiết bị giảng đường
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 px-4">
          {homeHTTBGD.map((itemHTTBGD, index) => {
            return (
              <React.Fragment key={index}>
                <ModuleItem item={itemHTTBGD} />
              </React.Fragment>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default HomeTBGD
