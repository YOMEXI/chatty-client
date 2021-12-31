import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Button, Col, Form, InputGroup, Modal } from "react-bootstrap";
import { Prev } from "react-bootstrap/esm/PageItem";
import { ToastFailure, ToastSuccess } from "../utils/alert";
import { toggleMessagePopup, updatePassword } from "../utils/followAccess";

const passwordUpdate = () => {
  const [smShow, setSmShow] = useState(false);
  const [loading, setloading] = useState(false);
  //
  const [showpassword, setshowpassword] = useState({
    field1: false,
    field2: false,
  });
  const [password, setpassword] = useState({
    CurrentPassword: "",
    NewPassword: "",
  });

  const [popupsettings, setpopupsettings] = useState("");

  //

  const isFirstRun = useRef(true);

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
  }, [popupsettings]);
  const { CurrentPassword, NewPassword } = password;
  const { field1, field2 } = showpassword;

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    setpassword((prev) => ({ ...prev, [name]: value }));
  };

  const submit = async (e: any) => {
    e.preventDefault();
    updatePassword(password, setloading);
    setpassword((prev) => ({ ...prev, CurrentPassword: "", NewPassword: "" }));
  };

  return (
    <>
      <Button size="sm" onClick={() => setSmShow(true)}>
        Update Password
      </Button>{" "}
      <Modal
        size="sm"
        show={smShow}
        onHide={() => setSmShow(false)}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-sm">
            Update Password
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="mb-3" onSubmit={submit}>
            <Form.Label> Current Password</Form.Label>
            <Col className="d-flex rounded-pill px-3 py-1 border border-dark ">
              <i
                className="fa fa-eye mt-1 me-1"
                aria-hidden="true"
                onClick={() =>
                  setshowpassword((prev: any) => ({ ...prev, field1: !field1 }))
                }
              />
              <input
                placeholder="Current Password"
                value={CurrentPassword}
                name="CurrentPassword"
                onChange={handleChange}
                className="passwordForm"
                type={field1 ? "text" : "password"}
              />
            </Col>
            <Form.Label> New Password</Form.Label>

            <Col className="d-flex rounded-pill px-3 py-1 border border-dark ">
              <i
                className="fa fa-eye mt-1 me-1"
                aria-hidden="true"
                onClick={() =>
                  setshowpassword((prev: any) => ({ ...prev, field2: !field2 }))
                }
              />
              <input
                placeholder="New Password"
                value={NewPassword}
                name="NewPassword"
                onChange={handleChange}
                className="passwordForm"
                type={field2 ? "text" : "password"}
              />
            </Col>
            <Button
              type="submit"
              size="sm"
              variant="primary"
              className="mt-1 justify-content-center"
            >
              {loading ? "Submitting…" : "Submit"}
            </Button>
          </Form>
          <div className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              id="flexSwitchCheckDefault"
              onChange={() =>
                toggleMessagePopup(popupsettings, setpopupsettings)
              }
            />
            <label
              className="form-check-label"
              htmlFor="flexSwitchCheckDefault"
            >
              New Message popup settings
            </label>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default passwordUpdate;
