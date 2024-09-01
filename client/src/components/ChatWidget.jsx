import { useEffect, useState } from "react";
import { IoChatbubble } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";

import {
  addMessage,
  getConversationDetails,
  getMessage,
  setConversation,
} from "../Redux/slices/chatSlice";
import Chats from "./AllChats";

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);

  // const [messages, setMessages] = useState([
  //   { sender: "support", text: "Hi! How can we help you?" },
  // ]);
  const [input, setInput] = useState("");

  const dispatch = useDispatch();
  const userData = useSelector((state) => state?.auth?.data);
  const { conversation, messages } = useSelector((state) => state?.chat);
  const [newMessageFlag, setNewMessageFlag] = useState(false);
  const toggleChat = async () => {
    console.log(isOpen);
    const data = {
      senderId: userData._id,
      receiverId: import.meta.env.VITE_REACT_APP_ADMIN_ID,
    };

    if (!isOpen) {
      await dispatch(setConversation(data));
      setIsOpen(!isOpen);
      !conversation && (await dispatch(getConversationDetails(data)));
    } else {
      setIsOpen(!isOpen);
    }
  };

  useEffect(() => {
    if (isOpen) {
      (async () => {
        conversation && (await dispatch(getMessage(conversation._id)));
      })();
    }
  }, [conversation, isOpen , newMessageFlag]);
  // const handleSendMessage = () => {
  //   if (input.trim()) {
  //     // Add the user's message
  //     setMessages([...messages, { sender: "user", text: input }]);
  //     setInput("");

  //     // Simulate a response from the support team
  //     setTimeout(() => {
  //       setMessages((prevMessages) => [
  //         ...prevMessages,
  //         {
  //           sender: "support",
  //           text: "Thanks for reaching out! We will assist you shortly.",
  //         },
  //       ]);
  //     }, 1000);
  //   }
  // };

  const sendMessage = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("senderId", userData?._id);
    formData.append("receiverId", import.meta.env.VITE_REACT_APP_ADMIN_ID);
    formData.append("conversationId", conversation?._id);

    formData.append("type", "text");
    formData.append("text", input);
    console.log(formData);
    await dispatch(addMessage(formData));
    setInput("");
    setNewMessageFlag(!newMessageFlag);
  };
  return (
    <div>
      {import.meta.env.VITE_REACT_APP_CHATING === "true" && (
        <div className="fixed z-50 bottom-10 right-8 cursor-pointer bg-purple-400 rounded-[50%] w-14 h-14 flex justify-center items-center">
          <div className="" onClick={() => toggleChat()}>
            <IoChatbubble className="text-white text-3xl" />
            <div className=" fixed bg-red-800 text-white rounded-[50%] w-6 h-6 bottom-[5.1rem]   flex items-center justify-center">
              3
            </div>
          </div>
        </div>
      )}
      {isOpen && (
        <div className="fixed z-50  w-[100vw] h-[100vh] bottom-0 right-0 lg:bottom-32 lg:right-8 lg:w-[50vw] lg:h-[50vh] bg-gray-500 shadow-lg rounded-lg flex flex-col">
          <div className="flex justify-between items-center bg-purple-500 text-white p-3 rounded-t-lg   ">
            <span className="pl-3">Chat with us!</span>
            <span
              className="cursor-pointer text-white"
              onClick={() => toggleChat()}
            >
              ✖
            </span>
          </div>

          <div className="p-4 flex-1 overflow-y-auto">
            {messages &&
              messages.map((message, index) => (
                <Chats key={index} msg={message} />
              ))}
          </div>

          {/* send new message */}
          <form
            className="border-t p-3 flex items-center"
            onSubmit={(e) => sendMessage(e)}
          >
            <input
              type="text"
              placeholder="Type your message..."
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button
              type="submit"
              className="ml-2 bg-purple-500 text-white p-2 rounded-lg"
            >
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ChatWidget;
