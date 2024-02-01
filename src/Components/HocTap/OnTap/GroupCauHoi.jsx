import CauHoi from './CauHoi'

export default function GroupCauHoi({ question, isFinished }) {
  return (
    <div
      id={question[0].IDCauHoiCha}
      key={`question-parent-${question[0].IDCauHoiCha}`}
      className="p-6 rounded-[26px] border-2 border-slate-200 flex flex-col gap-4 transition-all hover:border-opacity-90"
    >
      <div className="flex items-start gap-2 flex-wrap">
        {/* Câu hỏi ${(currentPage - 1) * pageSize + index + 1}: */}
        <div
          className="flex-1 mt-[2px]"
          dangerouslySetInnerHTML={{
            __html: `<span class="text-vs-danger font-bold whitespace-nowrap">
                            
                          </span> ${question[0].CauHoiCha}`,
          }}
        />
      </div>

      {question.map((child) => {
        return (
          <CauHoi
            key={`p-question-${child.STT}`}
            {...child}
            disabled={isFinished}
            isFinished={isFinished}
          />
        )
      })}
    </div>
  )
}
