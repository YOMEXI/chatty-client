import dayjs from "dayjs";
import Link from "next/link";
import { useRouter } from "next/router";
import { Col, Container, Row, Image, Button, Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";

const Post = ({ post, deletePost, error, Like, loading, likePost }: any) => {
  const auth = useSelector((state: any) => state.auth);

  const { user } = auth;
  const Time = dayjs(post.createdAt).format("ddd, MMMM D, YYYY, h:mm A");
  //
  const router = useRouter();

  return (
    <>
      <div className="homepage d-flex justify-content-between">
        {post && router.pathname === "/" && (
          <Button variant="primary">Latest Posts</Button>
        )}
        {user?.user && (
          <div>
            <Link href="/chat/posts/createpost">
              <a className="linky">
                {" "}
                <Button variant="primary">Create Post</Button>
              </a>
            </Link>
          </div>
        )}
      </div>

      {post ? (
        post?.map((post: any, i: any) => (
          <div className="post" key={i}>
            <div className="postWrapper">
              <div className="postTop">
                <div className="postTopLeft">
                  <img
                    src={
                      post.user.imgUrl ? post.user.imgUrl : `/img/person.png`
                    }
                    alt=""
                    className="postProfileImg"
                  />

                  <span className="postUsername">
                    <a className="removeA" href={`/auth/${post.user.username}`}>
                      {post.user.username}
                    </a>
                  </span>
                  <span className="postDate">{Time}</span>
                </div>

                <div className="postTopRight">
                  <i className="fa fa-ellipsis-v" aria-hidden="true"></i>
                </div>
              </div>
              <div className="postTopCenter">
                <div className="topCenterText">
                  <span className="postTitle">{post.title}</span>
                  <div className="postCenter">
                    <span className="postText">
                      <a className="removeA" href={`/chat/posts/${post._id}`}>
                        {post?.text}
                      </a>
                    </span>
                  </div>
                </div>
                <div>
                  {post?.picUrl && (
                    <Image
                      src={post?.picUrl ? post?.picUrl : ""}
                      alt=""
                      className="postImg"
                      height={150}
                      width={150}
                    />
                  )}
                </div>
              </div>

              <div className="postBottom">
                <div className="postBottomLeft">
                  {user && Number(Like) > 0 && (
                    <i
                      onClick={() => likePost(post._id)}
                      className="fas fa-thumbs-up fa-lg mx-1  userLiked"
                    ></i>
                  )}
                  {user && Number(Like) === 0 && (
                    <i
                      onClick={() => likePost(post._id)}
                      className="fas fa-thumbs-up fa-lg me-2 "
                    ></i>
                  )}
                  <span>{post.likes.length} Likes</span>
                </div>

                <div className="postBottomRight">
                  <i className="fas fa-comment fa-lg  mx-1"> </i>
                  {post.comments.length} Comments
                  {router.pathname !== "/" && (
                    <i
                      onClick={() => deletePost()}
                      style={{ color: "red" }}
                      className="fas fa-trash fa-lg cursor "
                    ></i>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <Row>
          <Col className="d-flex justify-content-center mt-5">
            <Spinner animation="grow" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </Col>
        </Row>
      )}
    </>
  );
};

export default Post;
