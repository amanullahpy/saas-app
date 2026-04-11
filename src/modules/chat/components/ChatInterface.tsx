"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Plus, Search, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChatMessage } from "./ChatMessage";
import { ScrollArea } from "@/components/ui/scroll-area";
import { appConfig } from "@/config/app.config";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: `Hello! I'm ${appConfig.name} AI. How can I help you manage your SaaS dashboard today?`,
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Mock Streaming
    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: "",
    };

    setMessages((prev) => [...prev, assistantMessage]);

    const fullResponse = "I can help you with that. Based on your current analytics, your revenue is up by 20.1% this month. Would you like me to generate a detailed report or show you the breakdown of your top-performing products?";
    
    let currentContent = "";
    const words = fullResponse.split(" ");
    
    for (let i = 0; i < words.length; i++) {
      currentContent += words[i] + " ";
      setMessages((prev) => 
        prev.map((msg) => 
          msg.id === assistantMessage.id 
            ? { ...msg, content: currentContent } 
            : msg
        )
      );
      await new Promise((resolve) => setTimeout(resolve, 50));
    }

    setIsTyping(false);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-180px)] bg-card border rounded-3xl overflow-hidden shadow-sm">
      <div className="flex items-center justify-between px-6 py-4 border-b">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
            <Search size={18} />
          </div>
          <div>
            <h3 className="text-sm font-semibold">AI Assistant</h3>
            <p className="text-xs text-muted-foreground">Always active</p>
          </div>
        </div>
        <Button variant="ghost" size="icon" className="hover:text-destructive">
          <Trash2 size={18} />
        </Button>
      </div>

      <ScrollArea className="flex-1 p-6" viewportRef={scrollRef}>
        <div className="max-w-3xl mx-auto space-y-2">
          {messages.map((message) => (
            <ChatMessage key={message.id} role={message.role} content={message.content} />
          ))}
          {isTyping && (
            <div className="flex gap-4 py-6 px-6 bg-muted/30 rounded-2xl animate-pulse">
              <div className="w-8 h-8 rounded-lg bg-primary/20 shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-primary/10 rounded w-1/4" />
                <div className="h-4 bg-primary/10 rounded w-3/4" />
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      <div className="p-6 border-t bg-card">
        <div className="max-w-3xl mx-auto relative">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Type your message..."
            className="h-12 pl-12 pr-12 rounded-2xl bg-muted/50 border-none shadow-none focus-visible:ring-1 focus-visible:ring-primary/20"
          />
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-2 top-1/2 -translate-y-1/2 rounded-xl hover:bg-primary/10"
          >
            <Plus size={20} />
          </Button>
          <Button
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-xl"
          >
            <Send size={18} />
          </Button>
        </div>
        <p className="text-[10px] text-center text-muted-foreground mt-3">
          {appConfig.name} AI can make mistakes. Check important info.
        </p>
      </div>
    </div>
  );
}
