import express from "express";
import controllers from "../controllers/files.controller.js";
import uploader from "../middlewares/uploader.middleware.js";

const router = express.Router();

router.post(
  "/api/v1/fileshare/upload",
  uploader.single("uploaded-file"),
  controllers.uploadFile
);

router.post("/api/v1/fileshare/share", controllers.shareFile)

router.get("/getfile/:_id", controllers.getFile)

// ! list all files from db
router.get("/api/v1/fileshare/list", controllers.getAllFiles)

export default router;
