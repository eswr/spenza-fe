import { Navigate } from 'react-router-dom'

export default function AuthRoute({ children }) {
  const isAuthenticated = !!localStorage.getItem('token')

  return isAuthenticated ? children : <Navigate to="/login" replace />
}

// Usage in router config:
// {
//   path: 'dashboard',
//   element: <AuthRoute><Dashboard /></AuthRoute>
// }
