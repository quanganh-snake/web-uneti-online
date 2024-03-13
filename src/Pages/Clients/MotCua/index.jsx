import React from 'react'
import { homeMotCua } from '../../../Services/Static/dataStatic.js'
import SlideMotCua from './Slides/SlideMotCua.jsx'
import ChartMotCua from './Charts/ChartMotCua.jsx'
import ModuleItem from '@/Components/ModuleItem/ModuleItem.jsx'

function HomeMotCua() {
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 px-4">
        {homeMotCua.map((moduleItemMotCua, index) => {
          return (
            <React.Fragment key={index}>
              <ModuleItem
                item={{
                  ...moduleItemMotCua,
                  desc: moduleItemMotCua.childrens
                    .map((feature) => feature.title)
                    .join(', '),
                }}
              />
            </React.Fragment>
          )
        })}
      </div>
      <div className="px-4 my-5 max-w-7xl">
        <SlideMotCua />
      </div>
      <div className="my-5 rounded-lg">
        <ChartMotCua />
      </div>
    </>
  )
}

export default HomeMotCua
