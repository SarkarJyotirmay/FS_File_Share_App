import express from "express";
import fileControllers from "../controllers/files.controller.js";
import uploader from "../middlewares/uploader.middleware.js";

const FileRouter = express.Router();

FileRouter.post(
  "/api/v1/fileshare/upload",
  uploader.single("uploaded-file"),
  fileControllers.uploadFile
);

FileRouter.post("/api/v1/fileshare/share", fileControllers.shareFile)

FileRouter.get("/getfile/:_id", fileControllers.getFile)

// ! list all files from db
FileRouter.get("/api/v1/fileshare/list", fileControllers.getAllFiles)

export default FileRouter;
