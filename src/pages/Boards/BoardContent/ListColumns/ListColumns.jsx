import Box from '@mui/material/Box'
import Column from './Column/Column'
import Button from '@mui/material/Button'
import NoteAddIcon from '@mui/icons-material/NoteAdd'
import {
  SortableContext,
  horizontalListSortingStrategy
} from '@dnd-kit/sortable'
import { useState } from 'react'
import { toast } from 'react-toastify'
import TextField from '@mui/material/TextField'
import CloseIcon from '@mui/icons-material/Close'
import LoadingCreateColumn from './Column/LoadingCreateColumn'
import { createNewColumnAPI } from '~/api'
import { generatePlaceholderCard } from '~/utils/formatters'
import { cloneDeep } from 'lodash'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectCurrentActiveBoard,
  updateCurrentActiveBoard
} from '~/redux/activeBoard/activeBoardSlice'

function ListColumns({ columns }) {
  const dispatch = useDispatch()
  const board = useSelector(selectCurrentActiveBoard)

  const [openNewColumnForm, setOpenNewColumnForm] = useState(false)
  const toggleOpenNewColumnForm = () => setOpenNewColumnForm(!openNewColumnForm)

  const [newColumnTitle, setNewColumnTitle] = useState('')
  const [isLoadingCreate, setIsLoadingCreate] = useState(false)

  const addNewColumn = async () => {
    setIsLoadingCreate(true)
    if (!newColumnTitle) {
      toast.error('Please enter column title')
      return
    }

    // Tạo dữ liệu Column để gọi API
    const newColumnData = {
      title: newColumnTitle
    }
    // Đóng trạng thái thêm Column mới & Clear Input
    toggleOpenNewColumnForm()
    setNewColumnTitle('')

    // Gọi API tạo mới Column và làm lại dữ liệu State Board
    const createdColumn = await createNewColumnAPI({
      ...newColumnData,
      boardId: board._id
    })

    // Khi tạo column mới thì nó sẽ chưa có card, cần xử lý vấn đề kéo thả vào một column rỗng
    createdColumn.cards = [generatePlaceholderCard(createdColumn)]
    createdColumn.cardOrderIds = [generatePlaceholderCard(createdColumn)._id]

    // Cập nhật lại state board
    // Phía Font-end tự làm lại đúng state data board thay vì phải gọi lại api

    // Error: object is not extensible
    // spread operator => Shallow Copy/Clone =x rules Immutability trong Redux Toolkit => can not use push
    // https://stackoverflow.com/questions/184710/what-is-the-difference-between-a-deep-copy-and-a-shallow-copy
    // https://redux-toolkit.js.org/usage/immer-reducers
    // https://redux.js.org/tutorials/fundamentals/part-6-async-logic
    // const newBoard = { ...board }
    // * C1: use cloneDeep of lodash
    const newBoard = cloneDeep(board)
    newBoard.columns.push(createdColumn)
    newBoard.columnOrderIds.push(createdColumn._id)

    // * C2: use array.concat thay cho push
    // * push thay đổi mảng trực tiếp
    // * concat merge - ghép mảng lại => tạo mảng mới
    // const newBoard = cloneDeep(board)
    // newBoard.columns = newBoard.columns.concat([createdColumn])
    // newBoard.columnOrderIds = newBoard.columnOrderIds.concat([
    //   createdColumn._id
    // ])

    dispatch(updateCurrentActiveBoard(newBoard))

    setIsLoadingCreate(false)
  }
  // The <SortableContext> component requires that you pass it the sorted array of the unique identifiers associated to each sortable item via the items prop. This array should look like ["1", "2", "3"], not [{id: "1"}, {id: "2}, {id: "3}].
  // https://github.com/clauderic/dnd-kit/issues/183#issuecomment-812569512
  return (
    <SortableContext
      items={columns?.map((c) => c._id)}
      strategy={horizontalListSortingStrategy}
    >
      <Box
        sx={{
          bgcolor: 'inherit',
          width: '100%',
          height: '100%',
          display: 'flex',
          overflowX: 'auto',
          overflowY: 'hidden',
          '&::-webkit-scrollbar-track': { m: 2 }
        }}
      >
        {columns?.map((column) => (
          <Column key={column._id} column={column} />
        ))}

        {/* Loading... create new column */}
        {isLoadingCreate && <LoadingCreateColumn />}

        {/* Box Add new colum */}
        {!openNewColumnForm ? (
          <Box
            onClick={toggleOpenNewColumnForm}
            sx={{
              minWidth: '200px',
              maxWidth: '200px',
              mx: 2,
              borderRadius: '6px',
              height: 'fit-content',
              bgcolor: '#ffffff3d'
            }}
          >
            <Button
              startIcon={<NoteAddIcon />}
              sx={{
                color: 'white',
                width: '100%',
                justifyContent: 'flex-start',
                pl: 2.5,
                py: 1
              }}
            >
              Add new column
            </Button>
          </Box>
        ) : (
          <Box
            sx={{
              minWidth: '250px',
              maxWidth: '250px',
              mx: 2,
              p: 1,
              borderRadius: '6px',
              height: 'fit-content',
              bgcolor: '#ffffff3d',
              display: 'flex',
              flexDirection: 'column',
              gap: 1
            }}
          >
            <TextField
              label="Enter column title..."
              type="text"
              size="small"
              variant="outlined"
              autoFocus
              value={newColumnTitle}
              onChange={(e) => setNewColumnTitle(e.target.value)}
              sx={{
                '& label': { color: 'white' },
                '& label.Mui-focused': { color: 'white' },
                '& input': { color: 'white' },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: 'white' },
                  '&:hover fieldset': { borderColor: 'white' },
                  '&.Mui-focused fieldset': { borderColor: 'white' }
                }
              }}
            />
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Button
                onClick={addNewColumn}
                variant="contained"
                color="success"
                size="small"
                sx={{
                  boxShadow: 'none',
                  border: '0.5px solic',
                  borderColor: (theme) => theme.palette.success.main,
                  '&:hover': { bgcolor: (theme) => theme.palette.success }
                }}
              >
                Add column
              </Button>
              <CloseIcon
                fontSize="small"
                sx={{
                  color: 'white',
                  cursor: 'pointer',
                  '&:hover': { color: (theme) => theme.palette.warning.light }
                }}
                onClick={toggleOpenNewColumnForm}
              />
            </Box>
          </Box>
        )}
      </Box>
    </SortableContext>
  )
}

export default ListColumns
