/**
 * API EMAIL UNETI
 */

import http from '../../Configs/http.js'
// POST
export const apiSendEmailUNETI = async (data = {}) => {
  try {
    const res = await http.post(`send-email/Verifier`, data)
    return res
  } catch (error) {
    console.log(error)
  }
}
