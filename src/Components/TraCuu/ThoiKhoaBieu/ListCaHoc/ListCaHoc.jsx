import LichBieu from '../LichBieu/LichBieu'

export default function ListCaHoc(props) {
  const { CaHoc, LichHoc } = props

  return (
    <div className="flex min-h-[300px]">
      <div className="flex flex-col w-60 bg-uneti-primary text-white">
        <div className="w-[100px] font-semibold flex justify-center items-center h-full border-b border-r border-b-white border-opacity-30">
          {CaHoc}
        </div>
      </div>
      {LichHoc.map((e, i) => {
        return (
          <div
            className="flex flex-col w-60 min-w-[220px] py-2 px-2 border-b border-r border-vs-text border-opacity-30 last:border-r-0"
            key={`c-col-${i}`}
          >
            <div className="flex flex-col gap-4">
              {e.length
                ? e.map((x) => <LichBieu key={x.MaLopHocPhan} {...x} />)
                : null}
            </div>
          </div>
        )
      })}
    </div>
  )
}
