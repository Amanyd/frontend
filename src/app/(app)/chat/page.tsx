"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { clientApi } from "@/lib/api-client.client";
import { useCreateChatSession } from "@/hooks/use-chat";
import { formatDate, cn } from "@/lib/utils";
import { Plus, ArrowUp, RotateCcw } from "lucide-react";
import type { ChatSession } from "@/types/chat";

const GeneratingLogo = () => (
  <svg viewBox="0 0 30 24" className="w-3.5 h-3.5" fill="none" aria-hidden="true">
    <path className="chat-logo-stroke" d="M29.3388 9.46767H18.448V0.00146484H14.9293V10.2725C14.9293 11.3634 15.36 12.411 16.1254 13.183L25.018 22.151L27.506 19.6419L20.938 13.0183H29.3408V9.46975L29.3388 9.46767Z" fill="#0a0a0a" stroke="#0a0a0a" strokeWidth="0.5"></path>
    <path className="chat-logo-stroke chat-logo-stroke-2" d="M1.82839 4.36056L8.39633 10.9842H-0.00646973V14.5328H10.8843V23.999H14.403V13.728C14.403 12.637 13.9723 11.5894 13.2069 10.8175L4.31635 1.85147L1.82839 4.36056Z" fill="#0a0a0a" stroke="#0a0a0a" strokeWidth="0.5"></path>
  </svg>
);

const SolidLogo = () => (
  <svg viewBox="0 0 30 24" className="w-3.5 h-3.5" fill="none" aria-hidden="true">
    <path d="M29.3388 9.46767H18.448V0.00146484H14.9293V10.2725C14.9293 11.3634 15.36 12.411 16.1254 13.183L25.018 22.151L27.506 19.6419L20.938 13.0183H29.3408V9.46975L29.3388 9.46767Z" fill="#0a0a0a" stroke="#0a0a0a" strokeWidth="0.5"></path>
    <path d="M1.82839 4.36056L8.39633 10.9842H-0.00646973V14.5328H10.8843V23.999H14.403V13.728C14.403 12.637 13.9723 11.5894 13.2069 10.8175L4.31635 1.85147L1.82839 4.36056Z" fill="#0a0a0a" stroke="#0a0a0a" strokeWidth="0.5"></path>
  </svg>
);

export default function ChatListPage() {
  const router = useRouter();
  const createSession = useCreateChatSession();

  const [messages, setMessages] = useState<{ role: string, text: string, isGenerating?: boolean }[]>([]);
  const [inputStr, setInputStr] = useState("");

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const { data: sessions = [] } = useQuery({
    queryKey: ["chat-sessions"],
    queryFn: () => clientApi.get<ChatSession[]>("/api/v1/chat/sessions"),
  });

  const handleNewChat = () => {
    if (!inputStr.trim()) return;
    setMessages(prev => [
      ...prev,
      { role: "user", text: inputStr },
      { role: "ai", text: "I'm a dummy response. This UI handles messages dynamically now!", isGenerating: true }
    ]);
    setInputStr("");

    // Simulate AI response completion after 2 seconds
    setTimeout(() => {
      setMessages(prev => prev.map((m, i) =>
        i === prev.length - 1 ? { ...m, isGenerating: false } : m
      ));
    }, 2000);
  };

  return (
    <div className="h-[calc(100vh-4rem)] -mx-6 -my-6 flex flex-col font-sans bg-[#f3f4f6] p-6">
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes chat-logo-redraw {
          0% { stroke-dashoffset: 0; fill-opacity: 1; }
          40% { stroke-dashoffset: 120; fill-opacity: 0; }
          60% { stroke-dashoffset: 120; fill-opacity: 0; }
          100% { stroke-dashoffset: 0; fill-opacity: 1; }
        }
        .chat-logo-stroke {
          stroke-dasharray: 120;
          animation: chat-logo-redraw 1s cubic-bezier(.4,0,.2,1) infinite;
        }
        .chat-logo-stroke-2 {
          animation-delay: 0.15s;
        }
      `}} />
      <div className="flex items-center justify-between mb-6 px-2">
        <h1 className="text-[20px] font-bold text-gray-900 tracking-tight">
          Chat with the RAG powered LLM...
        </h1>
      </div>

      {/* Main container */}
      <div className="flex-1 flex gap-6 min-h-0">

        {/* Main Chat Area */}
        <div className="flex-[4] min-w-0 bg-white border border-gray-200 rounded-xl flex flex-col relative overflow-hidden">

          {/* Background Image */}
          <div
            className="absolute inset-0 bg-[url('/images/bg.png')] bg-[center_top_10rem] bg-cover bg-no-repeat opacity-100 pointer-events-none"
          />

          {/* Dynamic History Area */}
          <div className={`flex-1 overflow-y-auto px-10 pt-8 pb-32 relative flex flex-col scrollbar-hide transition-opacity duration-700 ${messages.length === 0 ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
            <div className="max-w-3xl mx-auto w-full flex flex-col gap-5">
              {messages.map((msg, i) => (
                <div key={i} className="flex flex-col">
                  <div className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start items-start gap-3'}`}>
                    {msg.role === 'ai' && (
                      <div className="w-[28px] h-[28px] rounded-full border border-gray-200 shadow-sm flex items-center justify-center shrink-0 mt-1 bg-white">
                        {msg.isGenerating ? <GeneratingLogo /> : <SolidLogo />}
                      </div>
                    )}
                    <div className={
                      msg.role === 'user'
                        ? "bg-[#f3f4f6] text-gray-900 text-[15px] px-4 py-2.5 rounded-2xl rounded-tr-sm max-w-[80%]"
                        : "text-gray-900 text-[15px] max-w-[90%] leading-relaxed pt-1.5"
                    }>
                      {msg.text}
                    </div>
                  </div>
                  {/* Full-width horizontal line after user message */}
                  {msg.role === 'user' && (
                    <div className="w-full h-px bg-gray-100 mt-8 mb-2" />
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Welcome Screen (Fades out and moves up) */}
          <div className={`absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center pointer-events-none transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] ${messages.length === 0 ? 'opacity-100 translate-y-[-10%]' : 'opacity-0 -translate-y-20'}`}>
            <div className="w-[48px] h-[48px] rounded-[14px] bg-white border border-gray-200 shadow-sm flex items-center justify-center mb-5">
              <svg viewBox="0 0 30 24" className="w-[24px] h-[24px] text-blue-500" fill="none" aria-hidden="true">
                <path d="M29.3388 9.46767H18.448V0.00146484H14.9293V10.2725C14.9293 11.3634 15.36 12.411 16.1254 13.183L25.018 22.151L27.506 19.6419L20.938 13.0183H29.3408V9.46975L29.3388 9.46767Z" fill="currentColor" stroke="currentColor" strokeWidth="0.5"></path>
                <path d="M1.82839 4.36056L8.39633 10.9842H-0.00646973V14.5328H10.8843V23.999H14.403V13.728C14.403 12.637 13.9723 11.5894 13.2069 10.8175L4.31635 1.85147L1.82839 4.36056Z" fill="currentColor" stroke="currentColor" strokeWidth="0.5"></path>
              </svg>
            </div>
            <h2 className="text-[16px] font-bold text-gray-900 tracking-tight">See what AeroMentor can do</h2>
          </div>

          {/* The Chat Input (Animates from center to bottom) */}
          <div className={`absolute left-0 right-0 px-10 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] ${messages.length === 0 ? 'bottom-[35%]' : 'bottom-0 pb-4 pt-4'}`}>
            <div className="w-full max-w-3xl mx-auto">
              <div className="bg-[#fcfcfc] border border-blue-200 rounded-[16px] p-2.5 shadow-[0_12px_24px_-8px_rgba(0,0,0,0.15)] focus-within:border-blue-500 focus-within:bg-white transition-all relative">
                <input
                  type="text"
                  placeholder="Enter your message..."
                  value={inputStr}
                  onChange={(e) => setInputStr(e.target.value)}
                  className="w-full bg-transparent text-[15px] text-gray-900 placeholder-gray-400 outline-none border-none py-2 px-3 pb-10"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleNewChat();
                  }}
                />

                <div className="absolute bottom-2.5 left-3.5 right-2.5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button className="flex items-center gap-1.5 px-2.5 py-1.5 text-[13px] font-medium text-gray-500 hover:bg-gray-100 rounded-md transition-colors">
                      <Plus className="h-4 w-4" />
                      Add context
                    </button>
                  </div>

                  <button
                    onClick={handleNewChat}
                    className="w-[32px] h-[32px] rounded-full bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-100 transition-colors"
                  >
                    <ArrowUp className="h-4 w-4" strokeWidth={2.5} />
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: History Box */}
        <div className="flex-[1] min-w-[220px] max-w-[280px] bg-white border border-gray-200 rounded-xl flex flex-col shrink-0">
          <div className="p-4 flex items-center justify-between border-b border-transparent">
            <h2 className="text-[14px] font-bold text-gray-900">Recent Conversations</h2>
            <button className="flex items-center gap-1.5 text-[12px] font-medium text-gray-500 hover:text-gray-900">
              Reset <RotateCcw className="h-3 w-3" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-4 pb-5 space-y-2.5 scrollbar-hide">
            {sessions.length === 0 ? (
              <p className="text-[13px] text-gray-500 text-center mt-10">No recent conversations.</p>
            ) : (
              sessions.map((session, idx) => {
                const title = session.title || "New chat";
                const displayTitle = title.charAt(0).toUpperCase() + title.slice(1);

                return (
                  <button
                    key={session.id ?? idx}
                    onClick={() => router.push(`/chat/${session.id}`)}
                    className={cn(
                      "w-full text-left rounded-lg p-2.5 flex flex-col gap-1 transition-all group",
                      idx === 0
                        ? "bg-gradient-to-b from-blue-50/50 to-blue-100/50 shadow-[inset_0_1px_1px_rgba(255,255,255,0.8),_0_1px_2px_rgba(0,0,0,0.05)]"
                        : "bg-transparent hover:bg-gray-100"
                    )}
                  >
                    <div className="flex-1 min-w-0 w-full">
                      <h3 className={cn("text-[13px] font-semibold line-clamp-2 leading-tight", idx === 0 ? "text-blue-800" : "text-gray-900")}>
                        {displayTitle}...
                      </h3>
                      <p className={cn("text-[11px] mt-1", idx === 0 ? "text-blue-500" : "text-gray-500")}>
                        {formatDate(session.updated_at)}
                      </p>
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
