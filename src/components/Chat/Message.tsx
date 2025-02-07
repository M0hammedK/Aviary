// components/Chat/Message.tsx
import { Messages } from '../../types/types'

interface MessageProps {
  message: Messages
}

export default function Message({ message }: MessageProps) {
  return (
    <div className="message mb-2">
      <strong>{message.sender.name}:</strong> {message.content}
    </div>
  )
}
