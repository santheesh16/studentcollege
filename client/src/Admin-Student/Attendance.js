import React, { useState } from "react";
import Layout from "../components/Navbar";
import { getCookie, signout } from "../auth/helpers";
import Axios from "axios";
import "../App.css";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import "bootstrap/dist/js/bootstrap.min.js";
import { ToastContainer, toast } from "react-toastify";
import "../../node_modules/react-toastify/dist/ReactToastify.min.css";
const fileSaver = require("file-saver");

const Attendance = ({ history }) => {
  const [values, setValues] = useState({
    labId: "",
    labName: "",
    labDepartment: "",
    dateWise: "",
    studentBatch: "",
    academicYear: "",
    section: "",
    semester: "",
    studentDept: "",
    buttonView: "File Download",
    details: [],
  });

  let studentName = null;
  let type = null;
  let options = null;
  let batchOption = null;
  let academicOption = null;

  const dateConversion = () => {
    var today = new Date();
    var yyyy = today.getFullYear();
    var batchOptions = ["Choose..."];

    var minusYear = yyyy - 4;
    for (var i = 0; minusYear <= yyyy; i++) {
      var endYear = yyyy + i;
      var yearTo = minusYear + "-" + endYear;
      batchOptions.push(yearTo);
      minusYear += 1;
    }
    batchOption = batchOptions.map((el) => <option key={el}>{el}</option>);
    var academicOptions = ["Choose..."];
    if (studentBatch !== "Choose...") {
      var begYear = parseInt(studentBatch.substring(0, 4));
      var endYear = parseInt(studentBatch.substring(5, 9));
      var today = new Date();
      var curMonth = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
      var curYear = today.getFullYear();
      var j = 1;
      for (var i = begYear; i < endYear; i++) {
        var acadAdd = begYear + j;
        academicOptions.push(i + "-" + acadAdd);
        j++;
      }
    }
    // var studYear = curYear - begYear;
    // if (curMonth <= 6) {
    //   if (studYear == 1) {
    //     setValues({semester: "2"});
    //   } else if (studYear == 2) {
    //     setValues({semester: "4"});
    //   } else if (studYear == 3) {
    //     setValues({semester: "6"});
    //   } else {
    //     setValues({semester: "8"});
    //   }
    // } else {
    //   if (studYear == 0) {
    //     setValues({semester: "1"});
    //   } else if (studYear == 1) {
    //     setValues({semester: "3"});
    //   } else if (studYear == 2) {
    //     setValues({semester: "5"});
    //   } else {
    //     setValues({semester: "7"});
    //   }
    // }
    academicOption = academicOptions.map((el) => (
      <option key={el}>{el}</option>
    ));
  };

  const academic = () => {
    var begYear = parseInt(studentBatch.substring(0, 4));
    var endYear = parseInt(studentBatch.substring(5, 9));
    var today = new Date();
    var curMonth = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var curYear = today.getFullYear();
    var academicOptions = ["Choose..."];

    while (begYear < endYear) {
      var acadAdd = begYear + 1;
      academicOptions.push(begYear + "-" + acadAdd);
    }
    console.log(academicOptions, "Sample");
    var studYear = curYear - begYear;
    var acadYear = curYear - 1;
    var acadSem = [];
    if (curMonth <= 6) {
      var semester;
      acadSem.push(acadYear + "-" + curYear);
      if (studYear == 1) {
        semester = 2;
      } else if (studYear == 2) {
        semester = 4;
      } else if (studYear == 3) {
        semester = 6;
      } else {
        semester = 8;
      }
    } else {
      var acadYear = curYear + 1;
      acadSem.push(curYear + "-" + acadYear);
      if (studYear == 0) {
        semester = 1;
      } else if (studYear == 1) {
        semester = 3;
      } else if (studYear == 2) {
        semester = 5;
      } else {
        semester = 7;
      }
    }
    academicOption = academicOptions.map((el) => (
      <option key={el}>{el}</option>
    ));
  };
  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  /** Different arrays for different dropdowns */
  const CSE = [
    "Choose...",
    "Software Engineer",
    "Data Structure ",
    "Computer Network",
    "Redhat Interprised",
  ];
  const ECE = ["Choose...", "Computer Electrical", "Programming Python"];
  const EEE = [
    "Choose...",
    "Electronic Science",
    "Designing in Electronic",
    "Electrical Computer",
  ];
  const MECH = [
    "Choose...",
    "English Listening ",
    "Object Oriented",
    "Basics Computer Programming",
  ];
  const BIOMED = [
    "Choose...",
    "Staff Maintain Computer",
    "Student Details Lab",
    "Programming Lab",
  ];

  const {
    labId,
    labName,
    labDepartment,
    dateWise,
    studentBatch,
    academicYear,
    section,
    semester,
    studentDept,
    buttonView,
    details,
  } = values;

  /** Setting Type variable according to dropdown */
  if (labDepartment === "CSE") {
    type = CSE;
  } else if (labDepartment === "ECE") {
    type = ECE;
  } else if (labDepartment === "EEE") {
    type = EEE;
  } else if (labDepartment === "MECH") {
    type = MECH;
  } else if (labDepartment === "BIOMED") {
    type = BIOMED;
  }

  const attendanceDetail = () => {
    return (
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Roll Number</th>
            <th>Register Number</th>
            <th>Name</th>
            <th>Department</th>
            <th>Lab Id</th>
            <th>Date</th>
            <th>Login Time</th>
            <th>Logout Time</th>
            <th>Machine No</th>
          </tr>
        </thead>
        {details.map((detail, index) => {
          return (
            <tbody>
              <tr>
                <td>{detail.id}</td>
                <td>{detail.roll_number}</td>
                <td>{detail.register_number}</td>
                <td>{detail.name}</td>
                <td>{detail.department}</td>
                <td>{detail.lab_id}</td>
                <td>{detail.date}</td>
                <td>{detail.logintime}</td>
                <td>{detail.logouttime}</td>
                <td>{detail.machine_no}</td>
              </tr>
            </tbody>
          );
        })}
      </table>
    );
  };
  if (type) {
    options = type.map((el) => <option key={el}>{el}</option>);
  }

  const loadAttendanceDetails = (event) => {
    event.preventDefault();
    Axios({
      method: "POST",
      url: "http://localhost:8000/api/attendance/load-details",
      headers: {
        Authorization: `Bearer ${getCookie("token")}`,
      },
      data: {
        labName,
        labDepartment,
        dateWise,
        studentBatch,
        academicYear,
        section,
        semester,
        studentDept
      },
    })
      .then((response) => {
        console.log("STUDENT ATTENDACNE GET", response.data);
        Axios({
          method: "GET",
          url: "http://localhost:8000/api/attendance/get-details",
          headers: {
            Authorization: `Bearer ${getCookie("token")}`,
          },
        })
          .then((response) => {
            console.log("STUDENT ATTENDACNE GET", response);
            setValues({
          details: response.data,
          buttonText: "Block",
          buttonUnblock: "Unblock",
        });
          })
          .catch((error) => {
            console.log("STUDENT ATTENDACNE GET ERROR", error.response.data.error);
            if (error.response.status === 401) {
              signout(() => {
                history.push("/");
              });
            }
          });
        
        
      })
      .catch((error) => {
        console.log("STUDENT ATTENDACNE GET ERROR", error.response.data.error);
        toast.error(error.response.data.error);
        if (error.response.status === 401) {
          signout(() => {
            history.push("/");
          });
        }
      });
  };
  const attendence = () => (
    <form>
      <div className="form-row">
        <div className="form-group col-md-2">
          <label className="col-form-label">Lab Department</label>
          <select
            id="inputState"
            onChange={handleChange("labDepartment")}
            type="text"
            value={labDepartment}
            className="form-control"
          >
            <option selected>Choose...</option>
            <option>CSE</option>
            <option>ECE</option>
            <option>EEE</option>
            <option>MECH</option>
            <option>BIOMED</option>
          </select>
        </div>
        <div className="form-group col-md-2 ">
          <label className="col-form-label">Lab Name</label>
          <select
            id="inputState"
            onChange={handleChange("labName")}
            type="text"
            value={labName}
            className="form-control"
          >
            {options}
          </select>
        </div>
        <div className="form-group col-md-2 ">
          <label className="col-form-label">Date</label>
          <input
            type="date"
            id="birthday"
            onChange={handleChange("dateWise")}
            value={dateWise}
            className="form-control"
          />
        </div>
        <div className="form-group col-md-2">
          <label className=" col-form-label">Batch</label>
          <select
            id="inputState"
            type="text"
            value={studentBatch}
            onChange={handleChange("studentBatch")}
            className="form-control"
          >
            {dateConversion()}
            {batchOption}
          </select>
        </div>
        <div className="form-group col-md-2">
          <label className=" col-form-label">Acadamic Year</label>
          <select
            id="inputState"
            type="text"
            value={academicYear}
            onChange={handleChange("academicYear")}
            className="form-control"
          >
            {/* {acedemic()} */}
            {academicOption}
          </select>
        </div>
        <div className="form-group col-md-1">
          <label className=" col-form-label">Semester</label>
          <select
            id="inputState"
            type="text"
            value={semester}
            onChange={handleChange("semester")}
            className="form-control"
          >
            <option selected>Choose...</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            <option>6</option>
            <option>7</option>
            <option>8</option>
          </select>
        </div>
        <div className="form-group col-md-2">
          <label className=" col-form-label">Student Department</label>
          <select
            id="inputState"
            type="text"
            value={studentDept}
            onChange={handleChange("studentDept")}
            className="form-control"
          >
            <option selected>Choose...</option>
            <option>CSE</option>
            <option>EEE</option>
            <option>ECE</option>
            <option>Mech</option>
            <option>BioMedical</option>
          </select>
        </div>
        <div className="form-group col-md-2">
          <label className=" col-form-label">Student Section</label>
          <select
            id="inputState"
            type="text"
            value={section}
            onChange={handleChange("section")}
            className="form-control"
          >
            <option selected>Choose...</option>
            <option>A</option>
            <option>B</option>
            <option>C</option>
          </select>
        </div>
        <div className="form-group col-md-2">
          <label className=" col-form-label">Student Name</label>
          <select
            id="inputState"
            type="text"
            value={studentDept}
            onChange={handleChange("studentDept")}
            className="form-control"
          >
            {studentName}
          </select>
        </div>
        <div className="form-group col-md-2 p-3">
          <div class="dropdown">
            <button
              class="btn btn-primary dropdown-toggle"
              type="button"
              id="dropdownMenuButton"
              data-toggle="dropdown"
            >
              {buttonView}
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <a className="dropdown-item">Excel</a>
              <a className="dropdown-item">Pdf</a>
            </div>
          </div>
        </div>
        <div className="form-group col-md-1 p-3">
          <button className="btn btn-primary" onClick={loadAttendanceDetails}>
            Load details
          </button>
        </div>
      </div>
    </form>
  );

  return (
    <Layout>
      <div>
        <ToastContainer />
        <p className=" col-md-10 lead text-center">Select Laboratory</p>
        {attendence()}
      </div>
      <div className="p-2">{details.length > 0 ? attendanceDetail() : ""}</div>
      {/* console.log(studentBatch); */}
    </Layout>
  );
};

export default Attendance;
