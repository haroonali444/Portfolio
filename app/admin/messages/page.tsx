'use client'

import { useEffect, useState } from 'react'
import { Trash2, Mail, User, Calendar, CheckCircle2, Circle } from 'lucide-react'

interface Message {
  id: string
  name: string
  email: string
  subject: string
  message: string
  createdAt: string
  read: boolean
}

export default function AdminMessages() {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null)

  useEffect(() => {
    fetchMessages()
  }, [])

  const fetchMessages = async () => {
    try {
      const response = await fetch('/api/contacts')
      if (response.ok) {
        const data = await response.json()
        setMessages(data.sort((a: Message, b: Message) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()))
      }
    } catch (error) {
      console.error('Error fetching messages:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    } catch (e) {
      return 'Invalid Date'
    }
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-foreground mb-2">Contact Messages</h1>
        <p className="text-muted-foreground mb-8">Manage all messages from your portfolio</p>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : messages.length === 0 ? (
          <div className="bg-card rounded-lg border border-border p-12 text-center">
            <Mail size={48} className="mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No messages yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Messages List */}
            <div className="lg:col-span-2 space-y-3">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  onClick={() => setSelectedMessage(msg)}
                  className={`p-4 rounded-lg border cursor-pointer transition-all ${
                    selectedMessage?.id === msg.id
                      ? 'bg-primary/10 border-primary'
                      : 'bg-card border-border hover:border-primary/50'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        {msg.read ? (
                          <CheckCircle2 size={16} className="text-primary flex-shrink-0" />
                        ) : (
                          <Circle size={16} className="text-primary flex-shrink-0" />
                        )}
                        <h3 className="font-semibold text-foreground truncate">{msg.name}</h3>
                      </div>
                      <p className="text-sm text-primary mb-1 truncate">{msg.subject}</p>
                      <p className="text-sm text-muted-foreground truncate">{msg.email}</p>
                      <p className="text-xs text-muted-foreground mt-1">{formatDate(msg.createdAt)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Detail */}
            <div className="lg:col-span-1">
              {selectedMessage ? (
                <div className="bg-card rounded-lg border border-border p-6 sticky top-6 space-y-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <User size={18} className="text-primary" />
                      <span className="text-sm text-muted-foreground">Name</span>
                    </div>
                    <p className="text-foreground font-semibold">{selectedMessage.name}</p>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Mail size={18} className="text-primary" />
                      <span className="text-sm text-muted-foreground">Email</span>
                    </div>
                    <a href={`mailto:${selectedMessage.email}`} className="text-primary hover:underline break-all">
                      {selectedMessage.email}
                    </a>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle2 size={18} className="text-primary" />
                      <span className="text-sm text-muted-foreground">Subject</span>
                    </div>
                    <p className="text-foreground">{selectedMessage.subject}</p>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar size={18} className="text-primary" />
                      <span className="text-sm text-muted-foreground">Date</span>
                    </div>
                    <p className="text-foreground">{formatDate(selectedMessage.createdAt)}</p>
                  </div>

                  <div className="border-t border-border pt-4">
                    <span className="text-sm text-muted-foreground">Message</span>
                    <p className="text-foreground mt-2 whitespace-pre-wrap text-sm">{selectedMessage.message}</p>
                  </div>

                  <button
                    className="w-full px-4 py-2 bg-destructive/10 text-destructive rounded-lg hover:bg-destructive/20 transition-colors flex items-center justify-center gap-2 font-semibold"
                  >
                    <Trash2 size={18} />
                    Delete Message
                  </button>
                </div>
              ) : (
                <div className="bg-card rounded-lg border border-border p-6 text-center sticky top-6">
                  <p className="text-muted-foreground">Select a message to view details</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
