import { Box, CircularProgress, Typography } from '@mui/material'

export default function MonHoc({ MaMonHoc, TenMonHoc, icon, children }) {
  return (
    <div className="cursor-pointer rounded-[32px] border-2 border-slate-200 transition-all hover:border-vs-primary hover:shadow-sm duration-200 w-full grid grid-cols-3 p-4 justify-between items-center gap-4">
      <div className="col-span-3 md:col-span-2">
        <div className="flex items-center gap-4">
          <div className="hidden md:block">
            <img src={icon} />
          </div>
          <div className="w-3/4 flex flex-col gap-4">
            <span className="font-semibold">{TenMonHoc}</span>
            <span className="text-sm">{MaMonHoc}</span>
          </div>
        </div>
      </div>
      <div className="col-span-3 md:col-span-1">{children}</div>
    </div>
  )
}
