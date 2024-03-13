import React from 'react'
import { homeTraCuu } from '@/Services/Static/dataStatic.js'
import ModuleItem from '@/Components/ModuleItem/ModuleItem.jsx'

function HomeTraCuu() {
  return (
    <>
      <div>
        <div className="grid grid-col-1 sm:grid-cols-2 md:grid-cols-3 px-4 gap-7">
          {homeTraCuu.map((item, index) => {
            return (
              <div key={index} className="flex-1">
                <React.Fragment>
                  <ModuleItem item={item} />
                </React.Fragment>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default HomeTraCuu
