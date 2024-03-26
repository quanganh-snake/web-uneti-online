import React from 'react'
import PropTypes from 'prop-types'
import { useNamespace } from '@/Services/Hooks'
import ChartKiemDinhCTDT from './ChartTinhTrangKiemDinh/ChartKiemDinhCTDT'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import Typography from '@mui/material/Typography'
import { FaAngleDown } from 'react-icons/fa6'

const TinhTrangKiemDinhCTDT = (props) => {
  const ns = useNamespace('tt-kiemdinh-ctdt')
  return (
    <>
      <div
        className={[
          ns.b('header'),
          ' my-10 flex items-center justify-between bg-uneti-primary p-2 text-white',
        ]}
      >
        <p className="font-bold uppercase">
          Tình trạng kiểm định chương trình đào tạo
        </p>
        <p>Chi tiết</p>
      </div>
      <div className={[ns.b('content')]}>
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 lg:col-span-6">
            <div className={[ns.e('chart'), ' p-1']}>
              <ChartKiemDinhCTDT />
            </div>
          </div>
          {/* END: Item Left */}
          <div className="col-span-12 lg:col-span-6">
            <div className={[ns.e('audit'), ' p-1']}>
              <p className={[ns.em('audit', 'title'), ' mb-4 font-semibold']}>
                Tổng số CTĐT đang hoạt động:{' '}
                <span className="text-blue-500">20</span>
              </p>
              <p className="mb-4">Trong đó:</p>
              <div className="bg-uneti-primary/40 p-1">
                <Accordion defaultExpanded={true}>
                  <AccordionSummary
                    expandIcon={<FaAngleDown />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                    style={{
                      flexDirection: 'row-reverse',
                      justifyContent: 'space-between',
                      gap: 10,
                    }}
                  >
                    <Typography
                      sx={{ width: '40%', flexShrink: 0, fontWeight: '700' }}
                    >
                      Tổng số CTĐT đã ĐGN:
                    </Typography>
                    <Typography
                      sx={{
                        width: '40%',
                        flexShrink: 0,
                        fontWeight: '700',
                        color: '#0ea5e9',
                      }}
                    >
                      0 (0&#37;)
                    </Typography>
                    <button style={{ width: '20%' }}>Xem chi tiết</button>
                  </AccordionSummary>
                  <AccordionDetails>
                    {/* START: Bậc đại học */}
                    <div className="flex items-center px-20">
                      <Typography
                        sx={{ width: '40%', flexShrink: 0, fontWeight: '700' }}
                      >
                        &#8226; Bậc đại học:
                      </Typography>
                      <Typography
                        sx={{ width: '50%', flexShrink: 0, fontWeight: '700' }}
                      >
                        0
                      </Typography>
                    </div>
                    {/* END: Bậc đại học */}

                    {/* START: Bậc thạc sĩ */}
                    <div className="flex items-center px-20">
                      <Typography
                        sx={{ width: '40%', flexShrink: 0, fontWeight: '700' }}
                      >
                        &#8226; Bậc thạc sĩ:
                      </Typography>
                      <Typography
                        sx={{ width: '50%', flexShrink: 0, fontWeight: '700' }}
                      >
                        0
                      </Typography>
                    </div>
                    {/* END: Bậc thạc sĩ */}

                    {/* START: Bậc tiến sĩ */}
                    <div className="flex items-center px-20">
                      <Typography
                        sx={{ width: '40%', flexShrink: 0, fontWeight: '700' }}
                      >
                        &#8226; Bậc tiến sĩ:
                      </Typography>
                      <Typography
                        sx={{ width: '50%', flexShrink: 0, fontWeight: '700' }}
                      >
                        0
                      </Typography>
                    </div>
                    {/* END: Bậc tiến sĩ */}
                  </AccordionDetails>
                </Accordion>
                {/* END: Audit Item 1 */}
                <Accordion>
                  <AccordionSummary
                    expandIcon={<FaAngleDown />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                    style={{
                      flexDirection: 'row-reverse',
                      justifyContent: 'space-between',
                      gap: 10,
                    }}
                  >
                    <Typography
                      sx={{ width: '40%', flexShrink: 0, fontWeight: '700' }}
                    >
                      Tổng số CTĐT đã ĐGN:
                    </Typography>
                    <Typography
                      sx={{
                        width: '40%',
                        flexShrink: 0,
                        fontWeight: '700',
                        color: '#0ea5e9',
                      }}
                    >
                      0 (0&#37;)
                    </Typography>
                    <button style={{ width: '20%' }}>Xem chi tiết</button>
                  </AccordionSummary>
                  <AccordionDetails>
                    {/* START: Bậc đại học */}
                    <div className="flex items-center px-20">
                      <Typography
                        sx={{ width: '40%', flexShrink: 0, fontWeight: '700' }}
                      >
                        &#8226; Bậc đại học:
                      </Typography>
                      <Typography
                        sx={{ width: '50%', flexShrink: 0, fontWeight: '700' }}
                      >
                        0
                      </Typography>
                    </div>
                    {/* END: Bậc đại học */}

                    {/* START: Bậc thạc sĩ */}
                    <div className="flex items-center px-20">
                      <Typography
                        sx={{ width: '40%', flexShrink: 0, fontWeight: '700' }}
                      >
                        &#8226; Bậc thạc sĩ:
                      </Typography>
                      <Typography
                        sx={{ width: '50%', flexShrink: 0, fontWeight: '700' }}
                      >
                        0
                      </Typography>
                    </div>
                    {/* END: Bậc thạc sĩ */}

                    {/* START: Bậc tiến sĩ */}
                    <div className="flex items-center px-20">
                      <Typography
                        sx={{ width: '40%', flexShrink: 0, fontWeight: '700' }}
                      >
                        &#8226; Bậc tiến sĩ:
                      </Typography>
                      <Typography
                        sx={{ width: '50%', flexShrink: 0, fontWeight: '700' }}
                      >
                        0
                      </Typography>
                    </div>
                    {/* END: Bậc tiến sĩ */}
                  </AccordionDetails>
                </Accordion>
                {/* END: Audit Item 2 */}
                <Accordion>
                  <AccordionSummary
                    expandIcon={<FaAngleDown />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                    style={{
                      flexDirection: 'row-reverse',
                      justifyContent: 'space-between',
                      gap: 10,
                    }}
                  >
                    <Typography
                      sx={{ width: '40%', flexShrink: 0, fontWeight: '700' }}
                    >
                      Tổng số CTĐT đã ĐGN:
                    </Typography>
                    <Typography
                      sx={{
                        width: '40%',
                        flexShrink: 0,
                        fontWeight: '700',
                        color: '#0ea5e9',
                      }}
                    >
                      0 (0&#37;)
                    </Typography>
                    <button style={{ width: '20%' }}>Xem chi tiết</button>
                  </AccordionSummary>
                  <AccordionDetails>
                    {/* START: Bậc đại học */}
                    <div className="flex items-center px-20">
                      <Typography
                        sx={{ width: '40%', flexShrink: 0, fontWeight: '700' }}
                      >
                        &#8226; Bậc đại học:
                      </Typography>
                      <Typography
                        sx={{ width: '50%', flexShrink: 0, fontWeight: '700' }}
                      >
                        0
                      </Typography>
                    </div>
                    {/* END: Bậc đại học */}

                    {/* START: Bậc thạc sĩ */}
                    <div className="flex items-center px-20">
                      <Typography
                        sx={{ width: '40%', flexShrink: 0, fontWeight: '700' }}
                      >
                        &#8226; Bậc thạc sĩ:
                      </Typography>
                      <Typography
                        sx={{ width: '50%', flexShrink: 0, fontWeight: '700' }}
                      >
                        0
                      </Typography>
                    </div>
                    {/* END: Bậc thạc sĩ */}

                    {/* START: Bậc tiến sĩ */}
                    <div className="flex items-center px-20">
                      <Typography
                        sx={{ width: '40%', flexShrink: 0, fontWeight: '700' }}
                      >
                        &#8226; Bậc tiến sĩ:
                      </Typography>
                      <Typography
                        sx={{ width: '50%', flexShrink: 0, fontWeight: '700' }}
                      >
                        0
                      </Typography>
                    </div>
                    {/* END: Bậc tiến sĩ */}
                  </AccordionDetails>
                </Accordion>
                {/* END: Audit Item 3 */}
                <Accordion>
                  <AccordionSummary
                    expandIcon={<FaAngleDown />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                    style={{
                      flexDirection: 'row-reverse',
                      justifyContent: 'space-between',
                      gap: 10,
                    }}
                  >
                    <Typography
                      sx={{ width: '40%', flexShrink: 0, fontWeight: '700' }}
                    >
                      Tổng số CTĐT đã ĐGN:
                    </Typography>
                    <Typography
                      sx={{
                        width: '40%',
                        flexShrink: 0,
                        fontWeight: '700',
                        color: '#0ea5e9',
                      }}
                    >
                      0 (0&#37;)
                    </Typography>
                    <button style={{ width: '20%' }}>Xem chi tiết</button>
                  </AccordionSummary>
                  <AccordionDetails>
                    {/* START: Bậc đại học */}
                    <div className="flex items-center px-20">
                      <Typography
                        sx={{ width: '40%', flexShrink: 0, fontWeight: '700' }}
                      >
                        &#8226; Bậc đại học:
                      </Typography>
                      <Typography
                        sx={{ width: '50%', flexShrink: 0, fontWeight: '700' }}
                      >
                        0
                      </Typography>
                    </div>
                    {/* END: Bậc đại học */}

                    {/* START: Bậc thạc sĩ */}
                    <div className="flex items-center px-20">
                      <Typography
                        sx={{ width: '40%', flexShrink: 0, fontWeight: '700' }}
                      >
                        &#8226; Bậc thạc sĩ:
                      </Typography>
                      <Typography
                        sx={{ width: '50%', flexShrink: 0, fontWeight: '700' }}
                      >
                        0
                      </Typography>
                    </div>
                    {/* END: Bậc thạc sĩ */}

                    {/* START: Bậc tiến sĩ */}
                    <div className="flex items-center px-20">
                      <Typography
                        sx={{ width: '40%', flexShrink: 0, fontWeight: '700' }}
                      >
                        &#8226; Bậc tiến sĩ:
                      </Typography>
                      <Typography
                        sx={{ width: '50%', flexShrink: 0, fontWeight: '700' }}
                      >
                        0
                      </Typography>
                    </div>
                    {/* END: Bậc tiến sĩ */}
                  </AccordionDetails>
                </Accordion>
                {/* END: Audit Item 4 */}
                <Accordion>
                  <AccordionSummary
                    expandIcon={<FaAngleDown />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                    style={{
                      flexDirection: 'row-reverse',
                      justifyContent: 'space-between',
                      gap: 10,
                    }}
                  >
                    <Typography
                      sx={{ width: '40%', flexShrink: 0, fontWeight: '700' }}
                    >
                      Tổng số CTĐT đủ đk kiểm định:
                    </Typography>
                    <Typography
                      sx={{
                        width: '40%',
                        flexShrink: 0,
                        fontWeight: '700',
                        color: '#0ea5e9',
                      }}
                    >
                      0 (0&#37;)
                    </Typography>
                    <button style={{ width: '20%' }}>Xem chi tiết</button>
                  </AccordionSummary>
                  <AccordionDetails>
                    {/* START: Bậc đại học */}
                    <div className="flex items-center px-20">
                      <Typography
                        sx={{ width: '40%', flexShrink: 0, fontWeight: '700' }}
                      >
                        &#8226; Bậc đại học:
                      </Typography>
                      <Typography
                        sx={{ width: '50%', flexShrink: 0, fontWeight: '700' }}
                      >
                        0
                      </Typography>
                    </div>
                    {/* END: Bậc đại học */}

                    {/* START: Bậc thạc sĩ */}
                    <div className="flex items-center px-20">
                      <Typography
                        sx={{ width: '40%', flexShrink: 0, fontWeight: '700' }}
                      >
                        &#8226; Bậc thạc sĩ:
                      </Typography>
                      <Typography
                        sx={{ width: '50%', flexShrink: 0, fontWeight: '700' }}
                      >
                        0
                      </Typography>
                    </div>
                    {/* END: Bậc thạc sĩ */}

                    {/* START: Bậc tiến sĩ */}
                    <div className="flex items-center px-20">
                      <Typography
                        sx={{ width: '40%', flexShrink: 0, fontWeight: '700' }}
                      >
                        &#8226; Bậc tiến sĩ:
                      </Typography>
                      <Typography
                        sx={{ width: '50%', flexShrink: 0, fontWeight: '700' }}
                      >
                        0
                      </Typography>
                    </div>
                    {/* END: Bậc tiến sĩ */}
                  </AccordionDetails>
                </Accordion>
                {/* END: Audit Item 5 */}
                <Accordion>
                  <AccordionSummary
                    expandIcon={<FaAngleDown />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                    style={{
                      flexDirection: 'row-reverse',
                      justifyContent: 'space-between',
                      gap: 10,
                    }}
                  >
                    <Typography
                      sx={{ width: '40%', flexShrink: 0, fontWeight: '700' }}
                    >
                      Tổng số CTĐT đến hạn kiểm định:
                    </Typography>
                    <Typography
                      sx={{
                        width: '40%',
                        flexShrink: 0,
                        fontWeight: '700',
                        color: '#0ea5e9',
                      }}
                    >
                      0 (0&#37;)
                    </Typography>
                    <button style={{ width: '20%' }}>Xem chi tiết</button>
                  </AccordionSummary>
                  <AccordionDetails>
                    {/* START: Bậc đại học */}
                    <div className="flex items-center px-20">
                      <Typography
                        sx={{ width: '40%', flexShrink: 0, fontWeight: '700' }}
                      >
                        &#8226; Bậc đại học:
                      </Typography>
                      <Typography
                        sx={{ width: '50%', flexShrink: 0, fontWeight: '700' }}
                      >
                        0
                      </Typography>
                    </div>
                    {/* END: Bậc đại học */}

                    {/* START: Bậc thạc sĩ */}
                    <div className="flex items-center px-20">
                      <Typography
                        sx={{ width: '40%', flexShrink: 0, fontWeight: '700' }}
                      >
                        &#8226; Bậc thạc sĩ:
                      </Typography>
                      <Typography
                        sx={{ width: '50%', flexShrink: 0, fontWeight: '700' }}
                      >
                        0
                      </Typography>
                    </div>
                    {/* END: Bậc thạc sĩ */}

                    {/* START: Bậc tiến sĩ */}
                    <div className="flex items-center px-20">
                      <Typography
                        sx={{ width: '40%', flexShrink: 0, fontWeight: '700' }}
                      >
                        &#8226; Bậc tiến sĩ:
                      </Typography>
                      <Typography
                        sx={{ width: '50%', flexShrink: 0, fontWeight: '700' }}
                      >
                        0
                      </Typography>
                    </div>
                    {/* END: Bậc tiến sĩ */}
                  </AccordionDetails>
                </Accordion>
                {/* END: Audit Item 6 */}
                <Accordion>
                  <AccordionSummary
                    expandIcon={<FaAngleDown />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                    style={{
                      flexDirection: 'row-reverse',
                      justifyContent: 'space-between',
                      gap: 10,
                    }}
                  >
                    <Typography
                      sx={{ width: '40%', flexShrink: 0, fontWeight: '700' }}
                    >
                      Tổng số CTĐT chưa đủ đk kiểm định::
                    </Typography>
                    <Typography
                      sx={{
                        width: '40%',
                        flexShrink: 0,
                        fontWeight: '700',
                        color: '#0ea5e9',
                      }}
                    >
                      0 (0&#37;)
                    </Typography>
                    <button style={{ width: '20%' }}>Xem chi tiết</button>
                  </AccordionSummary>
                  <AccordionDetails>
                    {/* START: Bậc đại học */}
                    <div className="flex items-center px-20">
                      <Typography
                        sx={{ width: '40%', flexShrink: 0, fontWeight: '700' }}
                      >
                        &#8226; Bậc đại học:
                      </Typography>
                      <Typography
                        sx={{ width: '50%', flexShrink: 0, fontWeight: '700' }}
                      >
                        0
                      </Typography>
                    </div>
                    {/* END: Bậc đại học */}

                    {/* START: Bậc thạc sĩ */}
                    <div className="flex items-center px-20">
                      <Typography
                        sx={{ width: '40%', flexShrink: 0, fontWeight: '700' }}
                      >
                        &#8226; Bậc thạc sĩ:
                      </Typography>
                      <Typography
                        sx={{ width: '50%', flexShrink: 0, fontWeight: '700' }}
                      >
                        0
                      </Typography>
                    </div>
                    {/* END: Bậc thạc sĩ */}

                    {/* START: Bậc tiến sĩ */}
                    <div className="flex items-center px-20">
                      <Typography
                        sx={{ width: '40%', flexShrink: 0, fontWeight: '700' }}
                      >
                        &#8226; Bậc tiến sĩ:
                      </Typography>
                      <Typography
                        sx={{ width: '50%', flexShrink: 0, fontWeight: '700' }}
                      >
                        0
                      </Typography>
                    </div>
                    {/* END: Bậc tiến sĩ */}
                  </AccordionDetails>
                </Accordion>
                {/* END: Audit Item 7 */}
              </div>
            </div>
          </div>
          {/* END: Item Right */}
        </div>
      </div>
    </>
  )
}

TinhTrangKiemDinhCTDT.propTypes = {}

export default TinhTrangKiemDinhCTDT
