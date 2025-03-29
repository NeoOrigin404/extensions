import express from "express";
import memberRepository from "./modules/member/memberRepository";
import memberAction from "./modules/member/memberAction";

const router = express.Router();

/* ************************************************************************* */
// Members routes

router.get("/api/members", memberAction.browse);
router.get("/api/members", memberAction.read);
/* ************************************************************************* */

export default router;
