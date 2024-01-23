import { Box, CircularProgress, Typography } from '@mui/material'
import iconOnLuyen from '@/assets/Icons/icon-onluyen.png'

export default function MonHoc({
  MaMonHoc,
  TenMonHoc,
  SoCauDaLam,
  TongCauHoi,
}) {
  return (
    <div className="cursor-pointer rounded-[32px] border-2 border-slate-200 transition-all hover:border-vs-primary hover:shadow-sm duration-200 w-full flex p-4 justify-between items-center gap-4">
      <div className="hidden md:block">
        <img src={iconOnLuyen} />
      </div>
      <div className="flex-1 flex flex-col gap-4">
        <span className="font-semibold">{TenMonHoc}</span>
        <span className="text-sm">Mã môn học: {MaMonHoc}</span>
      </div>
      <div>
        <Box
          sx={{
            position: 'relative',
            display: 'inline-flex',
          }}
        >
          <CircularProgress
            variant="determinate"
            value={Math.round((SoCauDaLam / TongCauHoi) * 100)}
          />
          <Box
            sx={{
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              position: 'absolute',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography
              variant="caption"
              component="div"
              color="text.secondary"
            >
              {`${Math.round((SoCauDaLam / TongCauHoi) * 100)}%`}
            </Typography>
          </Box>
        </Box>
      </div>
    </div>
  )
}