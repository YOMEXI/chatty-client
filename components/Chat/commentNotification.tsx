import dayjs from "dayjs";
import {
  Card,
  Col,
  Container,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";

const CommentNotification = ({ notifications, i }: any) => {
  const { user, post, type, text, date } = notifications;

  let Time = dayjs(date).format(` ddd, MMM D YYYY  H:mm a`);
  return (
    <Card.Body key={i}>
      <Card.Body>
        <strong className="fw-bolder fs-5">{user?.username}</strong> wrote a
        Comment <span className="fw-bolder">{text}</span> on your post {""}
        <span className="fw-bolder">
          {post.title ? post.title : post.text}
        </span>{" "}
        on {Time}
      </Card.Body>
    </Card.Body>
  );
};

export default CommentNotification;
