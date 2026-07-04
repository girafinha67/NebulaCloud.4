'use client'

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from 'react'
import type { Notification, NotificationType } from '@/types'

interface NotificationContextValue {
  notifications: Notification[]
  unreadCount: number
  add: (title: string, message: string, type?: NotificationType) => void
  markRead: (id: string) => void
  markAllRead: () => void
  remove: (id: string) => void
}

const NotificationContext = createContext<NotificationContextValue | null>(null)

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([])

  const add = useCallback(
    (title: string, message: string, type: NotificationType = 'info') => {
      const notif: Notification = {
        id: `notif_${Date.now()}`,
        userId: '',
        type,
        title,
        message,
        read: false,
        createdAt: new Date().toISOString(),
      }
      setNotifications((prev) => [notif, ...prev])
    },
    [],
  )

  const markRead = useCallback((id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n)),
    )
  }, [])

  const markAllRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }, [])

  const remove = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }, [])

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount: notifications.filter((n) => !n.read).length,
        add,
        markRead,
        markAllRead,
        remove,
      }}
    >
      {children}
    </NotificationContext.Provider>
  )
}

export function useNotifications() {
  const ctx = useContext(NotificationContext)
  if (!ctx) throw new Error('useNotifications must be used inside NotificationProvider')
  return ctx
}
