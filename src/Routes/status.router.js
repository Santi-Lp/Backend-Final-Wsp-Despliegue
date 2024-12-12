import express from "express"
import getPingController from "../controllers/status.controller.js"
import { verifyApikeyMiddleware } from "../middlewares/authMiddleware.js"

const statusRouter = express.Router()

statusRouter.use(verifyApikeyMiddleware)

statusRouter.get("/ping" , getPingController )

export default statusRouter