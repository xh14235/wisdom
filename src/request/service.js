import axios from 'axios'
import store from '@/store/index'

// 环境的切换
if (process.env.NODE_ENV === 'development') {
  axios.defaults.baseURL = '/'
} else if (process.env.NODE_ENV === 'debug') {
  axios.defaults.baseURL = ''
} else if (process.env.NODE_ENV === 'production') {
  axios.defaults.baseURL = 'http://116.236.30.222:9000/'
}

axios.defaults.timeout = 10000

axios.defaults.headers.post['Content-Type'] = 'application/json'

axios.interceptors.request.use(
  config => {
    let token = store.state.token
    // let token = localStorage.token
    config.headers.common['Authorization'] = token
    return config
  },
  error => {
    return Promise.reject(error.response)
  }
)

axios.interceptors.response.use(
  response => {
    if (response.status === 200) {
      return Promise.resolve(response)
    } else {
      return Promise.reject(response)
    }
  }
)

export const get = (url, params) => {
  return new Promise((resolve, reject) => {
    axios.get(url, { params: params }).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err.data)
    })
  })
}

export const post = (url, params) => {
  return new Promise((resolve, reject) => {
    axios.post(url, params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err.data)
    })
  })
}
