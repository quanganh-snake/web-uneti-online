import ModuleItem from '@/Components/ModuleItem/ModuleItem'
import { Sidebar } from '@/Components/Sidebar/Sidebar'
import { homeOnLuyen } from '@/Services/Static/dataStatic'
import React from 'react'

export default function OnLuyen() {
  return (
    <>
      <div className="flex items-start md:gap-6 px-4">
        <div>
          <Sidebar
            items={[
              {
                name: 'ketquahoctap',
                label: 'Kết quả học tập',
              },
              {
                name: 'onluyen',
                label: 'Ôn luyện',
                children: [
                  {
                    name: 'ontap',
                    label: 'Ôn tập',
                  },
                  {
                    name: 'thithu',
                    label: 'Thi thử',
                  },
                ],
              },
            ]}
            setShowSidebar={() => null}
          />
        </div>

        <div className="flex flex-col md:flex-row gap-10">
          {homeOnLuyen.map((item, index) => {
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
