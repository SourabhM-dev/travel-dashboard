
import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL || 'http://localhost:5173',
  timeout: 15000
})

export default api
