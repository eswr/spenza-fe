// "use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useWebSocket } from "@/hooks/use-websocket";

interface WebhookEvent {
  id: string;
  payload: Record<string, unknown>;
  status: string;
  createdAt: string;
}

export function EventLog() {
  const [events, setEvents] = useState<WebhookEvent[]>([]);
  const { lastMessage } = useWebSocket("webhook_events");

  useEffect(() => {
    if (lastMessage) {
      setEvents((prev) => [JSON.parse(lastMessage.data), ...prev.slice(0, 49)]);
    }
  }, [lastMessage]);

  return (
    <Card className="h-[400px]">
      <CardHeader className="text-lg font-semibold">Event Log</CardHeader>
      <CardContent>
        <ScrollArea className="h-[350px]">
          {events.map((event) => (
            <div key={event.id} className="p-2 border-b">
              <div className="flex justify-between text-sm">
                <span>{event.payload.eventType}</span>
                <span className="text-muted-foreground">
                  {new Date(event.createdAt).toLocaleTimeString()}
                </span>
              </div>
              <div className="text-xs text-muted-foreground">
                Status: {event.status}
              </div>
            </div>
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
