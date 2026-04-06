"use client";

import { useEffect, useState } from "react";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export type QueueEvent = 
  | { type: "TicketJoined"; data: { queue_id: string; ticket_id: string; number: number; name: string } }
  | { type: "TicketCalled"; data: { queue_id: string; ticket_id: string; number: number } }
  | { type: "TicketUpdated"; data: { queue_id: string; ticket_id: string; status: string } }
  | { type: "SessionStarted"; data: { queue_id: string; session_id: string } };

export function useQueueEvents(queueId: string | undefined, onEvent?: (event: QueueEvent) => void) {
  const [lastEvent, setLastEvent] = useState<QueueEvent | null>(null);

  useEffect(() => {
    if (!queueId) return;

    const url = `${API_BASE_URL}/public/queues/${queueId}/events`;
    const eventSource = new EventSource(url);

    eventSource.onmessage = (e) => {
      try {
        const event: QueueEvent = JSON.parse(e.data);
        setLastEvent(event);
        if (onEvent) onEvent(event);
      } catch (err) {
        console.error("Failed to parse SSE event:", err);
      }
    };

    eventSource.onerror = (e) => {
      console.error("SSE Error:", e);
      // EventSource automatically handles reconnection
    };

    return () => {
      eventSource.close();
    };
  }, [queueId, onEvent]);

  return lastEvent;
}
