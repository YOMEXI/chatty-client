import axios from "axios";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import useSWR, { useSWRConfig } from "swr";
import CommentCard from "../../../components/Chat/commentCard";
import PostCard from "../../../components/Chat/postCard";
import { likePost, deletePost } from "../../../components/utils/postAccess";
import Post from "../../post";
import { successMsg, errorMsg } from "./../../../components/utils/alert";

const SinglePost = () => {
  const router = useRouter();
  // const [post, setpost] = useState([]);

  const [loading, setloading] = useState(false);

  let id = router.query.singlepost;

  const auth = useSelector((state: any) => state.auth);
  const { user } = auth;

  // const getPost = async () => {
  //   const { data }: any = await axios.get(`/api/posts/${id}`);
  //   setpost(data);
  // };
  // useEffect(() => {
  //   getPost();
  // }, [router]);
  const { data: post, error } = useSWR(id ? `/api/posts/${id}` : null);

  const Like = (post: any) => {
    return post.map(
      (p: any) =>
        p?.likes.filter(
          (p: any) => p?.user?.toString() === user?.user?._id.toString()
        ).length
    );
  };

  const PostDelete = () => {
    return id && deletePost(id, setloading);
  };

  const PostLike = (id: any) => {
    return likePost(id, post, user);
  };

  //

  if (!post) {
    return (
      <Container>
        <Col className="justify-content-center  text-center mt-2 fs-5">
          {!post && "No Post Found"}
        </Col>
      </Container>
    );
  } else if (post.length === 0) {
    return (
      <Row>
        <Col className="justify-content-center container text-center fs-5">
          No Posts Yet
        </Col>
      </Row>
    );
  } else {
    return (
      <>
        {post && (
          // <PostCard
          //   post={post}
          //   error=""
          //   likePost={PostLike}
          //   deletePost={PostDelete}
          //   Like={Like(post)}
          // />
          <div className="Category">
            <div className="leftSide"></div>
            <div className="mainSide">
              {/* {post && <PostCard post={post} />} */}
              {post && (
                <Post
                  post={post}
                  error=""
                  likePost={PostLike}
                  deletePost={PostDelete}
                  Like={Like(post)}
                />
              )}
            </div>
            <div className="rightSide"></div>
          </div>
        )}
        {post && <CommentCard post={post} />}
      </>
    );
  }
};

export default SinglePost;
