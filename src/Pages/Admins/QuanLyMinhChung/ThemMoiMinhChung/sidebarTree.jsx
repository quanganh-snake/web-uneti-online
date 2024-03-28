import { Checkbox } from '@mui/material'
import { TreeItem } from '@mui/x-tree-view'

export const sidebarTree = (data) => {
  return data.map((item, i) => (
    <TreeItem
      key={i}
      itemId={item.Id}
      label={
        <div>
          <Checkbox />
          {item.Ten}
        </div>
      }
    >
      {item.children?.length ? sidebarTree(item.children) : null}
    </TreeItem>
  ))
}
