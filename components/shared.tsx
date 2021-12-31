import { useRouter } from "next/dist/client/router";
import React from "react";
import { Row } from "react-bootstrap";

export const shared = () => {
  const router = useRouter();

  const welcomeMessage = router.pathname === "/auth/register";

  return (
    <Row className="justify-content-center bg-dark p-1 text-white rounded-pill">
      {welcomeMessage ? "Register & Join Chatty " : "Welcome Back"}
    </Row>
  );
};
