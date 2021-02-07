const express = require("express");
const router = express.Router();

//import controller

const {
  requireSignin,
  adminMiddleware,
  signout,
} = require("../controllers/auth");
const {
  read,
  update,
  labUpdate,
  adminRead,
  adminUpdate,
  studentUnBlock,
  adminStudentRead,
  blockList,
  adminStudentUpdate,
  adminStduntDelete,
  studentBlock,
  viewAttendanceDetails,
  viewShowDetails,
  viewLabIdAttendance,
  viewDateWiseAttendance,
  viewStudentAttendance,
} = require("../controllers/user");
const { searchCheck } = require("../validators/index");

router.get("/user/:rollNumber", read);
router.put("/user/update", requireSignin, update);
router.put("/user/lab/:roll_number", requireSignin, labUpdate);

router.get("/admin/:id", adminRead);
router.put("/admin/adminUpdate", requireSignin, adminMiddleware, adminUpdate);
router.get(
  "/admin/user/:rollNumber",
  requireSignin,
  searchCheck,
  adminStudentRead
);
router.put("/admin/user/update/:rollNumber", requireSignin, adminStudentUpdate);
router.put("/admin/user/delete/:id", requireSignin, adminStduntDelete);
router.put("/user/student/signout/:roll_number", signout);
router.put("/admin/student/block", studentBlock);
router.put("/admin/student/unblock", studentUnBlock);
router.get("/admin/student/block-list", blockList);
router.post("/attendance/load-details", viewAttendanceDetails)
router.get("/attendance/get-details", viewShowDetails)

router.get("/attendance/load-labId/:labId", viewLabIdAttendance);
router.get("/attendance/load-dateWise/:dateWise", viewDateWiseAttendance);
router.get("/attendance/load-studentWise/:studentWise", viewStudentAttendance);

// viewDateWiseAttendance,viewStudentAttendance
module.exports = router; //{}
