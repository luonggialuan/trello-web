import axios from 'axios'
import { toast } from 'react-toastify'
import { interceptorLoadingElements } from './formatters'
import { refreshTokenAPI } from '~/api'
import { logoutUserAPI } from '~/redux/user/userSlice'

// https://redux.js.org/faq/code-structure#how-can-i-use-the-redux-store-in-non-component-files
// * How can I use the Redux store in non-component files?

let axiosReduxStore

export const injectStore = (mainStore) => {
  axiosReduxStore = mainStore
}

const TIMEOUT = 1000 * 60 * 10 // * 10 phút
const STATUS_CODE_REFRESH_TOKEN = 410

// * Khởi tạo một đối tượng Axios (authorizeAxiosInstance) mục đích để custom và cấu hình chung cho dự án
let authorizeAxiosInstance = axios.create()

// * Thời gian chờ tối đa của 1 request
authorizeAxiosInstance.defaults.timeout = TIMEOUT

// * withCredentials: cho phép axios tự động gửi cookie trong 1 request lên BE (lưu JWT tokens vào trong httpOnly Cookie của trình duyệt)
authorizeAxiosInstance.defaults.withCredentials = true

/**
 * Cấu hình Interceptors (Bộ đánh chặn giữa request và response)
 * https://axios-http.com/docs/interceptors
 */
// Add a request interceptor
authorizeAxiosInstance.interceptors.request.use(
  (config) => {
    // Do something before request is sent

    // * Kỹ thuật chặn spam click
    interceptorLoadingElements(true)

    return config
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error)
  }
)

// https://www.thedutchlab.com/insights/using-axios-interceptors-for-refreshing-your-api-token
// * Using Axios interceptors for refreshing your API token.
// Gọi refresh-token xong retry lại api
let refreshTokenPromise = null

// Add a response interceptor
authorizeAxiosInstance.interceptors.response.use(
  (response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data

    // * Kỹ thuật chặn spam click
    interceptorLoadingElements(false)

    return response
  },
  // * Lỗi từ BE trả về
  (error) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error

    // * Kỹ thuật chặn spam click
    interceptorLoadingElements(false)

    // Xử lý refresh token tự động
    // Case 1: 403 --> logout
    // if (error.response?.status === 403) {
    //   axiosReduxStore.dispatch(logoutUserAPI(false))
    // }

    // Case 2: 410 --> call refresh-token --> generate new access token
    // Get error request API through error.config
    const originalRequests = error.config

    if (
      error.response?.status === STATUS_CODE_REFRESH_TOKEN &&
      originalRequests
    ) {
      if (!refreshTokenPromise) {
        refreshTokenPromise = refreshTokenAPI()
          .then((data) => {
            return data?.accessToken
          })
          .catch((_error) => {
            // Case 1 --> logout
            axiosReduxStore.dispatch(logoutUserAPI(false))
            return Promise.reject(_error)
          })
          .finally(() => {
            refreshTokenPromise = null
          })
      }

      // eslint-disable-next-line no-unused-vars
      return refreshTokenPromise.then((accessToken) => {
        // Can use accessToken to do something based on case study
        return authorizeAxiosInstance(originalRequests)
      })
    }

    // * Xử lý lỗi tập trung từ API gửi về

    let errorMessage = error?.message

    if (error.response?.data?.message) {
      errorMessage = error.response?.data?.message
    }

    // * Dùng toastify để hiển thị lỗi - Trừ mã lỗi 410 - GONE --> status code refresh token
    if (error.response?.status !== STATUS_CODE_REFRESH_TOKEN) {
      toast.error(errorMessage)
    }
    return Promise.reject(error)
  }
)

export default authorizeAxiosInstance
