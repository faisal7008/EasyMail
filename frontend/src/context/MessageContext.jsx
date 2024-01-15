import { useState, createContext, useContext } from "react";

const MessageContext = createContext();

export const MessageProvider = ({ children }) => {
  const [messages, setMessages] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const value = {
    messages,
    setMessages,
    isLoading,
    setIsLoading
  };

  return <MessageContext.Provider value={value}>{children}</MessageContext.Provider>
};

export const useMessageContext = () => {
  return useContext(MessageContext);
};
