import { useState } from "react";
import { Alert, Row, Col, Toast, Button, Container } from "react-bootstrap";
import { toast } from "react-toastify";

export const successMsg = (msg: string) => {
  return (
    <Container>
      <Alert variant="success">{msg}</Alert>
    </Container>
  );
};

export const errorMsg = (msg: string) => {
  return (
    <Container>
      <Alert variant="danger">{msg}</Alert>
    </Container>
  );
};

export const ToastSuccess = (msg: string) => {
  return toast.success(msg, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

export const ToastFailure = (msg: string) => {
  return toast.error(msg, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};
