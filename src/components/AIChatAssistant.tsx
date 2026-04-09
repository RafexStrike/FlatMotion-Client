"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Loader2, Copy, Check } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const systemPrompts = [
  "How do I create an animation of a sine wave?",
  "What makes a good animation prompt?",
  "How do I create animations for educational content?",
  "Can I create 3D animations?",
];

const botResponses: { [key: string]: string[] } = {
  "sine wave": [
    "To create a sine wave animation, describe it like: 'Animate a sine wave starting from 0 to 2π, showing the wave smoothly oscillating. Add coordinate axes and label the amplitude as 1.'",
    "Here's a great prompt for a sine wave: 'Create a 2D animation of y = sin(x) with the curve drawn from left to right over 3 seconds. Include a grid background and axis labels.'",
    "For an interactive sine wave: 'Animate a sine curve that morphs from sin(x) to sin(2x) to sin(x/2), showing the frequency changes smoothly.'"
  ],
  "good prompt": [
    "A good prompt should: 1) Be specific about what to visualize, 2) Include mathematical details, 3) Mention any labels or axes, 4) Specify animation style (smooth, stepped, etc.).",
    "Tips for better prompts: Start with 'Animate' or 'Create', be concise but detailed, specify timing, and mention visual elements like colors, grid, or axes.",
    "Example of a strong prompt: 'Animate the growth of a Fibonacci spiral over 5 seconds, with golden ratio rectangles appearing sequentially, on a white background.'"
  ],
  "educational": [
    "For educational content: Focus on clarity, use step-by-step visualizations, add text labels, show important values, and explain transformations visually.",
    "Great for teaching: Break complex animations into stages, add annotations, use color to highlight key concepts, and include before/after comparisons.",
    "Educational best practices: Slow down animations, show intermediate steps clearly, add dimensional labels, and connect visual elements to equations."
  ],
  "3d": [
    "FlatMotion specializes in 2D animations. For complex 3D visualizations, stick to 2D projections or composites of 2D views.",
    "While we focus on 2D, you can create pseudo-3D effects using perspective transforms and layering. This gives impressive depth without true 3D.",
    "Tip: For 3D-like effects, use isometric projection or 2D cross-sections of 3D structures. Many mathematical concepts can be beautifully shown in 2D!"
  ],
  "prompt": [
    "I specialize in animation prompts! What type of animation are you interested in? Mathematical functions, geometric patterns, physics simulations, or data visualizations?",
    "Try describing your animation with: What moves? How does it move? What visual style? How long should it take? Include these and you'll get better results!"
  ],
  "start": [
    "Welcome! I'm here to help you create amazing animations. Start by: 1) Choose a mathematical concept to animate, 2) Describe it in detail, 3) Specify visual style and timing.",
    "To get started: Think about what you want to animate - a function, a geometric transformation, a physical process? Then describe it naturally, like you're explaining it to someone."
  ],
  "help": [
    "I can help you with: animation prompt writing, mathematical visualization ideas, animation techniques, best practices for clarity, and technical tips for FlatMotion!",
    "What would you like help with? I can assist with: sine waves, functions, geometric patterns, transformations, physics, data viz, educational animations, and more!"
  ],
  "function": [
    "For animating mathematical functions: Specify the equation (e.g., y=x², y=e^x), the domain, how it should be animated (drawn, revealed, transformed), and any interactive elements.",
    "Function animation tips: Show the equation clearly, use smooth transitions between values, consider animation duration, and add coordinate axes for reference."
  ],
  "color": [
    "Use colors intentionally: Gradients for smooth transitions, contrasting colors for emphasis, consistent colors for related elements, and accessibility-friendly palettes.",
    "Color suggestions: Use the primary purple (#7C3AED) and secondary cyan (#06B6D4) for consistency, or specify custom colors in your prompt for unique visualizations."
  ],
  "speed": [
    "Animation speed matters! Fast animations (1-2s) for simple shapes, medium (3-5s) for complex functions, slow (5-10s) for detailed explanations or educational content.",
    "Specify speed in your prompt: 'Animate over 5 seconds', 'quickly unfold', 'slowly reveal', etc. This helps create animations perfectly timed for your use case."
  ],
  "transform": [
    "For transformations: Think about rotation, scaling, translation, or morphing. Specify start state -> end state, and how the transition should look (smooth, stepped, eased).",
    "Transformation ideas: Rotate geometric shapes, scale functions up/down, translate objects across the canvas, or morph one shape into another."
  ],
  "default": [
    "I can help you craft better animation prompts! Try asking about: sine waves, functions, good prompts, educational content, colors, speed, transformations, or technical tips.",
    "Ask me anything about creating animations! I can help with mathematical visualizations, prompt writing, animation techniques, and FlatMotion best practices.",
    "Looking for animation inspiration? Ask me about specific math concepts, animation techniques, color strategies, timing, or how to explain complex ideas visually!"
  ]
};

export function AIChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Hi! I'm here to help you create better animation prompts. Ask me anything about FlatMotion!",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (messageText: string = input) => {
    if (!messageText.trim() || loading) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: messageText,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const lowerInput = messageText.toLowerCase();
      let responseArray: string[] = botResponses.default;

      for (const key in botResponses) {
        if (key !== "default" && lowerInput.includes(key)) {
          responseArray = botResponses[key as keyof typeof botResponses];
          break;
        }
      }

      // Pick a random response from the array
      const responseContent = responseArray[Math.floor(Math.random() * responseArray.length)];

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: responseContent,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
      setLoading(false);
    }, 800);
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-to-r from-primary to-secondary text-white shadow-lg hover:shadow-xl hover:scale-110 transition-all z-40 flex items-center justify-center"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 max-h-[600px] rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-surface shadow-2xl flex flex-col z-40 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary to-secondary text-white p-4">
            <h3 className="font-bold text-lg">Animation Helper</h3>
            <p className="text-sm opacity-90">Ask me how to create better animations</p>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white dark:bg-surface/50">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-xs rounded-lg p-3 ${
                    message.role === "user"
                      ? "bg-primary text-white rounded-br-none"
                      : "bg-gray-100 dark:bg-surface text-gray-900 dark:text-white rounded-bl-none"
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.content}</p>
                  {message.role === "assistant" && (
                    <button
                      onClick={() => copyToClipboard(message.content, message.id)}
                      className="mt-2 text-xs opacity-70 hover:opacity-100 transition-opacity flex items-center gap-1"
                    >
                      {copiedId === message.id ? (
                        <>
                          <Check className="w-3 h-3" />
                          Copied
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          Copy
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 dark:bg-surface text-gray-900 dark:text-white rounded-lg p-3 rounded-bl-none flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span className="text-sm">Thinking...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Actions */}
          {messages.length === 1 && !loading && (
            <div className="border-t border-gray-200 dark:border-white/10 p-3 bg-gray-50 dark:bg-surface/50">
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">Quick questions:</p>
              <div className="space-y-2">
                {systemPrompts.slice(0, 2).map((prompt, i) => (
                  <button
                    key={i}
                    onClick={() => handleSendMessage(prompt)}
                    className="text-xs w-full text-left p-2 rounded hover:bg-gray-200 dark:hover:bg-surface transition-colors text-gray-700 dark:text-gray-300"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="border-t border-gray-200 dark:border-white/10 p-3 bg-white dark:bg-surface flex gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a question..."
              disabled={loading}
              className="flex-1 px-3 py-2 rounded-lg border border-gray-300 dark:border-white/10 bg-gray-50 dark:bg-surface-2 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-primary text-sm disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="px-3 py-2 rounded-lg bg-primary text-white hover:opacity-90 disabled:opacity-50 transition-all flex items-center justify-center"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            </button>
          </form>
        </div>
      )}
    </>
  );
}
