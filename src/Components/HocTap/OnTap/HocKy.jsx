import Accordion from '@/Components/Base/Accordion/Accordion'
import MonHoc from './MonHoc'
import { Link } from 'react-router-dom'

export default function HocKy({ hocKy, listMonHoc, linkTo }) {
    return (
        <Accordion className="mb-2">
            <Accordion.Label className="bg-uneti-primary text-white">
                Học kỳ {hocKy}
            </Accordion.Label>

            <Accordion.Content className="w-full overflow-x-auto mt-2">
                <div className="w-full flex flex-col gap-2 pb-2">
                    {listMonHoc.map((mh, index) => (
                        <Link key={index} to={`${linkTo}/${mh.MaMonHoc}`}>
                            <MonHoc {...mh} />
                        </Link>
                    ))}
                </div>
            </Accordion.Content>
        </Accordion>
    )
}
