import Accordion from '@/Components/Base/Accordion/Accordion'
import { Link } from 'react-router-dom'

export default function HocKy({ hocKy, children }) {
  return (
    <Accordion className="mb-2">
      <Accordion.Label className="bg-uneti-primary text-white">
        Học kỳ {hocKy}
      </Accordion.Label>

      <Accordion.Content className="w-full overflow-x-auto mt-2">
        <div className="w-full flex flex-col gap-2 pb-2">{children}</div>
      </Accordion.Content>
    </Accordion>
  )
}
