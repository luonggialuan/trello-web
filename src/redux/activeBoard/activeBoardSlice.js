import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import authorizeAxiosInstance from '~/utils/authorizeAxios'
import { isEmpty } from 'lodash'
import { API_ROOT } from '~/utils/constants'
import { generatePlaceholderCard } from '~/utils/formatters'
import { mapOrder } from '~/utils/sorts'

// Khởi tạo giá trị State của 1 slice trong redux
const initialState = {
  currentActiveBoard: null
}

// Các hành động gọi api (bất đồng bộ) và cập nhật dữ liệu vào Redux, dùng Middleware createAsyncThunk đi kèm với extraReducers
// https://redux-toolkit.js.org/api/createAsyncThunk
export const fecthBoardDetailAPI = createAsyncThunk(
  'activeBoard/fecthBoardDetailAPI',
  async (boardId) => {
    const response = await authorizeAxiosInstance.get(
      `${API_ROOT}/v1/boards/${boardId}`
    )
    // axios trả về kết quả về qua property của nó là data
    return response.data
  }
)

// Khởi tạo 1 Slice trong kho lưu trữ Redux
export const activeBoardSlice = createSlice({
  name: 'activeBoard',
  initialState,
  // Reducers: nơi xử lý dữ liệu đồng bộ
  reducers: {
    // https://redux-toolkit.js.org/usage/immer-reducers#redux-toolkit-and-immer
    updateCurrentActiveBoard: (state, action) => {
      const board = action.payload

      // Update lại dữ liệu currentActiveBoard
      state.currentActiveBoard = board
    },
    updateCardInBoard: (state, action) => {
      // https://redux-toolkit.js.org/usage/immer-reducers#updating-nested-data
      // Update nested data
      const updatedCard = action.payload
      const column = state.currentActiveBoard.columns.find(
        (i) => i._id === updatedCard.columnId
      )

      if (column) {
        const card = column.cards.find((c) => c._id === updatedCard._id)
        if (card) {
          // card.title = updatedCard.title
          // // card['title'] = updatedCard['title']

          // Bất kỳ trường nào trong card update thì card trong board cũng update theo
          Object.keys(updatedCard).forEach((key) => {
            card[key] = updatedCard[key]
          })
        }
      }
    }
  },
  // ExtraReducers: Nơi xử lý dữ liệu bất đồng bộ
  extraReducers: (builder) => {
    builder.addCase(fecthBoardDetailAPI.fulfilled, (state, action) => {
      // action.payload ở đây chính là response.data trả về từ api fecthBoardDetailAPI
      let board = action.payload

      board.FE_allUsers = board.owners.concat(board.members)

      // Sắp xếp thứ tự các columns
      board.columns = mapOrder(board.columns, board.columnOrderIds, '_id')

      // Cần xử lý vấn đề kéo thả vào một column rỗng
      board.columns.forEach((column) => {
        if (isEmpty(column.cards)) {
          column.cards = [generatePlaceholderCard(column)]
          column.cardOrderIds = [generatePlaceholderCard(column)._id]
        } else {
          // Sắp xếp thứ tự các cards nếu nó không rỗng
          column.cards = mapOrder(column?.cards, column?.cardOrderIds, '_id')
        }
      })

      // Update lại dữ liệu currentActiveBoard
      state.currentActiveBoard = board
    })
  }
})

// Action creators are generated for each case reducer function
export const { updateCurrentActiveBoard, updateCardInBoard } =
  activeBoardSlice.actions

// Selectors => được gọi từ useSelector() hook để lấy dữ liệu từ trong redux store
export const selectCurrentActiveBoard = (state) => {
  return state.activeBoard.currentActiveBoard
}

// export default activeBoardSlice.reducer
export const activeBoardReducer = activeBoardSlice.reducer
