import { Box, CircularProgress, Typography } from '@mui/material'

export default function LoadingCreateCard() {
  return (
    <Box
      sx={{
        gap: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        mt: 1
      }}
    >
      <CircularProgress size={20} />
      <Typography>Creating...</Typography>
    </Box>
  )
}
