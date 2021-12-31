import { useRouter } from "next/dist/client/router";
import React from "react";
import { useSelector } from "react-redux";
import { logout } from "../utils/access";

const SideBar = () => {
  const auth = useSelector((state: any) => state.auth);
  const router = useRouter();

  const { user } = auth;

  return (
    <>
      <li className="nav-item">
        <a className="nav-link active" aria-current="page" href="/">
          Home
        </a>
      </li>
      {user === null && (
        <>
          {" "}
          <li className="nav-item">
            <a className="nav-link" href="/auth/login">
              Login
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/auth/register">
              Register
            </a>
          </li>
        </>
      )}
      {user && (
        <>
          <li className="nav-item">
            <a className="nav-link" href="/chat/msg">
              Messages <i className=" ms-2 fas fa-envelope-open fa-lg "></i>
            </a>
          </li>

          <li className="nav-item">
            <a className="nav-link " href="/auth/profile ">
              My Account <i className="ms-2 fas fa-user fa-lg"></i>
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              onClick={logout}
              style={{ cursor: "pointer" }}
            >
              Log Out
            </a>
          </li>
        </>
      )}
    </>
  );
};

export default SideBar;
