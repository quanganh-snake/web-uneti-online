import React from 'react'
import { homeHocTap } from '@/Services/Static/dataStatic.js'
import ModuleItem from '@/Components/ModuleItem/ModuleItem.jsx'

export const HocTap = () => {
    return (
        <>
            <div>
                <h2 className="text-uneti-primary uppercase text-center font-semibold text-2xl mb-10">
                    Tra cứu kết quả học tập và ôn luyện
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 px-4">
                    {homeHocTap.map((itemHocTap, index) => {
                        return (
                            <React.Fragment key={index}>
                                <ModuleItem item={itemHocTap} />
                            </React.Fragment>
                        )
                    })}
                </div>
            </div>
        </>
    )
}
