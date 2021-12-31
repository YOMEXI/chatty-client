import {
  Card,
  Col,
  Container,
  Row,
  Button,
  Spinner,
  FloatingLabel,
  Modal,
  Form,
} from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import React, { useRef, useState } from "react";
import { COMMENT } from "../../interface/User";
import axios from "axios";
import { mutate } from "swr";
import { ToastSuccess } from "../utils/alert";

const CommentCard: React.FC<COMMENT> = ({ post }) => {
  const [show, setShow] = useState(false);
  const [loading, setloading] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [text, settext] = useState("");

  const id = post.map((p: any) => p._id);

  //
  const submit = async () => {
    setloading(true);
    const { data } = await axios.post(`/api/comment/${id}`, { text });

    ToastSuccess(data.msg);
    mutate(`/api/posts/${id}`);
    setloading(false);
    settext("");
  };

  const deleteComment = async (commentId: any) => {
    const { data } = await axios.delete(`/api/comment/${id}/${commentId}`);
    mutate(`/api/posts/${id}`);
    ToastSuccess(data);
  };

  //

  return (
    <>
      <Container>
        <Row className="mt-1 mb-3">
          <>
            <Col lg={2} sm={1} xs={1} md={2}></Col>
            <Col>
              {" "}
              <>
                <Button
                  variant="primary"
                  onClick={handleShow}
                  className="rounded-pill  border border-0"
                >
                  Create Comment
                </Button>

                <Modal
                  show={show}
                  onHide={handleClose}
                  backdrop="static"
                  keyboard={false}
                  size="lg"
                  aria-labelledby="contained-modal-title-vcenter"
                  scrollable={true}
                >
                  <Modal.Header closeButton>
                    <Modal.Title>Create Comment</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <FloatingLabel
                      controlId="floatingTextarea2"
                      label="Comments"
                    >
                      <Form.Control
                        as="textarea"
                        placeholder="Leave a comment here"
                        className="border border-1 border-primary"
                        style={{ height: "100px" }}
                        value={text}
                        onChange={(e) => settext(e.target.value)}
                      />
                    </FloatingLabel>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                      Close
                    </Button>
                    {!loading && (
                      <Button variant="primary" onClick={submit}>
                        Submit
                      </Button>
                    )}
                    {loading && (
                      <Button variant="dark" disabled>
                        <Spinner
                          as="span"
                          animation="grow"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                        />
                        Loading...
                      </Button>
                    )}
                  </Modal.Footer>
                </Modal>
              </>
            </Col>
          </>
        </Row>
        <Row>
          <Col lg={2} sm={1} xs={1} md={2}></Col>
          <Col lg={6} md={7} sm={10} xs={10}>
            {post.map((p: any) =>
              p.comments.map((p: any) => (
                <Card
                  key={p._id}
                  bg="dark"
                  className="text-white text-wrap mt-3"
                >
                  <Card.Header>
                    {p.user.username}{" "}
                    <i
                      onClick={() => deleteComment(p._id)}
                      className="fas fa-trash fa-lg mt-2  mx-2 pointer"
                    ></i>
                  </Card.Header>
                  <Card.Body>
                    <Card.Text>{p.text}</Card.Text>
                  </Card.Body>
                </Card>
              ))
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default CommentCard;
