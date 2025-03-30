import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Members routes
import memberAction from "./modules/member/memberAction";

// Get all the members
router.get("/api/members", memberAction.browse);
// Get a specific member
router.get("/api/member", memberAction.read);

// Edit a member
router.put("/api/member", memberAction.edit);

// Add a new member
router.post("/api/members", memberAction.add);

// Delete a member
router.delete("/api/member", memberAction.destroy);
/* ************************************************************************* */

export default router;
