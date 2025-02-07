// pages/admin/users.tsx
import { useEffect, useState } from 'react'
import api from '../../lib/api'
import ProtectedRoute from '../../components/common/ProtectedRoute'

export default function AdminUsersPage() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    const loadUsers = async () => {
      const { data } = await api.get('/user')
      setUsers(data)
    }
    loadUsers()
  }, [])

  return (
    <ProtectedRoute adminOnly>
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-4">Users</h1>
        <ul>
          {users.map((user: any) => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      </div>
    </ProtectedRoute>
  )
}
