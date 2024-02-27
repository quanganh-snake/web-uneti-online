import Breadcrumb from '@/Components/Breadcumb/Breadcrumb'
import { Sidebar } from '@/Components/Sidebar/Sidebar'

export default function CommonLayout({
  children,
  sidebar = [],
  home = {},
  breadcrumbs = [],
  heading = '',
}) {
  return (
    <>
      <div className="flex items-start md:gap-6 px-0 md:px-4 w-full">
        {sidebar.length ? <Sidebar items={sidebar} /> : null}

        <div className={`flex-1 bg-white rounded-2xl shadow-module-item p-5 md:p-10 ${sidebar?.length ? 'w-8/12' : 'w-full'}`}>
          <Breadcrumb home={home} breadcrumbs={breadcrumbs} />
          <div className="mt-4">
            {heading ? (
              <h3 className="uppercase w-full text-center font-semibold text-xl mb-4 text-uneti-primary">
                {heading}
              </h3>
            ) : null}
            <div className="w-full">{children}</div>
          </div>
        </div>
      </div>
    </>
  )
}
