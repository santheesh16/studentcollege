import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { isAuth, removeCookie, isStudlog } from "../auth/helpers";
import axios from "axios";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap/js/src/collapse.js";
import "../App.css";
import { Navbar, Nav } from "react-bootstrap";
import KPR_LOGO from "../assets/icons/logo.webp";

const Layout = ({ children, match, history }) => {
  const isActive = (path) => {
    if (match.path === path) {
      return { color: "blue" };
    } else {
      return { color: "#fff" };
    }
  };

  const signoutime = (event) => {
    if (isAuth() && isAuth().role === "admin") {
      history.push("/");
      localStorage.clear();
      removeCookie("token");
    } else {
      event.preventDefault();
      axios({
        method: "PUT",
        url: `http://localhost:8000/api/user/student/signout/${
          isStudlog().roll_number
        }`,
      })
        .then((response) => {
          history.push("/");
          localStorage.clear();
          removeCookie("token");
          console.log("SIGNOUT SUCCESS", response);
        })
        .catch((error) => {
          console.log("SIGNOUT ERROR", error.response.data);
        });
    }
  };

  const nav = () => (
    <Navbar bg="primary" expand="lg">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <ul className="navbar-nav mr-auto">
            <a href="https://kpriet.ac.in/"><img src={KPR_LOGO} alt="clg-logo" width="70px" height="60px"/></a>
            {isAuth() && isAuth().role === "admin" && (
              <Fragment>
                <li className="nav-item">
                  <Link
                    
                    className="nav-link"
                    style={isActive("/lab-attendance")}
                    to="/lab-attendance"
                  >
                    Lab Attendance
                  </Link>
                </li>

                <li className="nav-item dropdown">
                  <Link
                    to="/"
                    className="nav-link dropdown-toggle"
                    id="navbarDropdown"
                    role="button"
                    data-toggle="dropdown"
                    style={isActive("/signup")}
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Student
                  </Link>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown"
                  >
                    <Link to="/add" className="dropdown-item">
                      Add
                    </Link>
                    <Link to="/update" className="dropdown-item">
                      Update
                    </Link>
                    <Link to="/delete" className="dropdown-item">
                      Block
                    </Link>
                  </div>
                </li>
              </Fragment>
            )}

            {/* {isStudlog() && isStudlog().role === "student" && (
              <Fragment>
                <li className="nav-item">
                  <Link
                    to="/home"
                    className="nav-link "
                    style={isActive("/home")}
                  >
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    style={isActive("/private")}
                    to="/private"
                  >
                    {isStudlog().name}
                  </Link>
                </li>
              </Fragment>
            )}  */}
            {isAuth() && isAuth().role === "admin" && (
              <li>
                <Link
                  className="nav-link d-flex justify-content-end"
                  style={isActive("/admin-reset")}
                  to="/admin-reset"
                >
                  Admin Reset
                </Link>
              </li>
            )}
          </ul>
          {
            <li className="nav-link ">
              <button
                className="btn btn-outline-danger"
                style={{ cursor: "pointer", color: "#fff" }}
                onClick={signoutime}
              >
                Signout
              </button>
            </li>
          }
         
          
          
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );

  return (
    <Fragment>
      {nav()}
      <div className="container">{children}</div>
    </Fragment>
  );
};

export default withRouter(Layout);

//   <div class="navbar navbar-inverse navbar-fixed-top bg-primary" id="nav" role="navigation">
//   <div class="container">
//     <div class="collapse navbar-collapse">
//       <ul class="nav navbar-nav">
//       {isAuth() && isAuth().role === "admin" && (
//           <Fragment>
//             <li className="nav-item">
//               <Link
//                 className="nav-link"
//                 style={isActive("/admin")}
//                 to="/admin"
//               >
//                 Lab Attendance
//               </Link>
//             </li>

//             <li className = "nav-item dropdown">
//               <Link
//                 to= "/"
//                 className = "nav-link dropdown-toggle"
//                 id="navbarDropdown"
//                 role="button"
//                 data-toggle="dropdown"
//                 style={isActive("/signup")}
//                 aria-haspopup="true"
//                 aria-expanded="false"
//               >
//                 Student
//               </Link>
//               <div className = "dropdown-menu" aria-labelledby="navbarDropdown">
//                 <Link to="/add" className="dropdown-item">
//                   Add
//                 </Link>
//                 <Link to="/update" className="dropdown-item">
//                   Update
//                 </Link>
//                 <Link to="/delete" className="dropdown-item">
//                   Delete
//                 </Link>
//               </div>
//             </li>
//           </Fragment>
//         )}
//       </ul>
//       <ul class="nav navbar-nav navbar-right">
//       {(
//         <li className="nav-link ">
//           <button
//             className="btn btn-outline-danger"
//             style={{ cursor: "pointer", color: "#fff" }}
//             onClick={signoutime}
//           >
//             Signout
//           </button>
//         </li>

//       )}
//       {isAuth() && isAuth().role === "admin" && (
//         <li>
//         <Link
//           className="nav-link d-flex justify-content-end"
//           style={isActive("/profile")}
//           to="/profile"
//         >
//           Student details
//         </Link>
//       </li>
//       )}

//       </ul>
//     </div>
//   </div>
// </div>
