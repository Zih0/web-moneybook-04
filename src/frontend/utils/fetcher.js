import { closeLoading, openLoading } from './modal.js'

const BASE_URL = 'http://localhost:3000/api'

const HTTP_METHOD = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
}

const loadingWrapper = async (fn) => {
  openLoading()
  const response = await fn()
  closeLoading()
  return response
}

const fetchWrapper = async (url, method, body) => {
  try {
    const res = await fetch(BASE_URL + url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: body ? JSON.stringify(body) : undefined,
    })

    if (!res.ok) {
      throw res.json()
    }

    return await res.json()
  } catch (err) {
    const { message } = err

    return message
  }
}

const fetcher = {
  get: (url) => loadingWrapper(() => fetchWrapper(url, HTTP_METHOD.GET)),
  post: (url, body) => fetchWrapper(url, HTTP_METHOD.POST, body),
  put: (url, body) => fetchWrapper(url, HTTP_METHOD.PUT, body),
  delete: (url, body) => fetchWrapper(url, HTTP_METHOD.DELETE),
}

export default fetcher
