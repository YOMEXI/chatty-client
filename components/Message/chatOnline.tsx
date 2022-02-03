import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getConversation } from "../utils/UserInfo";

const ChatOnline = ({ setCurrentChat, currentId, socketUsers }: any) => {
  const auth = useSelector((state: any) => state.auth);
  const { user } = auth;

  const [friends, setFriends] = useState<any>([]);

  const [RandomFriends, setRandomFriends] = useState([]);

  useEffect(() => {
    const getFriends = async () => {
      const { data } = await axios.get(`/api/following/${user?.user?._id}`);

      setFriends(data);
    };

    const getRandomFriends = async () => {
      const { data } = await axios.get(`/api/followers/${user?.user?._id}`);
      setRandomFriends(data);
    };

    getRandomFriends();
    getFriends();
  }, [currentId]);

  const isOnline = friends.filter((friend: any) =>
    socketUsers.filter((s: any) => s.userId.userId === friend._id)
  );

  const handleClick = async (userId: any) => {
    const { data } = await axios.get(
      `/api/conversation/${user?.user?._id}/${userId?.user?._id}`
    );

    setCurrentChat(data);
  };

  const handleClick2 = async (userId: any) => {
    const { data } = await axios.get(
      `/api/conversation/${user?.user?._id}/${userId?._id}`
    );

    setCurrentChat(data);
  };

  return (
    <>
      <div className="chatOnline">
        <p>Online Friends</p>
        {friends &&
          friends.map((o: any, i: any) => (
            <div
              className="chatOnlineFriend"
              key={i}
              onClick={() => handleClick(o)}
            >
              <div className="chatOnlineImgContainer">
                {/* <img
                  src={o?.user?.imgUrl ? o?.user?.imgUrl : "/img/preety.jpg"}
                  alt=""
                  className="chatOnlineImg"
                /> */}
                <div className={isOnline && "chatOnlineBadge"}></div>
              </div>
              <span className="chatOnlineName">{o?.user?.username}</span>
            </div>
          ))}
        <br />
        <p>Other Friends</p>
        {RandomFriends &&
          RandomFriends.map((o: any, i: any) => (
            <div
              className="chatOnlineFriend"
              key={i}
              onClick={() => handleClick2(o)}
            >
              <div className="chatOnlineImgContainer">
                <img
                  src={o?.user?.imgUrl ? o?.user?.imgUrl : "/img/preety.jpg"}
                  alt=""
                  className="chatOnlineImg"
                />

                <div className={isOnline && "chatOnlineBadge"}></div>
              </div>
              <span className="chatOnlineName">{o?.username}</span>
            </div>
          ))}
      </div>
    </>
  );
};

export default ChatOnline;
