import Box from '@/Components/MotCua/Box'
import { homeMotCua } from '@/Services/Static/dataStatic'
import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const HomeHuongDan = () => {
  const iconHuongDan = homeMotCua[4].ico
  const featureHuongDan = homeMotCua[4].childrens

  const location = useLocation()
  const { pathname } = location

  const breadcrumbs = [
    {
      title: 'Hướng dẫn',
      path: pathname,
    },
  ]

  const home = {
    path: '/mot-cua',
    title: 'Bộ phận một cửa',
  }
  return (
    <div className="bg-white rounded-lg">
      <Box home={home} breadcrumbs={breadcrumbs}>
        {featureHuongDan.map((featureItem, index) => {
          return featureItem.visiable ? (
            <div key={index}>
              <Link
                to={`${featureItem.path}`}
                target="_blank"
                className="uneti-motcua__module"
              >
                <div className="bg-white p-8 border border-gray-200 rounded-exclude-tl h-full flex flex-col justify-center md:flex-row md:justify-start items-center shadow-lg">
                  <img
                    src={iconHuongDan}
                    className="inline-block w-20 h-20"
                    title={featureItem.title}
                    alt={featureItem.title}
                  />
                  <div className="w-full h-[2px] md:w-[1px] md:h-full bg-[#336699] my-4 md:my-0 mx-6"></div>
                  <div className="uneti-motcua__content px-4 w-full">
                    <h2 className="uppercase font-semibold text-[#336699] text-center text-2xl mb-4">
                      {featureItem.title}
                    </h2>
                    <p className="text-center">{featureItem.desc}</p>
                  </div>
                </div>
              </Link>
            </div>
          ) : null
        })}
      </Box>
    </div>
  )
}

export default HomeHuongDan
