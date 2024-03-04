import Container from '@mui/material/Container'
import AppBar from '~/components/AppBar/AppBar'
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'
// import { mockData } from '~/api/mock-data'
import { useEffect, useState } from 'react'
import {
  fecthBoardDetailAPI,
  createNewColumnAPI,
  createNewCardAPI
} from '~/api'

function Board() {
  const [board, setBoard] = useState(null)

  useEffect(() => {
    // Dùng react-router-dom để lấy chuẩn boardId từ URL về
    const boardId = '65e4bccab2843add9c21af92'

    // Call API
    fecthBoardDetailAPI(boardId).then((board) => {
      setBoard(board)
    })
  }, [])

  // Gọi API tạo mới Column và làm lại dữ liệu State Board
  const createNewColumn = async (newColumnData) => {
    const createdColumn = await createNewColumnAPI({
      ...newColumnData,
      boardId: board._id
    })

    // Cập nhật lại state board
  }

  // Gọi API tạo mới Card và làm lại dữ liệu State Board
  const createNewCard = async (newCardData) => {
    const createdCard = await createNewCardAPI({
      ...newCardData,
      boardId: board._id
    })

    // Cập nhật lại state board
  }

  return (
    <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
      <AppBar />
      <BoardBar board={board} />
      <BoardContent
        board={board}
        createNewColumn={createNewColumn}
        createNewCard={createNewCard}
      />
    </Container>
  )
}

export default Board
