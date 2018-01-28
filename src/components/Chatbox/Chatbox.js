import React from 'react'
import './chatbox.css'

const Chatbox = ({message}) => (
  <div className="chat-box">
    <div className="chat-message">
      <h5>{message.from}</h5>
      <p>
        {message.content}
      </p>
    </div>
  </div>
)

export default Chatbox
