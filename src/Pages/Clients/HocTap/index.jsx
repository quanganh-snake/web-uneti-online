import React from 'react'
import { homeHocTap } from '@/Services/Static/dataStatic.js'
import ModuleItem from '@/Components/ModuleItem/ModuleItem.jsx'

function HomeHocTap() {
  return (
    <>
      <div className="flex flex-col md:flex-row px-4 gap-7">
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
