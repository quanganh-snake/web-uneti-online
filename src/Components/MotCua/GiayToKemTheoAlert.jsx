import { Alert } from '../Alert/Alert'

export const GiayToKemTheoAlert = (props) => {
  const { downloadLink, downloadText } = props

  const handleDownloadFile = () => {
    console.log(downloadLink)
  }

  return (
    <>
      <Alert
        type='warn'
        title='GHI CHÚ: ĐỐI VỚI CÁC CHỨC NĂNG BỊ GIỚI HẠN KHÔNG CHO PHÉP ĐỀ NGHỊ TRỰC
        TUYẾN, NGƯỜI HỌC CẦN ĐẾN BỘ PHẬN MỘT CỬA ĐỂ ĐỀ NGHỊ TRỰC TIẾP.'
        content={
          <>
            <p>Các giấy tờ kèm theo (click vào tên giấy tờ để tải file):</p>
            <p>
              1. Mẫu đề nghị giải quyết thủ tục hành chính:
              <span
                className='cursor-pointer text-[#245D7C] underline font-semibold px-2 hover:text-[#0056b3] duration-200'
                onClick={handleDownloadFile}
              >
                {downloadText}
              </span>
              (Người học cần in, điền thông tin vào mẫu và nộp tại bộ phận Một
              cửa hoặc đến trực tiếp bộ phận Một cửa để lấy mẫu đề nghị giải
              quyết thủ tục hành chính).
            </p>
            <p>
              2. Mẫu giấy tờ kèm theo đề nghị (nếu trong đề nghị yêu cầu), người
              học tải file mẫu tại địa chỉ sau{' '}
              <a
                className='text-[#245D7C] hover:text-[#0056b3] duration-200'
                href='https://uneti.edu.vn/bieu-mau-bo-phan-hanh-chinh-mot-cua/'
              >
                https://uneti.edu.vn/bieu-mau-bo-phan-hanh-chinh-mot-cua/
              </a>
            </p>
          </>
        }
      />
    </>
  )
}
