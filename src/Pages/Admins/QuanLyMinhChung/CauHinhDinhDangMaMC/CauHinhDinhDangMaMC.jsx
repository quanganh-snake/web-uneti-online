import Button from '@/Components/Base/Button/Button'
import Col from '@/Components/Base/Col/Col'
import Icon from '@/Components/Base/Icon/Icon'
import Row from '@/Components/Base/Row/Row'
import { useNamespace } from '@/Services/Hooks'
import { BiPencil } from 'react-icons/bi'

export default function CauHinhDinhDangMaMC() {
  const ns = useNamespace('kiem-dinh-chat-luong')

  return (
    <Row gutter={10}>
      <Col span={12} md={8}>
        <div className="box">
          <div className={ns.e('header')}>
            <h3 className={ns.em('header', 'title')}>
              Danh sách cấu hình mã minh chứng
            </h3>
          </div>

          <div className="uneti-divider" />

          <table className="border w-full">
            <thead>
              <tr>
                <th className="th">Bộ tiêu chuẩn</th>
                <th className="th">Định dạng mã minh chứng cốt lõi</th>
                <th className="th">Định dạng mã minh chứng phổ thông</th>
                <th className="th">Tác vụ</th>
              </tr>
            </thead>
            <tbody>
              <tr className="tr">
                <td colSpan={4} className="td">
                  CTĐT
                </td>
              </tr>
              <tr className="tr">
                <td className="td">Bộ GD&ĐT</td>
                <td className="td">[STT-MC]</td>
                <td className="td">[TCN].[TC].[STT-MC]</td>
                <td className="td">
                  <div className="flex items-center justify-center">
                    <Button type="transparent" icon>
                      <Icon>
                        <BiPencil />
                      </Icon>
                    </Button>
                  </div>
                </td>
              </tr>
              <tr className="tr">
                <td className="td">AUN-QA</td>
                <td className="td">[STT-MC]</td>
                <td className="td">[TCN].[TC].[STT-MC]</td>
                <td className="td">
                  <div className="flex items-center justify-center">
                    <Button type="transparent" icon>
                      <Icon>
                        <BiPencil />
                      </Icon>
                    </Button>
                  </div>
                </td>
              </tr>
              <tr>
                <td colSpan={4} className="td">
                  CTĐT
                </td>
              </tr>
              <tr className="tr">
                <td className="td">Bộ GD&ĐT</td>
                <td className="td">[STT-MC]</td>
                <td className="td">[TCN].[TC].[STT-MC]</td>
                <td className="td">
                  <div className="flex items-center justify-center">
                    <Button type="transparent" icon>
                      <Icon>
                        <BiPencil />
                      </Icon>
                    </Button>
                  </div>
                </td>
              </tr>
              <tr className="tr">
                <td className="td">AUN-QA</td>
                <td className="td">[STT-MC]</td>
                <td className="td">[TCN].[TC].[STT-MC]</td>
                <td className="td">
                  <div className="flex items-center justify-center">
                    <Button type="transparent" icon>
                      <Icon>
                        <BiPencil />
                      </Icon>
                    </Button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Col>
      <Col span={12} md={4}>
        <div className="box">
          <div className={ns.e('header')}>
            <h3 className={ns.em('header', 'title')}>Chú thích</h3>
          </div>

          <div className="uneti-divider" />

          <table className="border w-full">
            <thead>
              <tr>
                <th className="th">Quy ước</th>
                <th className="th">Ý nghĩa</th>
              </tr>
            </thead>
            <tbody>
              <tr className="tr">
                <td className="td">[TCN]</td>
                <td className="td">Số thứ tự tiêu chuẩn</td>
              </tr>
              <tr className="tr">
                <td className="td">[TC]</td>
                <td className="td">Số thứ tự tiêu chí</td>
              </tr>
              <tr className="tr">
                <td className="td">[STT-MC]</td>
                <td className="td">Số thứ tự minh chứng</td>
              </tr>
              <tr className="tr">
                <td className="td">[TCN-H]</td>
                <td className="td">Số thứ tự hộp</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Col>
    </Row>
  )
}
