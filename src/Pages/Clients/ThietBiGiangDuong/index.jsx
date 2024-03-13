import React from 'react'
import { homeHTTBGD } from '@/Services/Static/dataStatic.js'
import ModuleItem from '@/Components/ModuleItem/ModuleItem.jsx'

function HomeTBGD() {
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 px-4 -mt-16">
        {homeHTTBGD.map((itemHTTBGD, index) => {
          return (
            <React.Fragment key={index}>
              <ModuleItem item={itemHTTBGD} />
            </React.Fragment>
          )
        })}
      </div>
    </>
  )
}

export default HomeTBGD
