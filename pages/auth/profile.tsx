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
              <div className="form">
                <Form onSubmit={imgUpload}>
                  <Form.Group controlId="formFileSm" className="my-3">
                    <Form.Label>Profile pic upload</Form.Label>
                    <Form.Control
                      type="file"
                      size="sm"
                      disabled={!user}
                      onChange={handleChange("image")}
                    />

                    <Button
                      type="submit"
                      size="sm"
                      disabled={!user}
                      className="mt-1"
                      variant="primary"
                    >
                      {loading ? "Submitting" : "Submit"}
                    </Button>
                  </Form.Group>
                </Form>
              </div>
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
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default profile;
