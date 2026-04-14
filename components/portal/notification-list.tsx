import { Bell, Mail, MessageSquareText } from "lucide-react";

import type { NotificationItem } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";

function channelIcon(channel: NotificationItem["channel"]) {
  if (channel === "email") return Mail;
  if (channel === "sms") return MessageSquareText;
  return Bell;
}

function priorityVariant(priority: NotificationItem["priority"]) {
  if (priority === "high") return "danger" as const;
  if (priority === "medium") return "warning" as const;
  return "default" as const;
}

export function NotificationList({ items }: { items: NotificationItem[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent notifications</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {items.map((item) => {
          const Icon = channelIcon(item.channel);
          return (
            <div key={item.id} className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex gap-3">
                  <div className="mt-1 rounded-full bg-cyan-400/10 p-2">
                    <Icon className="h-4 w-4 text-cyan-300" />
                  </div>
                  <div>
                    <p className="font-medium text-white">{item.title}</p>
                    <p className="mt-2 text-sm leading-6 text-slate-300">{item.message}</p>
                  </div>
                </div>
                <Badge variant={priorityVariant(item.priority)}>{item.priority}</Badge>
              </div>
              <p className="mt-3 text-xs text-slate-500">{formatDate(item.createdAt)}</p>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
