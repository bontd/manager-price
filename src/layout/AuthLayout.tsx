import { Box } from '@mui/material'
import { Outlet } from 'react-router-dom'

export default function AuthLayout() {
  return (
    <Box display="flex" height="100vh">
      <Box flexGrow={1}>
        <Box p={2}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  )
}
