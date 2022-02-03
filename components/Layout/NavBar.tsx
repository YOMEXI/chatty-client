import { useSelector } from "react-redux";

import Search from "./Search";
import SideBar from "./SideBar";

export const NavBar = () => {
  // const auth = useSelector((state: any) => state.auth);

  // const { user } = auth;

  return (
    <>
      <nav
        className="navbar navbar-dark bg-primary  sticky-top"
        style={{ backgroundColor: "#212121" }}
      >
        <div className="container">
          <div className="mx-2">
            <a className=" text-white " style={{ fontSize: "1.1rem" }} href="/">
              <i className="fas chatty fa-comment-dots fa-2x"></i>
            </a>
          </div>
          <div className="d-flex">
            <div className="mx-2">
              <Search />
            </div>
            <div>
              <button
                className="navbar-toggler ms-xs-5"
                type="button"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasNavbar"
                aria-controls="offcanvasNavbar"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
            </div>
          </div>

          <div
            className="offcanvas offcanvas-end"
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
          >
            <div className="offcanvas-header">
              <button
                type="button"
                className="btn-close text-reset"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <div className="offcanvas-body">
              <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                <SideBar />
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
