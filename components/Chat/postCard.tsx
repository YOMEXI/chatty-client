import { useRouter } from "next/router";
import Link from "next/link";

import { Card, Col, Container, Row, Image, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { POST } from "../../interface/User";

const PostCard: React.FC<POST> = ({
  post,
  deletePost,
  error,
  Like,
  loading,
  likePost,
}) => {
  const dispatch = useDispatch();
  const router = useRouter();
  //
  console.log(Like);
  const auth = useSelector((state: any) => state.auth);

  const { user } = auth;

  return (
    <>
      <Container>
        <Row className="mt-5">
          <Col lg={8} md={10} sm={11} xs={11}>
            <Container>
              <Row className="fs-5 mb-2">
                {router.pathname === "/" && (
                  <Col className="bg-dark text-white d-flex justify-content-center rounded-pill">
                    Latest Posts
                  </Col>
                )}
                {user?.user && (
                  <Col className="bg-dark text-white d-flex justify-content-center rounded-pill">
                    <Link href="/chat/posts/createpost">
                      <a className="text-white"> Create Posts</a>
                    </Link>
                  </Col>
                )}
              </Row>
            </Container>
            <Row>
              {post &&
                post?.map((p: any, i: any) => (
                  <Container key={i}>
                    <div>
                      <Card
                        key={i}
                        border="dark"
                        className="bg-dark text-white"
                      >
                        <Card.Body className="text-center fs-5 pointer">
                          <Row className="bg-dark text-white">
                            <Col className="d-flex mb-2 ">
                              <div className="me-2 text-white">
                                <a
                                  href={`/auth/${p.user.username}`}
                                  className="text-white"
                                >
                                  {p?.user.username}
                                </a>
                              </div>
                              <div className="me-2 ">
                                {p.user.imgUrl && (
                                  <Image
                                    src={p.user.imgUrl}
                                    roundedCircle
                                    style={{ width: "30px", height: "30px" }}
                                  />
                                )}
                                {!p.user.imgUrl && (
                                  <Image
                                    src={`/img/person.png`}
                                    roundedCircle
                                    style={{ width: "25px", height: "25px" }}
                                  />
                                )}
                              </div>
                            </Col>

                            {/* {p.picUrl && (
                              <Card.Img
                                variant="top"
                                src={p.picUrl}
                                style={{ width: "712px", height: "180px" }}
                                className="bg-light"
                              />
                            )} */}
                          </Row>
                          <a
                            className="text-white"
                            href={`/chat/posts/${p._id}`}
                          >
                            <Card.Text>
                              Title: {}
                              {p.title}
                            </Card.Text>
                            <Card.Text>{p.text}</Card.Text>
                          </a>
                        </Card.Body>
                        <Container>
                          <Row
                            className="bg-light text-dark border mb-1 p-1 fs-6"
                            style={{ borderRadius: "10px" }}
                          >
                            <Col>
                              {user && Number(Like) === 0 ? (
                                <i
                                  onClick={() => likePost(p._id)}
                                  className="fas fa-thumbs-up fa-lg mt-2  mx-1 cursor"
                                  style={{ cursor: "pointer" }}
                                ></i>
                              ) : (
                                ""
                              )}
                              {user && Number(Like) > 0 ? (
                                <i
                                  onClick={() => likePost(p._id)}
                                  className="fas fa-thumbs-up fa-lg mt-2 userLiked mx-1 cursor"
                                ></i>
                              ) : (
                                ""
                              )}
                              {p.likes.length} Likes
                            </Col>

                            <Col sm={6} xs={6}>
                              <i className="fas fa-comment fa-lg mt-2 mx-2"></i>{" "}
                              {p.comments.length} Comments
                            </Col>
                            {router.pathname === `/chat/posts/[singlepost]` &&
                              user && (
                                <Col sm={2} xs={2} style={{ color: "red" }}>
                                  {!loading ? (
                                    <i
                                      style={{ cursor: "pointer" }}
                                      onClick={() => deletePost()}
                                      className="fas fa-trash fa-lg mt-2  mx-2"
                                    ></i>
                                  ) : (
                                    <Spinner animation="border" size="sm" />
                                  )}
                                </Col>
                              )}
                          </Row>
                        </Container>
                        <a />
                      </Card>
                    </div>

                    <br />
                  </Container>
                ))}
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default PostCard;
