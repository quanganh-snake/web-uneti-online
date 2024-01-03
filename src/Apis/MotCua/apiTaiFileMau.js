import http from '@/Configs/http'

export const downloadFileById = (fileId) =>
  http.get('SP_HT_HPTD/VBM_Load_ID', {
    params: {
      VBM_ID: fileId,
    },
  })
