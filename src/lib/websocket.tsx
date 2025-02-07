// lib/websocket.ts
import { Messages } from '../types/types'

export class WebSocketClient {
  private socket: WebSocket | null = null
  private roomId: number

  constructor(roomId: number) {
    this.roomId = roomId
    this.connect()
  }

  private connect() {
    this.socket = new WebSocket(`wss://your-domain.com/ws/chat/${this.roomId}/`)

    this.socket.onmessage = (event) => {
      const message: Messages = JSON.parse(event.data)
      // Handle incoming message (for example, dispatch to a state management solution)
      console.log('Received message:', message)
    }

    this.socket.onclose = () => {
      setTimeout(() => this.connect(), 5000)
    }
  }

  sendMessage(message: string) {
    if (this.socket?.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify({ content: message }))
    }
  }

  close() {
    this.socket?.close()
  }
}
