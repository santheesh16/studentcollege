const express = require("express");
const router = express.Router();
const uploadFile = require("../middlewares/excel.upload");
//import controller

const { requireSignin, adminMiddleware } = require("../controllers/auth");
const {
  upload,
  uploadUpdate,
  downloadPdf,
  getStudents,
  pdfLabId,
  pdfDateWise,
  pdfStudentWise,
  attendanceLabId,
  attendanceDatewise,
  attendanceStudentWise,
  
} = require("../controllers/excel.controller");

router.post("/upload/excel", uploadFile, upload);
router.post("/upload/excelUpdate", uploadFile, uploadUpdate);
router.get("/attendance/pdf/download", downloadPdf);
// router.get("/download/pdf/:labId", pdfdownload);
router.get("/student/all", getStudents);
router.get("/attendance/excel-labId/:labId", attendanceLabId);
router.get("/attendance/excel-datewise/:datewise", attendanceDatewise);
router.get("/attendance/excel-studentWise/:studentWise", attendanceStudentWise);
router.post("/attendance/pdf-labId", pdfLabId);
router.post("/attendance/pdf-dateWise", pdfDateWise);
router.post("/attendance/pdf-studentWise", pdfStudentWise);

module.exports = router; //{}
