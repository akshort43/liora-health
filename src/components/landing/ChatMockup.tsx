const ChatMockup = () => {
  return (
    <div className="bg-card rounded-2xl shadow-2xl border border-border/50 overflow-hidden w-full max-w-md mx-auto">
      {/* Chat header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-border/50">
        <div className="w-3 h-3 rounded-full bg-accent" />
        <span className="font-semibold text-foreground text-sm">Messages</span>
        <div className="w-4 h-4 rounded border border-foreground/30" />
      </div>

      {/* Chat messages */}
      <div className="p-5 space-y-4 min-h-[340px]">
        {/* User message 1 */}
        <div className="flex justify-end opacity-0 animate-chat-bubble-1">
          <div className="bg-chat-blue text-accent-foreground rounded-2xl rounded-tr-md px-4 py-3 max-w-[80%]">
            <p className="text-sm">Ugh, just left another doctor appt with more questions than answers</p>
          </div>
        </div>

        {/* User message 2 */}
        <div className="flex justify-end opacity-0 animate-chat-bubble-2">
          <div className="bg-chat-blue text-accent-foreground rounded-2xl rounded-tr-md px-4 py-3 max-w-[80%]">
            <p className="text-sm">I felt so rushed and confused!!!</p>
          </div>
        </div>

        {/* User message 3 */}
        <div className="flex justify-end opacity-0 animate-chat-bubble-3">
          <div className="bg-chat-blue text-accent-foreground rounded-2xl rounded-tr-md px-4 py-3 max-w-[80%]">
            <p className="text-sm">Need to see another specialist but I'm tired of starting over... every time 😞😤</p>
          </div>
        </div>

        {/* Reply */}
        <div className="flex justify-start opacity-0 animate-chat-bubble-4">
          <div className="bg-secondary text-foreground rounded-2xl rounded-tl-md px-4 py-3 max-w-[70%]">
            <p className="text-sm font-medium">LIORA can help!</p>
          </div>
        </div>
      </div>

      {/* Chat input */}
      <div className="px-5 pb-5">
        <div className="flex items-center gap-3 border border-border rounded-full px-4 py-2.5">
          <span className="text-muted-foreground text-sm flex-1">Message</span>
          <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-accent-foreground">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatMockup;
