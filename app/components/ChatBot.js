"use client";

import { Bot, Loader2, Send, User, X, Sparkles } from 'lucide-react';
import { useContext, useEffect, useRef, useState } from 'react';
import { ThemeContext } from './ThemeContext';

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const messagesEndRef = useRef(null);
  const { isDarkMode } = useContext(ThemeContext);

  // Initial greeting message
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          role: 'assistant',
          content: "Hello! I'm your AI career assistant. How can I help you with your career roadmaps, job preparation, or interview practice today?"
        }
      ]);
    }
  }, [messages.length]);

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    const sessionId = 'default-session';
    const userId = 1;

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/gemini', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: input,
          type: 'conversation'
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();
      const assistantMessage = data.response || "I'm sorry, I couldn't process that request.";

      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: assistantMessage }
      ]);
    } catch (error) {
      console.error('Error calling AI API:', error);
      const errorMessage = "I'm sorry, I encountered an issue. Please try again.";
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: errorMessage }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <>
      {/* Chat toggle button */}
      <button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 p-4 rounded-2xl shadow-xl z-[60] transition-all duration-300 bg-gradient-to-tr from-purple-600 via-indigo-600 to-violet-600 text-white shadow-md hover:shadow-purple-500/60 hover:scale-105 active:scale-95 cursor-pointer border border-white/20"
        aria-label="Toggle chat assistant"
      >
        {isChatOpen ? <X size={26} /> : <Bot size={26} />}
      </button>

      {/* Chat window */}
      <div
        className={`fixed bottom-24 right-6 w-[92vw] sm:w-[420px] h-[530px] rounded-3xl shadow-2xl overflow-hidden transition-all duration-300 transform z-[60] flex flex-col border ${
          isChatOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'
        } ${
          isDarkMode
            ? 'bg-[#130c24]/98 backdrop-blur-xl border-[#2c1c4d] shadow-[0_25px_60px_rgba(0,0,0,0.95)]'
            : 'bg-white/98 backdrop-blur-xl border-purple-100 shadow-[0_20px_50px_rgba(124,58,237,0.18)]'
        }`}
      >
        {/* Chat header */}
        <div className="p-4 bg-gradient-to-r from-purple-600 via-indigo-600 to-violet-600 text-white flex items-center justify-between shadow-sm">
          <div className="flex items-center space-x-2.5">
            <div className="p-1.5 rounded-lg bg-white/20">
              <Sparkles size={18} />
            </div>
            <div>
              <h3 className="font-bold text-base">Career Assistant AI</h3>
              <p className="text-xs text-purple-100">Online & Ready to Guide</p>
            </div>
          </div>
          <button onClick={toggleChat} className="text-white/80 hover:text-white p-1 cursor-pointer">
            <X size={20} />
          </button>
        </div>

        {/* Messages container */}
        <div className={`p-4 h-[390px] overflow-y-auto space-y-3.5 ${
          isDarkMode ? 'text-stone-200' : 'text-stone-800'
        }`}>
          {messages.map((message, index) => (
            <div
              key={index}
              className={`mb-4 ${message.role === 'user' ? 'text-right' : 'text-left'}`}
            >
              <div className={`inline-block max-w-[85%] px-4 py-3 rounded-2xl text-sm sm:text-base leading-relaxed ${
                message.role === 'user'
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-br-none shadow-md'
                  : isDarkMode
                    ? 'bg-[#1e1338] border border-[#2c1c4d] text-stone-200 rounded-bl-none shadow-sm'
                    : 'bg-purple-50/90 border border-purple-100 text-stone-800 rounded-bl-none shadow-sm'
              }`}>
                <div className="flex items-center space-x-2 mb-1">
                  {message.role === 'user'
                    ? <><span className="font-bold">You</span><User size={14} /></>
                    : <><Bot size={14} className="text-purple-400" /><span className="font-bold">CareerPilot AI</span></>
                  }
                </div>
                <p className="whitespace-pre-wrap">{message.content}</p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="text-left mb-4">
              <div className={`inline-block px-4 py-3 rounded-2xl ${
                isDarkMode ? 'bg-[#1e1338] text-stone-200' : 'bg-purple-50 text-stone-800'
              }`}>
                <div className="flex items-center space-x-2">
                  <Bot size={15} className="text-purple-400" />
                  <span className="font-bold">CareerPilot AI</span>
                </div>
                <div className="flex items-center space-x-2 mt-2">
                  <Loader2 size={16} className="animate-spin text-purple-600 dark:text-purple-400" />
                  <span className="font-semibold text-sm">Thinking...</span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input form */}
        <form
          onSubmit={handleSubmit}
          className={`p-3.5 border-t ${
            isDarkMode ? 'border-[#2c1c4d] bg-[#0a0614]' : 'border-purple-100 bg-purple-50/40'
          }`}
        >
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isLoading}
              placeholder="Ask anything about jobs, roadmaps, salaries..."
              className={`flex-1 px-4 py-2.5 rounded-xl border text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all ${
                isDarkMode
                  ? 'bg-[#130c24] border-[#2c1c4d] text-white placeholder-stone-400'
                  : 'bg-white border-purple-200 text-stone-900 placeholder-stone-400'
              }`}
            />
            <button
              type="submit"
              disabled={isLoading}
              className="p-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white disabled:opacity-50 shadow-md cursor-pointer hover:scale-105 transition-transform"
            >
              <Send size={18} />
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ChatBot;
