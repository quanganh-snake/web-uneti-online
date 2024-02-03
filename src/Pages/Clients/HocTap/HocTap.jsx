import React from 'react'
import { homeHocTap } from '@/Services/Static/dataStatic.js'
import ModuleItem from '@/Components/ModuleItem/ModuleItem.jsx'

function HomeHocTap() {
  return (
    <>
      <div>
        <div className="flex flex-col md:flex-row md:justify-center px-4 gap-10">
          {homeHocTap.map((item, index) => {
            return (
              <React.Fragment key={index}>
                <ModuleItem item={item} />
              </React.Fragment>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default HomeHocTap
