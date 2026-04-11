"use client";

import { appConfig } from "@/config/app.config";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bot, User } from "lucide-react";
import { motion } from "framer-motion";

interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
}

export function ChatMessage({ role, content }: ChatMessageProps) {
  const isAssistant = role === "assistant";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "flex w-full gap-4 py-6",
        isAssistant ? "bg-muted/30 px-6 rounded-2xl" : "px-6"
      )}
    >
      <Avatar className="h-8 w-8 rounded-lg shrink-0">
        {isAssistant ? (
          <AvatarFallback className="bg-primary text-primary-foreground rounded-lg">
            <Bot size={18} />
          </AvatarFallback>
        ) : (
          <AvatarFallback className="bg-muted text-muted-foreground rounded-lg">
            <User size={18} />
          </AvatarFallback>
        )}
      </Avatar>
      
      <div className="flex-1 space-y-2 overflow-hidden">
        <p className="text-sm font-semibold text-foreground">
          {isAssistant ? `${appConfig.name} AI` : "You"}
        </p>
        <div className="text-sm leading-relaxed text-foreground/90 whitespace-pre-wrap">
          {content}
        </div>
      </div>
    </motion.div>
  );
}
