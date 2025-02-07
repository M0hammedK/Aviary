// pages/index.tsx
import ChatList from '../components/Chat/ChatList'
import ProtectedRoute from '../components/common/ProtectedRoute'

export default function Home() {
  return (
    <ProtectedRoute>
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-4">Welcome to Aviary</h1>
        <ChatList />
      </div>
    </ProtectedRoute>
  )
}
