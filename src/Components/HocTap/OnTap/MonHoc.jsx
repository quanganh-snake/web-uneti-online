import { Box, CircularProgress, Typography } from '@mui/material'

export default function MonHoc({ MaMonHoc, TenMonHoc, icon, children }) {
  return (
    <div className="cursor-pointer rounded-[32px] border-2 border-slate-200 transition-all hover:border-vs-primary hover:shadow-sm duration-200 w-full flex p-4 justify-between items-center gap-4">
      <div className="hidden md:block">
        <img src={icon} />
      </div>
      <div className="flex-1 flex flex-col gap-4">
        <span className="font-semibold">{TenMonHoc}</span>
        <span className="text-sm">{MaMonHoc}</span>
      </div>
      <div>{children}</div>
    </div>
  )
}
