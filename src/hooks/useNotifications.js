import React, { useState } from "react";

export const useNotifications = () => {
  const [messages, setMessages] = useState([]);

  const addMsg = (message, type) => {
    const newMessage = {
      id: Math.floor(Math.random(0, 1) * 10 * message.length),
      message,
      type,
    };
    setMessages([...messages, newMessage]);
  };

  const removeMsg = id => {
    const notList = messages.filter(el => el.id !== id);
    setMessages(notList);
  };

  return { messages, addMsg, removeMsg };
};
