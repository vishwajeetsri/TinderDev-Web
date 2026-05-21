{/* Messages */}
<div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
  {messages.map((msg, index) => {

    const isMyMessage = msg.senderId === userId;

    return (
      <div
        key={index}
        className={`flex ${
          isMyMessage ? "justify-end" : "justify-start"
        }`}
      >
        <div
          className={`
            px-4 py-3 rounded-2xl text-sm shadow-lg
            break-words w-fit max-w-[60%]
            ${
              isMyMessage
                ? "bg-pink-500 text-white rounded-br-sm"
                : "bg-gray-800 text-gray-100 rounded-bl-sm"
            }
          `}
        >

          {/* Name */}
          <p
            className={`text-xs mb-1 ${
              isMyMessage
                ? "text-pink-200 text-right"
                : "text-cyan-300 text-left"
            }`}
          >
            {msg.firstName}
          </p>

          {/* Text */}
          <p>{msg.text}</p>
        </div>
      </div>
    );
  })}
</div>