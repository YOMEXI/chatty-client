import React, { useState } from "react";
import {
  Col,
  Container,
  Row,
  FloatingLabel,
  Form,
  Spinner,
  Button,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { errorMsg, successMsg } from "../../../components/utils/alert";
import { PostInput } from "../../../interface/User";
import { createPost } from "../../../redux/posts/postAction";

const createpost: React.FC<PostInput> = () => {
  const [posts, setposts] = useState({
    title: "",
    text: "",
    formData: new FormData(this),
  });

  const Post = useSelector((state: any) => state.Post);
  const { loading, success, error } = Post;

  const auth = useSelector((state: any) => state.auth);
  const { user } = auth;

  const dispatch = useDispatch();

  //
  const { title, text, formData } = posts;

  const handleChange = (name: any) => (e: any) => {
    const value = name === "picUrl" ? e.target.files[0] : e.target.value;

    formData.set(name, value);
    setposts({ ...posts, [name]: value });
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
    dispatch(createPost(formData));
    setposts({ ...posts, text: "", title: "" });
  };
  return (
    <>
      <Container>
        <Row className="justify-content-center mt-4 text-center container">
          {success && successMsg(success)}
          {error && errorMsg(error)}
        </Row>
        <Row className="mt-5 justify-content-center">
          <Col
            lg={8}
            md={9}
            sm={10}
            xs={10}
            className="mt-5 justify-content-center bg-dark p-3 border-2"
          >
            <>
              <Col className="justify-content-center text-white rounded">
                Create amazing Posts
              </Col>
              <Form onSubmit={onSubmit}>
                <FloatingLabel label="Title" className="mb-3 ">
                  <Form.Control
                    type="ematextil"
                    placeholder="Title"
                    onChange={handleChange("title")}
                    value={title}
                  />
                </FloatingLabel>
                <FloatingLabel label="Text/Description">
                  <Form.Control
                    as="textarea"
                    style={{ height: "100px" }}
                    onChange={handleChange("text")}
                    value={text}
                    placeholder="Text/Description"
                  />
                </FloatingLabel>
                <Form.Group className="mb-3">
                  <Form.Label>Upload Image</Form.Label>

                  <Form.Control type="file" onChange={handleChange("picUrl")} />
                </Form.Group>

                {!loading ? (
                  <Button
                    type="submit"
                    size="sm"
                    className="bg-light text-dark"
                    disabled={!user}
                  >
                    Submit
                  </Button>
                ) : (
                  <Button variant="secondary" disabled>
                    <Spinner
                      as="span"
                      animation="grow"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                      variant="dark"
                    />
                    creating post
                  </Button>
                )}
              </Form>
            </>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default createpost;
