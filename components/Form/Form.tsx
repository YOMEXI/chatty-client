import { Col, FormGroup, Row } from "react-bootstrap";
import { Field, Form, ErrorMessage } from "formik";

import { UserInput } from "../../interface/User";
import TextError from "./TextArea";

const MyForm: React.FC<UserInput> = ({
  name,
  placeholder,
  type,
  showPassword,
  setshowPassword,
}) => {
  return (
    <Col>
      <FormGroup
        className="rounded-pill  my-3 d-flex px-3 py-1"
        style={{ backgroundColor: "#189ad3" }}
      >
        <Field
          id={name}
          name={name}
          type={!showPassword && type === "password" ? "password" : "text"}
          placeholder={placeholder}
          className="form-control rounded-pill"
        />
        {type === "password" ? (
          <i
            onClick={() => setshowPassword(!showPassword)}
            className=" fas fa-lg fa-eye mt-2"
            style={{ marginLeft: "1.1rem" }}
          ></i>
        ) : (
          <i
            className="fas fa-lg fa-user mt-2"
            style={{ marginLeft: "1.08rem" }}
          ></i>
        )}
        <br />
      </FormGroup>
      <ErrorMessage name={name} component={TextError} />
    </Col>
  );
};

export default MyForm;
