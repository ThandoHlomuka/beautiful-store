'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: string;
  read: boolean;
}

interface ChatContextType {
  messages: Message[];
  unreadCount: number;
  isOpen: boolean;
  isAdmin: boolean;
  openChat: () => void;
  closeChat: () => void;
  sendMessage: (content: string, userId: string, userName: string) => void;
  markAsRead: () => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: ReactNode }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const savedMessages = localStorage.getItem('chatMessages');
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('chatMessages', JSON.stringify(messages));
  }, [messages]);

  const unreadCount = messages.filter(m => !m.read && !m.senderId.startsWith('admin')).length;

  const openChat = () => setIsOpen(true);
  const closeChat = () => setIsOpen(false);

  const sendMessage = (content: string, userId: string, userName: string) => {
    const newMessage: Message = {
      id: Math.random().toString(36).substring(2),
      senderId,
      senderName,
      content,
      timestamp: new Date().toISOString(),
      read: false,
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const markAsRead = () => {
    setMessages(prev => prev.map(m => ({ ...m, read: true })));
  };

  return (
    <ChatContext.Provider value={{ messages, unreadCount, isOpen, isAdmin, openChat, closeChat, sendMessage, markAsRead }}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);
  if (!context) throw new Error('useChat must be used within ChatProvider');
  return context;
}