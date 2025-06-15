import { fdatasync } from "node:fs";
import FileModel from "../models/files.model.js";
import dotenv from "dotenv"
import router from "../routes/files.route.js";


dotenv.config()

// ! Upload file API
const uploadFile = async (req, res) => {
  console.log(req.file);
  const fileData = req.file;
  // db management => document upload
  const file = {
    fileName: fileData.filename,
    originalName: fileData.originalname,
    path: fileData.path,
    size: fileData.size,
    mimeType: fileData.mimetype,
    user: req.body.user,
  };

  await FileModel.create(file);

  res.json({
    success: true,
    message: "From uploaded successfully",
    fileData: file
  });
};

// ! Share file API
const shareFile = async(req, res)=>{
    // create a sharable link and give to user in response
    const {_id} = req.body
    if(!_id){
      throw new Error("In valid _id")
    }
    try {
      const file = await FileModel.findById(_id)
    res.json({
        success: "true",
        link: `${process.env.BACK_END_HOST}/getfile/${_id}`
    })
    } catch (error) {
      res
      .status(400)
      .json({
        success: false,
        message: "Can not get file from DB please check given id again"

      })
    }
}

// ! File download link (!not an api rather a link to download the file)
const getFile = async(req, res)=>{
    const {_id} = req.params
    const file = await FileModel.findById(_id)
    res.download(file.path)
}

// ! list api
const getAllFiles = async(req, res)=>{
  try {
    const allFiles =  await FileModel.find()
    res.json({
      success: true,
      result: allFiles
    })
  } catch (error) {
    res
    .status(400)
    .json({
      success: false,
      message: "can't get data from DB" 
    })
  }
  
}




const fileControllers = {
  uploadFile,
  shareFile, 
  getFile,
  getAllFiles
};

export default fileControllers;
