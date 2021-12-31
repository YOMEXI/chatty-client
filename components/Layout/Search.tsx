import router from "next/router";
import React, { useState } from "react";
import { Image, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { search } from "../../redux/user/userActions";

const Search = () => {
  const [text, setText] = useState([]);

  const dispatch = useDispatch();
  //
  const Users = useSelector((state: any) => state.User);

  const { loading, results, error } = Users;

  //
  const handleChange = (e: any) => {
    const { value } = e.target;
    setText(e.target.value);

    dispatch(search(value));
  };

  //

  return (
    <form id="search">
      <input
        id="input"
        type="search"
        placeholder="Search"
        aria-label="Search"
        onChange={handleChange}
        value={text}
      />
      {!loading ? (
        <button id="button">
          <i className="fa fa-search"></i>
        </button>
      ) : (
        <div className="spinner">
          <Spinner animation="border" role="status" size="sm">
            <span className="visually-hidden"></span>
          </Spinner>
        </div>
      )}
      {results && (
        <div className="position-absolute top-100 d-block">
          {results.map((r: any) => (
            <div
              key={r._id}
              className="d-flex justify-content-between text-center bg-dark text-white "
              style={{
                paddingLeft: "6.1rem",
                paddingRight: "6.1rem",
                borderRadius: "20px",
              }}
            >
              <div
                className="me-2 pointer"
                style={{ cursor: "pointer" }}
                onClick={() => router.push(`/auth/${r.username}`)}
              >
                {r.username}
              </div>
              <div className="me-2">{r.age}</div>
              <div className="me-2">
                <Image
                  src={r.imgUrl ? r.imgUrl : `/img/person.png`}
                  roundedCircle
                  style={{ width: "25px", height: "25px" }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </form>
  );
};

export default Search;
