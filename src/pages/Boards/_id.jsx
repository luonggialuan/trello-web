import Container from '@mui/material/Container'
import AppBar from '~/components/AppBar/AppBar'
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'
import { useEffect } from 'react'
import {
  updateBoardDetailAPI,
  updateColumnDetailAPI,
  moveCardInDifferentColumnAPI
} from '~/api'
import { cloneDeep } from 'lodash'
import { Box, CircularProgress, Typography } from '@mui/material'
import {
  fecthBoardDetailAPI,
  updateCurrentActiveBoard,
  selectCurrentActiveBoard
} from '~/redux/activeBoard/activeBoardSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

function Board() {
  const dispatch = useDispatch()
  // const [board, setBoard] = useState(null)
  const board = useSelector(selectCurrentActiveBoard)
  const { boardId } = useParams()

  useEffect(() => {
    // Dùng react-router-dom để lấy chuẩn boardId từ URL về
    // const boardId = '65e4bccab2843add9c21af92'

    // Call API
    dispatch(fecthBoardDetailAPI(boardId))
  }, [boardId, dispatch])

  // Gọi api và xử lý sau khi kéo thả Column
  const moveColumns = (dndOrderedColumns) => {
    // Update chuẩn dữ liệu state board
    const dndOrderedColumnsIds = dndOrderedColumns.map((c) => c._id)

    // gán lại toàn bộ giá trị bằng 2 mảng mới ko thay đổi trực tiếp giá trị mảng => tương tự dùng concat => ko phạm rules Immutability của Redux
    const newBoard = { ...board }
    newBoard.columns = dndOrderedColumns
    newBoard.columnOrderIds = dndOrderedColumnsIds
    // setBoard(newBoard)
    dispatch(updateCurrentActiveBoard(newBoard))

    // Gọi api update board
    updateBoardDetailAPI(newBoard._id, {
      columnOrderIds: dndOrderedColumnsIds
    })
  }

  // Gọi api cập nhật mảng cardOrderIds của Column chứa nó (thay đổi vị trí trong mảng)
  const moveCardInTheSameColumn = (
    dndOrderedCards,
    dndOrderedCardIds,
    columnId
  ) => {
    // Update chuẩn dữ liệu state Board
    // Error: cannot assign to read-only property 'cards' of object => rules Immutability trong Redux
    // const newBoard = { ...board }
    const newBoard = cloneDeep(board)
    const columnToUpdate = newBoard.columns.find(
      (column) => column._id === columnId
    )

    if (columnToUpdate) {
      columnToUpdate.cards = dndOrderedCards
      columnToUpdate.cardOrderIds = dndOrderedCardIds
    }
    // setBoard(newBoard)
    dispatch(updateCurrentActiveBoard(newBoard))

    // Gọi API update Column
    updateColumnDetailAPI(columnId, { cardOrderIds: dndOrderedCardIds })
  }

  /**
   * Khi di chuyển card sang column khác
   * B1: Cập nhật mảng cardOrderIds của Column ban đầu chứa nó
   * B2: Cập nhật mảng cardOrderIds của Column tiếp theo
   * B3: Cập nhật lại trường columnId mới của card đã kéo
   */
  const moveCardInDifferentColumn = (
    currentCardId,
    prevColumnId,
    nextColumnId,
    dndOrderedColumns
  ) => {
    const dndOrderedColumnsIds = dndOrderedColumns.map((c) => c._id)
    // Tương tự moveColums => ko phạm rules Immutability trong Redux
    const newBoard = { ...board }
    newBoard.columns = dndOrderedColumns
    newBoard.columnOrderIds = dndOrderedColumnsIds
    // setBoard(newBoard)
    dispatch(updateCurrentActiveBoard(newBoard))

    // Fixed
    let prevCardOrderIds = dndOrderedColumns.find(
      (c) => c._id === prevColumnId
    )?.cardOrderIds
    // || []

    // Xử lý khi kéo Card cuối cùng ra khỏi Column => prevColumnId bị sai định dạng ObjectId do đã generate ra 1 _id-placeholder-card
    if (prevCardOrderIds[0].includes('-placeholder-card')) prevCardOrderIds = []

    // Gọi API xử lý phía BE
    moveCardInDifferentColumnAPI({
      currentCardId,
      prevColumnId,
      prevCardOrderIds,
      nextColumnId,
      nextCardOrderIds: dndOrderedColumns.find((c) => c._id === nextColumnId)
        ?.cardOrderIds
    })
  }

  if (!board)
    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 2,
          width: '100vw',
          height: '100vh'
        }}
      >
        <CircularProgress />
        <Typography>Loading Board...</Typography>
      </Box>
    )

  return (
    <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
      <AppBar />
      <BoardBar board={board} />
      <BoardContent
        board={board}
        moveColumns={moveColumns}
        moveCardInTheSameColumn={moveCardInTheSameColumn}
        moveCardInDifferentColumn={moveCardInDifferentColumn}
      />
    </Container>
  )
}

export default Board
