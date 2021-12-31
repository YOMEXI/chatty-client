import dayjs from "dayjs";
import React from "react";

const Message = ({ own, message }: any) => {
  const Time = dayjs(message.createdAt).format("ddd, MMMM D, YYYY, h:mm A");

  //
  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img src={"/img/person.png"} className="messageImg" />
        <p className="messageText">{message.text}</p>
      </div>
      <div className="messageBottom">{Time}</div>
    </div>
  );
};

export default Message;
