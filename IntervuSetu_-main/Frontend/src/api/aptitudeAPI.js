import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

const api = axios.create({
  baseURL: `${API_URL}/aptitude`,
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

export const startAptitudeTest = (data) => api.post('/start', data)
export const checkAptitudeAvailability = (data) => api.post('/check-availability', data)
export const submitAptitudeTest = (attemptId, data) => api.post(`/${attemptId}/submit`, data)
export const getAptitudeReport = (attemptId) => api.get(`/${attemptId}/report`)
export const getAptitudeHistory = () => api.get('/history')
export const getAptitudeCompanies = () => api.get('/companies')
export const getAptitudeTopics = () => api.get('/topics')

export const downloadAptitudePDF = async (attemptId, filename) => {
  const res = await api.get(`/${attemptId}/pdf`, { responseType: 'blob' })
  const url = URL.createObjectURL(new Blob([res.data], { type: 'application/pdf' }))
  const a   = document.createElement('a')
  a.href    = url
  a.download = filename || `aptitude_report_${attemptId}.pdf`
  a.click()
  URL.revokeObjectURL(url)
}
