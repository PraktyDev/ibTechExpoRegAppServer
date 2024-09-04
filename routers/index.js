import { Router } from "express";
import attendeeRouter from "./attendeeRouter.js";
import volunteerRouter from "./volunteerRouter.js";


const router = Router()

router.use(attendeeRouter)
router.use(volunteerRouter)


export default router;