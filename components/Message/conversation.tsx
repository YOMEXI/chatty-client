import axios from "axios";
import { useEffect, useState } from "react";
import { ToastFailure } from "../utils/alert";

const conversation = ({ conversation, currentUser }: any) => {
  const [user, setUser] = useState<any>("");

  useEffect(() => {
    const friendId = conversation.members.find(
      (m: any) => m !== currentUser?._id
    );

    const getProfile = async () => {
      try {
        const { data } = await axios.get(`/api/message/getuser/${friendId}`);
        setUser(data);
      } catch (error: any) {
        ToastFailure(error);
      }
    };
    getProfile();
  }, [currentUser, conversation]);

  return (
    <div className="conversation cursor">
      <img
        className="conversationImg"
        src={
          user?.UserProfile?.imgUrl
            ? user?.UserProfile?.imgUrl
            : `/img/person.png`
        }
      />
      <span className="conversationText">{user?.UserProfile?.username}</span>
    </div>
  );
};

export default conversation;
