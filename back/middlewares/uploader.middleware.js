import multer from "multer";
import path from "node:path"
import { v4 as uuid } from 'uuid';

const storageFolderPath = path.join(import.meta.dirname, "../uploads")

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, storageFolderPath)
  },
  filename: function (req, file, cb) {
    const fileName = uuid() + path.extname(file.originalname)
    cb(null, fileName)
  }
})

const uploader = multer({ storage: storage })

export default uploader