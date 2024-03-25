import DuLieuDamBaoChatLuong from '@/Components/KiemDinhChatLuong/DuLieuDamBaoChatLuong'
import TinhTrangKiemDinhCSGD from '@/Components/KiemDinhChatLuong/TinhTrangKiemDinhCSGD'
import TinhTrangKiemDinhCTDT from '@/Components/KiemDinhChatLuong/TinhTrangKiemDinhCTDT'
import { useNamespace } from '@/Services/Hooks'

const KiemDinhChatLuong = () => {
  const ns = useNamespace('kdcl')
  return (
    <div
      className={[
        ns.b('box'),
        '-mt-20 min-h-screen w-full rounded-md bg-white p-2',
      ]}
    >
      <div className={[ns.be('box', 'hoc-ky'), ' flex justify-end']}>
        <div className="flex items-center gap-4">
          <p>Năm học</p>
          <select name="" id="" className="border p-2 focus:outline-slate-200">
            <option value="">2018-2019</option>
            <option value="">2019-2020</option>
            <option value="">2020-2021</option>
            <option value="">2021-2022</option>
            <option value="">2022-2023</option>
            <option value="">2023-2024</option>
          </select>
        </div>
      </div>

      <div className={[ns.be('box', 'dbcl')]}>
        <DuLieuDamBaoChatLuong />
      </div>
      <div className={[ns.be('box', 'dbcl')]}>
        <TinhTrangKiemDinhCTDT />
      </div>
      <div className={[ns.be('box', 'dbcl')]}>
        <TinhTrangKiemDinhCSGD />
      </div>
    </div>
  )
}

export default KiemDinhChatLuong
