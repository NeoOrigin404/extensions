import express from "express";
import memberAction from "./modules/member/memberAction";
console.info("Routes loaded: /api/members & /api/members/:id");

const router = express.Router();

/* ************************************************************************* */
// Members routes

// Get all the members
router.get("/api/members", memberAction.browse);
// Get a specific member
router.get("/api/members/:id", memberAction.read);
/* ************************************************************************* */

export default router;
