import Board from '~/pages/Boards/_id'
import { Routes, Route, Navigate } from 'react-router-dom'
import NotFound from './pages/404/NotFound'
import Auth from './pages/Auth/Auth'

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={<Navigate to="/boards/65e4bccab2843add9c21af92" />}
      />
      {/* Board Details */}
      <Route path="/boards/:boardId" element={<Board />} />

      {/* Authentication */}
      <Route path="/login" element={<Auth />} />
      <Route path="/register" element={<Auth />} />

      {/* 404 Not Found Page */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App
