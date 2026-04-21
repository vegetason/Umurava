import express from "express"
import TalentRouter from "./talent.routes";
import JobDescriptionRouter from "./jobDescription.route";

const router=express.Router();
router.use('/talent',TalentRouter)
router.use('/jobDescription',JobDescriptionRouter)

export default router