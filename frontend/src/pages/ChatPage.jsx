import React from 'react'
import { useAuthStore } from '../store/useAuthStore'

function ChatPage() {
  const {logout}=useAuthStore();
  return (
    <div className='z-10'>
      ChatPage
      <button onClick={logout} className='btn-primary cursor-pointer'>logout</button>
    </div>
  )
}

export default ChatPage