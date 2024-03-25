import { keys } from 'lodash-unified'
import { QUYEN_HE_THONG } from './constants'
import { Switch } from '@mui/material'
import { useState } from 'react'

const roles = {
  0: {
    id: 0,
    Ten: 'Chủ tịch',
    Quyen: [1, 2, 3, 4, 5, 6, 7],
  },
  1: {
    id: 1,
    Ten: 'Phó chủ tịch',
    Quyen: [1, 2, 3, 6, 8],
  },
  2: {
    id: 2,
    Ten: 'NV Phòng KT',
    Quyen: [2, 3, 5, 6],
  },
  3: {
    id: 3,
    Ten: 'Thư ký hội đồng',
    Quyen: [2, 5, 6, 7],
  },
}

export default function QuyTrinhDanhGiaNgoai(props) {
  const { tab, index } = props

  const [roleActive, setRoleActive] = useState(0)

  return (
    <div hidden={index !== tab}>
      <div className="flex gap-[30px] mx-[-15px]">
        <div className="px-[15px] uneti-col uneti-col-12 uneti-col-md-4">
          <h3 className="text-base font-semibold mb-2">Nhiệm vụ</h3>

          <ul className="flex flex-col gap-3">
            {keys(roles).map((e, i) => (
              <li
                key={i}
                onClick={() => setRoleActive(e)}
                className={`px-2 py-2 cursor-pointer border border-slate-300 transition-all ${roleActive == e ? 'ring-2 border-blue-500' : ''} hover:ring-2 hover:border-blue-500 rounded-md`}
              >
                {roles[e].Ten}
              </li>
            ))}
          </ul>
        </div>

        <div className="px-[15px] uneti-col uneti-col-12 uneti-col-md-4">
          <h3 className="text-base font-semibold mb-2">Phân quyền</h3>

          <ul>
            {keys(QUYEN_HE_THONG).map((e, i) => (
              <li key={i} className="flex gap-1 items-center">
                <Switch
                  checked={roles[roleActive].Quyen.some(
                    (q) => q == QUYEN_HE_THONG[e].Id,
                  )}
                  value={QUYEN_HE_THONG[e].Id}
                />
                <p>{QUYEN_HE_THONG[e].Ten}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
