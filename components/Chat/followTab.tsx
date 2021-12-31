import { useRouter } from "next/router";
import { Card, Col, Row, Container, Nav } from "react-bootstrap";
import { PROFILE } from "../../interface/User";

const followTab: React.FC<PROFILE> = ({ profile }) => {
  return (
    <>
      {profile && (
        <Container>
          <Col lg={10} md={11} sm={10} xs={10}>
            <Card>
              <Row className="d-flex">
                <Col>
                  <Nav.Link
                    className=" mt-1 p-1 text-dark"
                    href={`/chat/follower/${profile.UserProfile._id}`}
                  >
                    {" "}
                    {profile.followersLength} Followers
                  </Nav.Link>
                </Col>
                <Col>
                  <Nav.Link
                    className=" mt-1 p-1 text-dark"
                    href={`/chat/following/${profile.UserProfile._id}`}
                  >
                    {" "}
                    {profile.followingLength} Following
                  </Nav.Link>
                </Col>
              </Row>
            </Card>
          </Col>
        </Container>
      )}
    </>
  );
};

export default followTab;
