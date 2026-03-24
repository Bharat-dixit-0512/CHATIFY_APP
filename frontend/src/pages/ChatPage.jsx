import { useChatStore } from "../store/useChatStore";

import BorderAnimatedContainer from "../components/BorderAnimatedContainer";
import ProfileHeader from "../components/ProfileHeader";
import ActiveTabSwitch from "../components/ActiveTabSwitch";
import ChatsList from "../components/ChatsList";
import ContactList from "../components/ContactList";
import ChatContainer from "../components/ChatContainer";
import NoConversationPlaceholder from "../components/NoConversationPlaceholder";

function ChatPage() {
  const { activeTab, selectedUser } = useChatStore();

  return (
    <div className="relative w-full max-w-6xl mx-auto h-[100dvh] p-2 sm:p-4 lg:h-[calc(100dvh-2rem)]">
      <BorderAnimatedContainer className="h-full overflow-hidden">
        <div className="flex h-full">
          <div
            className={`${
              selectedUser ? "hidden lg:flex" : "flex"
            } w-full lg:w-80 lg:min-w-80 bg-slate-800/50 backdrop-blur-sm flex-col border-r border-slate-700/50`}
          >
            <ProfileHeader />
            <ActiveTabSwitch />

            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              {activeTab === "chats" ? <ChatsList /> : <ContactList />}
            </div>
          </div>

          <div
            className={`${
              selectedUser ? "flex" : "hidden lg:flex"
            } min-w-0 flex-1 flex-col bg-slate-900/50 backdrop-blur-sm`}
          >
            {selectedUser ? <ChatContainer /> : <NoConversationPlaceholder />}
          </div>
        </div>
      </BorderAnimatedContainer>
    </div>
  );
}
export default ChatPage;
