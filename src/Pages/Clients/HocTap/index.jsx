import React from 'react'
import { homeHocTap } from '@/Services/Static/dataStatic.js'
import ModuleItem from '@/Components/ModuleItem/ModuleItem.jsx'

function HomeHocTap() {
    return (
        <>
            <div>
                <h2 className="text-uneti-primary uppercase text-center font-semibold text-2xl mb-10">
                    Tra cứu kết quả học tập và ôn luyện
                </h2>
                <div className="flex flex-col md:flex-row px-4 gap-7">
                    {homeHocTap.map((item, index) => {
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

export default HomeHocTap
