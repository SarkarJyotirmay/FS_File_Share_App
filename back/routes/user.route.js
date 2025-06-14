import express from "express"
import userControlelrs from "../controllers/user.controllers.js"

const UserRouter = express.Router()

UserRouter.post("/api/v1/user/register", userControlelrs.register)
UserRouter.post("/api/v1/user/login", userControlelrs.login)

export default UserRouter