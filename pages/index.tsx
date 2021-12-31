import axios from "axios";
import { useRouter } from "next/dist/client/router";
import React, { useEffect, useState } from "react";
import { Col, Spinner } from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroll-component";

import PostCard from "../components/Chat/postCard";
import { POST } from "./../interface/User";
import Post from "./post";

const indexx = () => {
  const router = useRouter();
  const [post, setpost] = useState<any[]>([]);
  const [pageNumber, setpageNumber] = useState(0);
  //
  const [hasMore, sethasMore] = useState(true);

  const allPost = async () => {
    const { data }: any = await axios.get(
      `/api/posts?pageNumber=${pageNumber}`
    );
    setpost(data);
  };

  const fetchData = async () => {
    const { data }: any = await axios.get(
      `/api/posts?pageNumber=${pageNumber + 1}`
    );

    if (data.length === 0) sethasMore(false);
    setpost((prev) => [...prev, ...data]);
    setpageNumber((prev) => prev + 1);
  };

  useEffect(() => {
    allPost();
  }, [router]);

  return (
    <>
      <div className="Category">
        <div className="leftSide"></div>
        <div className="mainSide">
          <InfiniteScroll
            hasMore={hasMore}
            next={fetchData}
            dataLength={post && post.length}
            loader={
              <div className=" container justify-content-center fs-4">
                {/* Loading More */}
              </div>
            }
            endMessage={
              <Col className="d-flex fs-3 justify-content-center mt-5">
                No More Posts Available{" "}
              </Col>
            }
          >
            {post && <Post post={post} />}
          </InfiniteScroll>
        </div>
        <div className="rightSide"></div>
      </div>
    </>
  );
};

export default indexx;
