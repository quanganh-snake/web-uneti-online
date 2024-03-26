import { Box, Tab, Tabs, Tooltip } from '@mui/material'
import Icon from '@/Components/Base/Icon/Icon'
import { RotateLeft } from '@/Components/Base/Icons/RotateLeft'
import { useNamespace } from '@/Services/Hooks'

import './CauHinhNhiemVu.scss'
import { useState } from 'react'
import QuyTrinhTuDanhGia from '@/Components/KiemDinhChatLuong/DamBaoChatLuong/CauHinhNhiemVu/QuyTrinhTuDanhGia'
import QuyTrinhDanhGiaNgoai from '@/Components/KiemDinhChatLuong/DamBaoChatLuong/CauHinhNhiemVu/QuyTrinhDanhGiaNgoai'
import QuyenDacBiet from '@/Components/KiemDinhChatLuong/DamBaoChatLuong/CauHinhNhiemVu/QuyenDacBiet'

export default function CauHinhNhiemVu() {
  const ns = useNamespace('cau-hinh-nhiem-vu')

  const [tab, setTab] = useState(0)

  const handleChangeTab = (event, tab) => {
    setTab(tab)
  }

  return (
    <div className={`${ns.b()} box`}>
      {/* header */}
      <div className={ns.e('header')}>
        <h3 className={ns.em('header', 'title')}>
          Phân quyền theo nhiệm vụ trong hội đồng tự đánh giá và trong đoàn đánh
          giá ngoài
        </h3>
      </div>

      {/* divider */}
      <div className="uneti-divider" />

      {/* table */}
      <div className={ns.e('main')}>
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
              value={tab}
              onChange={handleChangeTab}
              variant="scrollable"
              aria-label="tab cau hinh nhiem vu"
            >
              <Tab
                label="Quy trình tự đánh giá"
                className={ns.em('tabs', 'tab')}
                id={ns.m('tab-0')}
              />
              <Tab
                label="Quy trình Đánh giá ngoài"
                className={ns.em('tabs', 'tab')}
                id={ns.m('tab-1')}
              />
              <Tab
                label="Quyền đặc biệt"
                className={ns.em('tabs', 'tab')}
                id={ns.m('tab-2')}
              />
            </Tabs>
          </Box>

          <Box sx={{ p: 2, mt: 2 }}>
            <QuyTrinhTuDanhGia tab={tab} index={0} />
            <QuyTrinhDanhGiaNgoai tab={tab} index={1} />
            <QuyenDacBiet tab={tab} index={2} />
          </Box>
        </Box>
      </div>
    </div>
  )
}
