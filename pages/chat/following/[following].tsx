import axios from "axios";
import router, { useRouter } from "next/router";
import React, { useState } from "react";
import { Card, Col, Container, Row, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import useSWR, { mutate } from "swr";

const Follower = () => {
  let followingId = router.query.following;

  const auth = useSelector((state: any) => state.auth);

  const { user } = auth;

  const { data: following, error } = useSWR(
    followingId ? `/api/following/${followingId}` : null
  );

  //

  console.log(following?.map((p: any, i: any) => p.user.username));

  return (
    <>
      {following && (
        <Container>
          <Card className="mt-3" bg="secondary">
            <Card.Body>
              <Col className="mb-4">
                <Button variant="dark" size="sm" className="rounded-pill">
                  {following.length} Following
                </Button>
              </Col>
              {following &&
                following?.map((p: any, i: any) => {
                  return (
                    <>
                      <Row key={i} className="">
                        <Col>
                          <Button
                            size="sm"
                            variant="dark"
                            className="fs-6 text-light rounded-pill mt-2"
                          >
                            {p?.user?.firstname} {""} {p?.user?.lastname}
                          </Button>
                        </Col>
                      </Row>
                    </>
                  );
                })}
            </Card.Body>
          </Card>
        </Container>
      )}
    </>
  );
};

export default Follower;
