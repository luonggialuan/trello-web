import axios from 'axios'
import { API_ROOT } from '~/utils/constants'

// Tất cả các function bên dưới chỉ request và lấy data từ response mà ko có try-catch
// Lý do ở phía Font-end ko cần thiết vì sẽ dư thừa catch lỗi quá nhiều
// Giải pháp Clean Code là sẽ catch lỗi tập trung tại một nơi
// bằng cách dùng Interceptors từ axios
// Interceptors đánh chặn vào giữa request và response để xử lý logic mà chúng ta muốn
export const fecthBoardDetailAPI = async (boardId) => {
  const response = await axios.get(`${API_ROOT}/v1/boards/${boardId}`)
  // axios trả về kết quả về qua property của nó là data
  return response.data
}
