import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { io } from "socket.io-client";
import ChatOnline from "../../components/Message/chatOnline";
import Conversation from "../../components/Message/conversation";
import Message from "../../components/Message/Message";
import { ToastFailure, ToastSuccess } from "../../components/utils/alert";
import { getConversation, getMessage } from "../../components/utils/UserInfo";
import { Button } from "react-bootstrap";

const msg = () => {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState<any>(null);
  const [messages, setMessages] = useState<any>(null);
  const [newMessage, setNewMessage] = useState<any>("");
  const [arrivalMessage, setArrivalMessage] = useState<any>(null);

  const [socketUsers, setsocketUsers] = useState<any>([]);

  const scrollRef = useRef<any>();
  const socket = useRef<any>();

  const auth = useSelector((state: any) => state.auth);
  const { user } = auth;

  useEffect(() => {
    getConversation(setConversations, user);
  }, [user?.user?.id]);

  useEffect(() => {
    getMessage(setMessages, currentChat);
  }, [currentChat]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const message = {
      sender: user?.user?._id,
      text: newMessage,
      conversationId: currentChat ? currentChat?._id : "",
    };

    const recieverId = currentChat?.members.find(
      (m: any) => m !== user?.user?._id
    );

    socket.current.emit("sendMessage", {
      senderId: user?.user?._id,
      recieverId: recieverId,
      text: newMessage,
    });

    try {
      const { data }: any = await axios.post(`/api/message`, message);

      setMessages([...messages, data]);
      setNewMessage("");
    } catch (error: any) {
      ToastFailure(error);
    }
  };
  //

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behaviour: "smooth" });
  }, [messages]);

  //connect and disconnect socket.io
  useEffect(() => {
    if (!socket.current) {
      socket.current = io(`${process.env.NEXT_PUBLIC_API}`);
    }

    return () => {
      if (socket?.current) {
        // socket?.current?.emit("disconnect");
        socket?.current?.disconnect(true);
        socket?.current?.off();
      }
    };
  }, []);

  useEffect(() => {
    socket.current.emit("addUser", { userId: user?.user?._id });
    socket.current.on("getUsers", (users: any) => {
      setsocketUsers(users);
    });
  }, [user?.user?._id]);

  //getMessage
  useEffect(() => {
    socket.current.on("getMessage", (data: any) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev: any) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  //

  return (
    <div className="messenger">
      <div className="chatBox">
        <div className="chatBoxWrapper">
          {currentChat || currentChat === null ? (
            <>
              <div className="chatBoxTop">
                {messages &&
                  messages.map((message: any, i: any) => {
                    return (
                      <div ref={scrollRef} key={i}>
                        <Message
                          message={message}
                          key={i}
                          own={message?.sender === user?.user?._id}
                        />
                      </div>
                    );
                  })}
              </div>
              <div className="chatBoxBottom">
                <textarea
                  className="chatMessageInput"
                  id=""
                  placeholder="Input Message"
                  value={newMessage}
                  onChange={(e: any) => setNewMessage(e.target.value)}
                ></textarea>
                <Button
                  className="mt-2 "
                  variant="primary"
                  onClick={handleSubmit}
                >
                  Send
                </Button>
              </div>
            </>
          ) : (
            <span className="noConversation">
              Open a conversation to start a chat <br /> or Follow a user to
              start a chat with them
            </span>
          )}
        </div>
      </div>
      <div className="chatOnline">
        <div className="chatOnlineWrapper">
          <ChatOnline
            socket={socket}
            socketUsers={socketUsers}
            currentId={user?.user?._id}
            setCurrentChat={setCurrentChat}
            setConversations={setConversations}
            conversation={conversations}
          />
        </div>
      </div>
    </div>
  );
};

export default msg;
