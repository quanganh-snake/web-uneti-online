import React from 'react'
import { homeHocTap } from '@/Services/Static/dataStatic.js'
import ModuleItem from '@/Components/ModuleItem/ModuleItem.jsx'

function HomeHocTap() {
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 px-4">
        {homeHocTap.map((item, index) => {
          return (
            <React.Fragment key={index}>
              <ModuleItem item={item} />
            </React.Fragment>
          )
        })}
      </div>
    </>
  )
}

export default HomeHocTap
