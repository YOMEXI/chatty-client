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
          <div className="mt-4">
            <FollowTab profile={profile} />
          </div>

          <div className="profile-card">
            {profile && (
              <>
                <div className="image-container">
                  <img
                    src={
                      profile?.UserProfile?.imgUrl
                        ? profile?.UserProfile?.imgUrl
                        : "/img/person.png"
                    }
                    alt=""
                    className="imgs"
                  />
                </div>
                <div className="main-container">
                  <div className="profile-details">
                    <h4>
                      <i className="fas fa-info"> </i>
                      <span>User Info</span>
                    </h4>
                    <p className="details">
                      firstname: <i className="fas fa-dice-d20"></i>{" "}
                      {profile?.UserProfile?.firstname}
                    </p>
                    <p className="details">
                      lastname: <i className="fas fa-dice-d20"></i>{" "}
                      {profile?.UserProfile?.lastname}
                    </p>
                    <p className="details">
                      username: <i className="fas fa-dice-d20"></i>{" "}
                      {profile?.UserProfile?.username}
                    </p>
                    <hr />
                    <div>
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
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* <Container>
            <Row className="d-flex">
              <Col lg={4} md={7} sm={10} xs={10}>
                
                      <Card.Text>
                        
                      </Card.Text>
                    </Col>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container> */}
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
