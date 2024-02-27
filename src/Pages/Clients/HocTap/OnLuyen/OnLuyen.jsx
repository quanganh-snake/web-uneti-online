import ModuleItem from '@/Components/ModuleItem/ModuleItem'
import { Sidebar } from '@/Components/Sidebar/Sidebar'
import { homeOnLuyen } from '@/Services/Static/dataStatic'

export default function OnLuyen() {
  return (
    <>
      <div className="flex items-start md:gap-6 px-4">
        <div className="w-full grid grid-cols-2 gap-10">
          {homeOnLuyen.map((item, index) => {
            return (
              <div className="col-span-2 md:col-span-1" key={index}>
                <ModuleItem item={item} />
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}
