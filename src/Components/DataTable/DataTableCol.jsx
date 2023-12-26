import { useBem } from '@/Services/Hooks'
import { useComputed } from '@preact/signals-react'

export const DataTableCol = (props) => {
  const { label, attrs, sticky } = props

  const bem = useBem()

  const className = useComputed(() => {
    return [bem.is('sticky', !!sticky)]
  })

  return (
    <>
      <th className={className} {...attrs}>
        {label}
      </th>
    </>
  )
}

export default DataTableCol
