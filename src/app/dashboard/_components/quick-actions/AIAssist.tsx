import React from "react";
import Card from "../Card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, Zap } from "lucide-react";

export default function AIAssist() {
  return (
    <Card bg="bg-orange-50" padding="p-4">
      <div className="flex items-center">
        <Zap className="h-5 w-5 text-orange-500" />
        <h2 className="text-[16px] font-semibold ml-2">Assistant</h2>
      </div>
      <div className="mt-2">
        <p className="text-gray-600 mb-4 text-[16px]">
          Ready to dive into work? Ask me anything. I am here to help you get
          things done!
        </p>
      </div>
      <div className="flex w-full items-center space-x-2">
        <Input
          type="text"
          placeholder="I want to..."
          className="bg-white rounded-full"
        />
        <Button
          type="submit"
          size="icon"
          className="bg-orange-500 hover:bg-orange-600 rounded-full flex-shrink-0"
        >
          <Send className="h-4 w-4 text-white" />
        </Button>
      </div>
    </Card>
  );
}