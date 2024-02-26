import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import DashboardIcon from '@mui/icons-material/Dashboard'
import VpnLockIcon from '@mui/icons-material/VpnLock'
import AddToDriveIcon from '@mui/icons-material/AddToDrive'
import BoltIcon from '@mui/icons-material/Bolt'
import FilterListIcon from '@mui/icons-material/FilterList'
import Avatar from '@mui/material/Avatar'
import AvatarGroup from '@mui/material/AvatarGroup'
import Tooltip from '@mui/material/Tooltip'
import Button from '@mui/material/Button'
import PersonAddIcon from '@mui/icons-material/PersonAdd'

const MENU_STYLES = {
  color: 'white',
  bgcolor: 'transparent',
  border: 'none',
  paddingX: '5px',
  borderRadius: '4px',
  '.MuiSvgIcon-root': {
    color: 'white'
  },
  '&:hover': {
    bgcolor: 'primary.50'
  }
}

function BoardBar() {
  return (
    <Box
      sx={{
        width: '100%',
        height: (theme) => theme.trello.boardBarHeight,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 2,
        paddingX: 2,
        overflowX: 'auto',
        borderBottom: '1px solid white',
        bgcolor: (theme) =>
          theme.palette.mode === 'dark' ? '#34495e' : '#1976d2'
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Chip
          sx={MENU_STYLES}
          icon={<DashboardIcon />}
          label="Trello Board"
          clickable
        />
        <Chip
          sx={MENU_STYLES}
          icon={<VpnLockIcon />}
          label="Public/Private Workspace"
          clickable
        />
        <Chip
          sx={MENU_STYLES}
          icon={<AddToDriveIcon />}
          label="Add to Google Drive"
          clickable
        />
        <Chip
          sx={MENU_STYLES}
          icon={<BoltIcon />}
          label="Automation"
          clickable
        />
        <Chip
          sx={MENU_STYLES}
          icon={<FilterListIcon />}
          label="Filters"
          clickable
        />
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Button
          variant="outlined"
          startIcon={<PersonAddIcon />}
          sx={{
            color: 'white',
            borderColor: 'white',
            '&:hover': { borderColor: 'white' }
          }}
        >
          Invite
        </Button>
        <AvatarGroup
          max={4}
          sx={{
            gap: '10px',
            '& .MuiAvatar-root': {
              width: 34,
              height: 34,
              fontSize: 16,
              border: 'none'
            }
          }}
        >
          <Tooltip title="Avatar">
            <Avatar
              alt="Avatar"
              src="https://scontent.fsgn2-7.fna.fbcdn.net/v/t39.30808-1/411496173_2394469967429423_8977748475840364687_n.jpg?stp=dst-jpg_p320x320&_nc_cat=108&ccb=1-7&_nc_sid=5740b7&_nc_ohc=DvHYTJ89IYoAX_RVMA6&_nc_ht=scontent.fsgn2-7.fna&oh=00_AfB4L0pZQPZOp5qdkCZ1KyYYacluemxOVAIQvTDBQquixA&oe=65E26FAA"
            />
          </Tooltip>
          <Tooltip title="Avatar">
            <Avatar
              alt="Avatar"
              src="https://scontent.fsgn2-7.fna.fbcdn.net/v/t39.30808-1/411496173_2394469967429423_8977748475840364687_n.jpg?stp=dst-jpg_p320x320&_nc_cat=108&ccb=1-7&_nc_sid=5740b7&_nc_ohc=DvHYTJ89IYoAX_RVMA6&_nc_ht=scontent.fsgn2-7.fna&oh=00_AfB4L0pZQPZOp5qdkCZ1KyYYacluemxOVAIQvTDBQquixA&oe=65E26FAA"
            />
          </Tooltip>
          <Tooltip title="Avatar">
            <Avatar
              alt="Avatar"
              src="https://scontent.fsgn2-7.fna.fbcdn.net/v/t39.30808-1/411496173_2394469967429423_8977748475840364687_n.jpg?stp=dst-jpg_p320x320&_nc_cat=108&ccb=1-7&_nc_sid=5740b7&_nc_ohc=DvHYTJ89IYoAX_RVMA6&_nc_ht=scontent.fsgn2-7.fna&oh=00_AfB4L0pZQPZOp5qdkCZ1KyYYacluemxOVAIQvTDBQquixA&oe=65E26FAA"
            />
          </Tooltip>
          <Tooltip title="Avatar">
            <Avatar
              alt="Avatar"
              src="https://scontent.fsgn2-7.fna.fbcdn.net/v/t39.30808-1/411496173_2394469967429423_8977748475840364687_n.jpg?stp=dst-jpg_p320x320&_nc_cat=108&ccb=1-7&_nc_sid=5740b7&_nc_ohc=DvHYTJ89IYoAX_RVMA6&_nc_ht=scontent.fsgn2-7.fna&oh=00_AfB4L0pZQPZOp5qdkCZ1KyYYacluemxOVAIQvTDBQquixA&oe=65E26FAA"
            />
          </Tooltip>
          <Tooltip title="Avatar">
            <Avatar
              alt="Avatar"
              src="https://scontent.fsgn2-7.fna.fbcdn.net/v/t39.30808-1/411496173_2394469967429423_8977748475840364687_n.jpg?stp=dst-jpg_p320x320&_nc_cat=108&ccb=1-7&_nc_sid=5740b7&_nc_ohc=DvHYTJ89IYoAX_RVMA6&_nc_ht=scontent.fsgn2-7.fna&oh=00_AfB4L0pZQPZOp5qdkCZ1KyYYacluemxOVAIQvTDBQquixA&oe=65E26FAA"
            />
          </Tooltip>
        </AvatarGroup>
      </Box>
    </Box>
  )
}

export default BoardBar
