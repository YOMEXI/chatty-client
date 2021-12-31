import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/dist/client/router";
import {
  Button,
  Card,
  Col,
  Container,
  Image,
  Row,
  Spinner,
} from "react-bootstrap";
import FollowTab from "../../components/Chat/followTab";
import axios from "axios";
import { ToastFailure } from "../../components/utils/alert";

import { followUser, unFollowUser } from "../../components/utils/followAccess";
import useSWR from "swr";

const profile = () => {
  let router = useRouter();
  const [profile, setprofile] = useState<any>();

  //

  const auth = useSelector((state: any) => state.auth);

  const { user } = auth;

  //
  let username = router.query.username;

  //
  const getProfile = async () => {
    try {
      const { data } = await axios.get(`/api/${username}`);
      setprofile(data);
    } catch (error: any) {
      ToastFailure(error);
    }
  };

  //

  useEffect(() => {
    getProfile();
  }, [router]);

  //

  let followerId = profile?.UserProfile._id;
  const { data: followers, error } = useSWR(
    followerId ? `/api/followers/${followerId}` : null
  );

  const isFollowing =
    followers &&
    followers.filter((f: any) => String(f._id) === String(user.user._id))
      .length;

  return (
    <>
      {profile ? (
        <>
          <FollowTab profile={profile} />
          <Container>
            <Row className="d-flex">
              <Col lg={4} md={7} sm={10} xs={10}>
                <Card className=" text-white mt-5" bg="dark">
                  <Card.Img variant="top" />

                  {profile?.UserProfile.imgUrl && (
                    <Card.Img src={profile?.UserProfile.imgUrl} />
                  )}
                  {!profile?.UserProfile.imgUrl && (
                    <Card.Img src={`/img/person.png`} />
                  )}
                  <Card.Body className="d-block">
                    <Card.Title>User Info</Card.Title>
                    <Card.Text>
                      Firstname: {profile?.UserProfile.firstname}
                    </Card.Text>
                    <Card.Text>
                      {" "}
                      Lastname: {profile?.UserProfile.lastname}
                    </Card.Text>
                    <Card.Text> Age: {profile?.UserProfile.age}</Card.Text>
                    <Col className="d-flex justify-content-between">
                      <Card.Text>
                        Username: {profile?.UserProfile.username}
                      </Card.Text>
                      <Card.Text>
                        {isFollowing === 0 && (
                          <Button
                            variant="danger"
                            onClick={() =>
                              followUser(
                                profile?.UserProfile._id,
                                profile?.UserProfile._id,
                                profile?.UserProfile.username,
                                user
                              )
                            }
                          >
                            Follow
                          </Button>
                        )}
                        {isFollowing > 0 && (
                          <Button
                            variant="secondary"
                            onClick={() =>
                              unFollowUser(
                                profile?.UserProfile._id,
                                profile?.UserProfile._id,
                                profile?.UserProfile.username
                              )
                            }
                          >
                            Unfollow
                          </Button>
                        )}
                      </Card.Text>
                    </Col>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </>
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

export default profile;
