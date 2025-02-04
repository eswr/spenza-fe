import { useEffect, useState } from "react";
import io from "socket.io-client";

export const useWebSocket = (eventName: string) => {
  const [socket, setSocket] = useState<ReturnType<typeof io>>();
  const [lastMessage, setLastMessage] = useState<MessageEvent>();

  useEffect(() => {
    const newSocket = io(process.env.WS_URL!);
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!socket) return;

    const listener = (data: any) => {
      setLastMessage(new MessageEvent(eventName, { data: JSON.stringify(data) }));
    };

    socket.on(eventName, listener);
    return () => {
      socket.off(eventName, listener);
    };
  }, [socket, eventName]);

  return { lastMessage };
};
