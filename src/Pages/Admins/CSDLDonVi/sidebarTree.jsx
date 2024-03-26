import { TreeItem } from '@mui/x-tree-view'

export const sidebarTree = (data) => {
  return data.map((item) => (
    <TreeItem key={item.Id} itemId={item.Id} label={item.TenTiengViet}>
      {item.children?.length ? sidebarTree(item.children) : null}
    </TreeItem>
  ))
}
