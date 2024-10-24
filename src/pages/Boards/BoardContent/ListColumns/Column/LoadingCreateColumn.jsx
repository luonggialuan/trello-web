import { Box, Skeleton } from '@mui/material'

export default function LoadingCreateColumn() {
  return (
    <Box
      sx={{
        minWidth: '300px',
        maxWidth: '300px',
        bgcolor: (theme) =>
          theme.palette.mode === 'dark' ? '#333643' : '#ebecf0',
        ml: 2,
        gap: 2,
        borderRadius: '6px',
        height: '110px',
        maxHeight: (theme) =>
          `calc(${theme.trello.boardContentHeight} - ${theme.spacing(5)})`
      }}
    >
      <Box
        sx={{
          height: (theme) => theme.trello.columnHeaderHeight,
          width: '100%',
          p: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <Skeleton width={200} height={34} />
        <Skeleton width={40} height={32} />
      </Box>
      <Box
        sx={{
          height: (theme) => theme.trello.columnFooterHeight,
          p: 2,
          display: 'flex',
          justifyContent: 'space-between'
        }}
      >
        <Box
          sx={{
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <Skeleton width={140} height={54} />
        </Box>
        <Skeleton width={40} height={32} />
      </Box>
    </Box>
  )
}
