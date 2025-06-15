import { Box, Button, TextField, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const navigate = useNavigate()

  const handleLogin = () => {
    // giả lập login
    localStorage.setItem('token', 'fake-token')
    navigate('/')
  }

  return (
    <Box display="flex" flexDirection="column" alignItems="center" mt={10}>
      <Typography variant="h5" mb={2}>Đăng nhập</Typography>
      <TextField label="Username" sx={{ mb: 2 }} />
      <TextField label="Password" type="password" sx={{ mb: 2 }} />
      <Button variant="contained" onClick={handleLogin}>Login</Button>
    </Box>
  )
}
