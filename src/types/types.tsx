// types/types.ts
export interface User {
  id: number
  name: string
  email: string
  role: string
}

export interface ChatRoom {
  id: number
  name: string
  owner: User
  isGroup: boolean
}

export interface Messages {
  id: number
  content: string
  sender: User
  chatRoom: ChatRoom
  createdAt: string
}
