import express from "express"
import TalentRouter from "./talent.routes";

const router=express.Router();
router.use('/talent',TalentRouter)

export default router