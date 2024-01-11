import Accordion from '@/Components/Base/Accordion/Accordion'

export default function KetQuaHocTap() {
  return (
    <>
      <Accordion>
        <Accordion.Label className="bg-red-400">
          Học kỳ 1 (2021 - 2022)
        </Accordion.Label>
        <Accordion.Content className="bg-red-300 mt-1">Content</Accordion.Content>
      </Accordion>

      <Accordion>
        <Accordion.Label className="bg-red-400">
          <div>Học kỳ 1 (2021 - 2022)</div>
        </Accordion.Label>

        <Accordion.Content className="bg-red-300 mt-2">Content</Accordion.Content>
      </Accordion>
    </>
  )
}
