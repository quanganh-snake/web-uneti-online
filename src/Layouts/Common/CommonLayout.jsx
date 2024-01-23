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
            <div className="flex items-start md:gap-6 px-4 w-full">
                {sidebar.length ? <Sidebar items={sidebar} /> : null}

                <div
                    className={`flex-1 ${sidebar?.length ? 'w-8/12' : 'w-full'}`}
                >
                    <Breadcrumb home={home} breadcrumbs={breadcrumbs} />
                    <div className="bg-white mt-4 p-10 rounded-2xl shadow-sm">
                        {heading ? (
                            <h3 className="uppercase w-full text-center font-bold text-xl mb-4 text-uneti-primary">
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
