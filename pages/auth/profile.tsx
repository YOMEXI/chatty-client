import axios from "axios";
import router, { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import useSWR, { mutate } from "swr";
import {
  Button,
  Col,
  Container,
  Form,
  Card,
  Row,
  Spinner,
} from "react-bootstrap";
import FollowTab from "../../components/Chat/followTab";
import { PROFILE } from "../../interface/User";
import { ToastSuccess } from "../../components/utils/alert";
import { useSelector } from "react-redux";
import Password from "../../components/Chat/passwordUpdate";

export const profile: React.FC<PROFILE> = () => {
  const [details, setdetails] = useState<any[]>([]);
  const [img, setimg] = useState({
    formData: new FormData(this),
  });
  const [loading, setloading] = useState(false);

  const { formData } = img;
  const handleChange = (name: any) => (e: any) => {
    const value = name === "image" ? e.target.files[0] : e.target.value;

    formData.set(name, value);
    setimg({ ...img, [name]: value });
  };

  //
  const router = useRouter();
  const auth = useSelector((state: any) => state.auth);
  const { user } = auth;

  //userDetails
  const me = async () => {
    const { data } = await axios.get(`/api/user/me`);
    setdetails(data);
  };
  const { data: profile, error: errr } = useSWR(
    `/api/${details.map((x) => x.username)}`
  );

  useEffect(() => {
    me();
  }, [router]);

  const imgUpload = async (e: any) => {
    e.preventDefault();

    const { data } = await axios.post(
      `/api/user/imgUpload/${details.map((x) => x._id)}`,
      formData
    );

    setloading(false);
    ToastSuccess(data);
    mutate(`/api/${details.map((x) => x.username)}`);
  };

  return (
    <>
      <FollowTab profile={profile} />

      {profile && (
        <Container>
          <Row className="mt-4">
            <Col
              lg={5}
              sm={10}
              xs={10}
              md={9}
              className=" d-flex justify-content-center "
            >
              <Card style={{ width: "100%" }}>
                <Card.Img
                  variant="top"
                  src={
                    profile?.UserProfile?.imgUrl
                      ? profile?.UserProfile?.imgUrl
                      : "/img/person.png"
                  }
                />
                <Card.Body>
                  <Card.Title>User Profile</Card.Title>

                  <Card.Text>
                    Firstname : <span>{profile?.UserProfile?.firstname}</span>
                  </Card.Text>
                  <Card.Text>
                    Lastname : <span>{profile?.UserProfile?.lastname}</span>
                  </Card.Text>
                  <Card.Text>
                    Username : <span>{profile?.UserProfile?.username}</span>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={6} sm={10} xs={10} md={9}>
              <Form onSubmit={imgUpload}>
                <Form.Group controlId="formFileSm" className="my-3">
                  <Form.Label>Profile pic upload</Form.Label>
                  <Form.Control
                    type="file"
                    size="sm"
                    disabled={!user}
                    onChange={handleChange("image")}
                  />
                  {!loading ? (
                    <Button
                      type="submit"
                      size="sm"
                      disabled={!user}
                      className="mt-1"
                      variant="primary"
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
                      Submitting
                    </Button>
                  )}
                </Form.Group>
              </Form>
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
};

export default profile;
