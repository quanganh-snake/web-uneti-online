import Breadcrumb from '@/Components/Breadcumb/Breadcrumb.jsx'

function Box(props) {
    const { home, breadcrumbs, children } = props

    return (
        <div className="flex flex-col gap-4 p-5 rounded-md">
            <Breadcrumb home={home} breadcrumbs={breadcrumbs} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {children}
            </div>
        </div>
    )
}

export default Box
