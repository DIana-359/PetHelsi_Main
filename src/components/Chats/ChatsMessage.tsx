import { Fragment, RefObject } from "react";
import { Message } from "@/types/chatsTypes";
import MessageItem from "@/components/Chats/MessageItem";
import { getChatMessageDateLabel } from "@/utils/date/getChatMessageDateLabel";
import { Pulse } from "@/components/Pulse";

interface ChatsMessagesProps {
  messages: Message[];
  currentUserId: number;
  loading?: boolean;
  onMessageVisible: (chatId: string, messageId: string) => void;
  isPanelVisible: boolean;
  scrollContainerRef: RefObject<HTMLDivElement | null>;
  onRetry?: (clientMessageId: string) => void;
}

export default function ChatsMessage({
  messages,
  currentUserId,
  loading,
  onMessageVisible,
  isPanelVisible,
  scrollContainerRef,
  onRetry,
}: ChatsMessagesProps) {
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-full">
        <Pulse />
      </div>
    );
  }

  return (
    <div className="py-[16px] md:p-[24px] md:pr-0 mb-[8px]">
      <ul className="flex flex-col gap-3">
        {messages.map((msg, index) => {
          const currentLabel = getChatMessageDateLabel(msg.timestamp);
          const prevLabel =
            index > 0 ? getChatMessageDateLabel(messages[index - 1].timestamp) : null;
          const showDateDivider = currentLabel !== prevLabel;

          return (
            <Fragment key={`${msg.chatId}-${msg.messageId}`}>
              {showDateDivider && (
                <li className="flex justify-center">
                  <span className="text-xs text-gray-500 py-2">{currentLabel}</span>
                </li>
              )}
              <MessageItem
                msg={msg}
                currentUserId={currentUserId}
                onMessageVisible={onMessageVisible}
                isPanelVisible={isPanelVisible}
                scrollContainerRef={scrollContainerRef}
                onRetry={onRetry}
              />
            </Fragment>
          );
        })}
      </ul>
    </div>
  );
}