"use client";

import React, { useState, useRef, useEffect } from "react";
import Card from "../Card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, Zap, MessageCircle, ArrowLeft } from "lucide-react";

interface Message {
  sender: "user" | "assistant";
  text: string;
}

interface AIAssistProps {
  isChatMode: boolean;
  setIsChatMode: (v: boolean) => void;
}

export default function AIAssist({ isChatMode, setIsChatMode }: AIAssistProps) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isChatMode && chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isChatMode]);

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim()) return;
    setMessages((msgs) => [
      ...msgs,
      { sender: "user", text: input },
      // Placeholder assistant response
      { sender: "assistant", text: "I'm here to help you build your itinerary! (AI response placeholder)" },
    ]);
    setInput("");
  };

  return (
    <Card bg="bg-orange-50" padding="p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Zap className="h-5 w-5 text-orange-500" />
          <h2 className="text-[16px] font-semibold ml-2">Assistant</h2>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="ml-2"
          aria-label={isChatMode ? "Back to Quick Action" : "Open Chat"}
          onClick={() => setIsChatMode(!isChatMode)}
        >
          {isChatMode ? <ArrowLeft className="h-5 w-5 text-orange-500" /> : <MessageCircle className="h-5 w-5 text-orange-500" />}
        </Button>
      </div>
      {!isChatMode ? (
        <>
          <div className="mt-2">
            <p className="text-gray-600 mb-4 text-[16px]">
              Ready to dive into work? Ask me anything. I am here to help you get things done!
            </p>
          </div>
          <form className="flex w-full items-center space-x-2" onSubmit={handleSend}>
            <Input
              type="text"
              placeholder="I want to..."
              className="bg-white rounded-full"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <Button
              type="submit"
              size="icon"
              className="bg-orange-500 hover:bg-orange-600 rounded-full flex-shrink-0"
            >
              <Send className="h-4 w-4 text-white" />
            </Button>
          </form>
        </>
      ) : (
        <div className="flex flex-col h-[550px] mt-2">
          <div className="flex-1 overflow-y-auto rounded-lg bg-white/70 p-3 border border-orange-100 shadow-inner">
            {messages.length === 0 ? (
              <div className="text-gray-400 text-center mt-10">Start a conversation to build your itinerary!</div>
            ) : (
              messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex mb-2 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[75%] px-4 py-2 rounded-2xl text-[15px] shadow-sm ${
                      msg.sender === "user"
                        ? "bg-orange-500 text-white rounded-br-md"
                        : "bg-orange-100 text-orange-900 rounded-bl-md"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))
            )}
            <div ref={chatEndRef} />
          </div>
          <form className="flex items-center space-x-2 mt-3" onSubmit={handleSend}>
            <Input
              type="text"
              placeholder="Type your message..."
              className="bg-white rounded-full"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              autoFocus
            />
            <Button
              type="submit"
              size="icon"
              className="bg-orange-500 hover:bg-orange-600 rounded-full flex-shrink-0"
              disabled={!input.trim()}
            >
              <Send className="h-4 w-4 text-white" />
            </Button>
          </form>
        </div>
      )}
    </Card>
  );
}