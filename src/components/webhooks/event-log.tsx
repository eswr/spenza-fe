import { useEffect, useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import axios from "axios";
import { API_URL } from "@/lib/constants";

interface WebhookEvent {
  id: string;
  payload: Record<string, unknown>;
  status: string;
  createdAt: string;
}

export function EventLog() {
  const [events, setEvents] = useState<WebhookEvent[]>([]);
  const [isPolling, setIsPolling] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchEvents = async () => {
      try {
        const response = await axios.get(`${API_URL}/events`, {
          timeout: 60000, // 60 seconds timeout for long polling
        });

        if (isMounted && response.data) {
          setEvents((prevEvents) => [
            response.data,
            ...prevEvents.slice(0, 49),
          ]);
        }

        // Continue polling
        if (isMounted && isPolling) {
          fetchEvents();
        }
      } catch (error) {
        if (isMounted) {
          console.error("Error fetching events:", error);
          // Retry after a delay in case of error
          setTimeout(() => {
            if (isMounted && isPolling) {
              fetchEvents();
            }
          }, 5000); // Retry after 5 seconds
        }
      }
    };

    if (isPolling) {
      fetchEvents();
    }

    return () => {
      isMounted = false;
      setIsPolling(false);
    };
  }, [isPolling]);

  return (
    <Card className="h-[400px]">
      <CardHeader className="text-lg font-semibold">Event Log</CardHeader>
      <CardContent>
        <ScrollArea className="h-[350px]">
          {events.map((event) => (
            <div key={event.id} className="p-2 border-b">
              <div className="flex justify-between text-sm">
                <span>{event.payload.eventType as string}</span>
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
