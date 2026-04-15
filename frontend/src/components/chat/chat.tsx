'use client';

import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { SendHorizontal } from 'lucide-react';
import { socket } from '@/lib/socket';
import { useEffect, useState } from 'react';

type Message = {
  senderID: string;
  message: string;
};

export default function ChatContainer({ roomID }: { roomID: string }) {
  const [message, setMessage] = useState('');
  const [messageReceived, setMessageReceived] = useState<Message[]>([]);

  useEffect(() => {
    const joinRoom = () => {
      socket.emit('joinRoom', roomID);
    };

    if (socket.connected) {
      joinRoom();
    }

    socket.on('connect', joinRoom);

    return () => {
      socket.off('connect', joinRoom);
    };
  }, [roomID]);

  useEffect(() => {
    const handleReceiveMessage = (data: Message) => {
      setMessageReceived((prev) => [...prev, data]);
    };

    socket.on('receiveMessage', handleReceiveMessage);

    return () => {
      socket.off('receiveMessage');
    };
  }, []);

  const sendMessage = () => {
    if (!message.trim()) return;

    socket.emit('sendMessage', { senderID: socket.id, message, roomID });

    setMessage('');
  };

  return (
    <div className="bg-secondary h-100 w-140 overflow-hidden rounded-md border-2 shadow-sm shadow-white">
      <div className="flex h-75 w-full flex-col gap-4 overflow-auto p-4">
        {messageReceived.map((msg, idx) => (
          <div key={idx} className={`${socket.id === msg.senderID ? 'self-end' : ''}`}>
            <p className="text-muted-foreground text-xs font-semibold">{msg.senderID}</p>
            <p className="text-sm">{msg.message}</p>
          </div>
        ))}
      </div>
      <div className="relative flex h-25 w-full items-center justify-center p-4">
        <Textarea
          maxLength={255}
          className="border-primary resize-none overflow-hidden border-2 pr-12 text-xs"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button className="absolute top-1/2 right-6 -translate-y-1/2" onClick={sendMessage}>
          <SendHorizontal />
        </Button>
      </div>
    </div>
  );
}
