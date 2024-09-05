import axios from 'axios'
import { toast } from 'react-toastify'

import { API_HEADERS, TOKEN_ACCESS_KEY, STORAGE_USER } from '@/core/constants'

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: API_HEADERS
})

// Interceptors on request to inject authorization header
instance.interceptors.request.use(
  request => {
    const token = localStorage.getItem(TOKEN_ACCESS_KEY)

    if (!request.headers) {
      request.headers = API_HEADERS
    }

    if (token) {
      request.headers.Authorization = `Bearer ${token}`
    }

    return request
  },
  error => {
    return Promise.reject(error)
  }
)

// Interceptors on response to handle with diferent scenarios
instance.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    // Unauthenticated
    if (error.response?.status === 401) {
      localStorage.removeItem(TOKEN_ACCESS_KEY)
      localStorage.removeItem(STORAGE_USER)
      window.location.reload()

      toast.warning('Sua sessão expirou, faça o login novamente.')
    }

    return Promise.reject(error.response?.data)
  }
)

const get = (url: string, params?: any) => {
  return instance.get(url, { params: { ...params } })
}

const report = (url: string, params?: any) => {
  return instance.get(url, {
    params: { ...params },
    headers: {
      'Content-Type': 'application/pdf'
    },
    responseType: 'blob'
  })
}

const post = (url: string, data: any) => {
  return instance.post(url, data)
}

const put = (url: string, data: any) => {
  const obj = {
    ...data,
    _method: 'put'
  }

  return instance.post(url, obj)
}

const remove = (url: string) => {
  return instance.delete(url)
}

const upload = (url: string, formData: FormData) => {
  return instance.post(url, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

const api = {
  get,
  report,
  post,
  put,
  remove,
  upload
}

export default api
