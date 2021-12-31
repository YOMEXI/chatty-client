import axios from "axios";
import { ToastFailure } from "./alert";

export const getUserInfo = async (userToFindId: any) => {
  console.log(userToFindId);
  try {
    const { data } = await axios.get(`/api/chat/user/${userToFindId}`);

    return { data };
  } catch (error) {
    return { error };
  }
};

export const getConversation = async (setConversations: any, user: any) => {
  try {
    const { data } = await axios.get(`/api/conversation/${user?.user?._id}`);
    setConversations(data);
  } catch (error: any) {
    ToastFailure(error);
  }
};

export const getMessage = async (setMessages: any, currentChat: any) => {
  try {
    const { data } = await axios.get(`/api/message/${currentChat?._id}`);
    setMessages(data);
  } catch (error: any) {
    ToastFailure(error);
  }
};
//
