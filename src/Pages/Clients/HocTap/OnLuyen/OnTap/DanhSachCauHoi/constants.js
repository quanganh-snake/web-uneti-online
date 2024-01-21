export const home = {
  path: '/hoctap',
  title: 'Học tập',
}

export const breadcrumbs = [
  {
    path: '/hoctap/onluyen',
    title: 'Ôn luyện',
  },
  {
    path: '/hoctap/onluyen/ontap',
    title: 'Ôn tập',
  },
]

export const sidebar = [
  {
    name: '/hoctap/ketquahoctap',
    label: 'Kết quả học tập',
  },
  {
    name: '/hoctap/onluyen',
    label: 'Ôn luyện',
    children: [
      {
        name: '/ontap',
        label: 'Ôn tập',
      },
      {
        name: '/thithu',
        label: 'Thi thử',
      },
    ],
  },
]
