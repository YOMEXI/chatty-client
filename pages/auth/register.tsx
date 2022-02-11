import { Form, Formik } from "formik";
import { useEffect, useRef, useState } from "react";
import * as Yup from "yup";
import { Col, Container, Row, Button, Spinner } from "react-bootstrap";
import MyForm from "../../components/Form/Form";
import { shared } from "../../components/shared";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../redux/auth/authActions";
import { errorMsg, successMsg } from "../../components/utils/alert";
import { useRouter } from "next/dist/client/router";

const Register = () => {
  const initialValues = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    username: "",
    age: "",
  };

  const dispatch = useDispatch();
  const router = useRouter();

  const auth = useSelector((state: any) => state.auth);
  const { loading, success, error, user } = auth;

  useEffect(() => {
    if (auth.user?.user) router.push("/");
  }, [router, user]);

  //
  const onSubmit = (values: any, onSubmitProps: any) => {
    dispatch(register(values, router));
    onSubmitProps.resetForm();
  };

  const validationSchema = Yup.object({
    username: Yup.string().min(1).required("required"),
    firstname: Yup.string().min(1).required("required"),
    lastname: Yup.string().min(1).required("required"),
    age: Yup.number().min(1).required("required"),
    email: Yup.string().email("invalid email format").required("required"),
    password: Yup.string().min(7, "At least 7 characters").required("required"),
  });

  const [showPassword, setshowPassword] = useState(false);

  return (
    <>
      <Container>
        <Row className="justify-content-center auth">
          <Col lg={5} md={8} xs={10} sm={10}>
            <Row className="justify-content-center mt-4 text-center">
              {success && successMsg(success)}
              {error && errorMsg(error)}
            </Row>
            {shared()}

            <Formik
              initialValues={initialValues}
              onSubmit={onSubmit}
              validationSchema={validationSchema}
            >
              {(formik) => {
                return (
                  <Form>
                    <>
                      <MyForm
                        name="email"
                        placeholder="Email"
                        type="text"
                        showPassword={!showPassword}
                        setshowPassword={setshowPassword}
                      />
                      <MyForm
                        name="firstname"
                        placeholder="Firstname"
                        type="text"
                        showPassword=""
                        setshowPassword=""
                      />
                      <MyForm
                        name="lastname"
                        placeholder="Lastname"
                        type="text"
                        showPassword=""
                        setshowPassword=""
                      />
                      <MyForm
                        name="password"
                        placeholder="Password"
                        type="password"
                        showPassword={showPassword}
                        setshowPassword={setshowPassword}
                      />
                      <MyForm
                        name="username"
                        placeholder="Username"
                        type=""
                        showPassword=""
                        setshowPassword=""
                      />
                      <MyForm
                        name="age"
                        placeholder="Age"
                        type=""
                        showPassword=""
                        setshowPassword=""
                      />
                    </>
                    <Row className="justify-content-center">
                      <Col lg={5} md={8} sm={4} xs={5}>
                        {!loading ? (
                          <Button
                            type="submit"
                            className="rounded-pill  border border-0"
                            variant="dark"
                          >
                            Submit
                          </Button>
                        ) : (
                          <Button variant="dark" disabled>
                            <Spinner
                              as="span"
                              animation="grow"
                              size="sm"
                              role="status"
                              aria-hidden="true"
                            />
                            Loading...
                          </Button>
                        )}
                      </Col>
                    </Row>
                  </Form>
                );
              }}
            </Formik>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Register;
