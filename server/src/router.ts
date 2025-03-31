import express from "express";
import auth from "./middlewares/auth";

const router = express.Router();

/* ************************************************************************* */

// Members routes
import memberAction from "./modules/member/memberAction";

// Get all the members
router.get("/api/members", memberAction.browse);

// Get a specific member = api/member?id= ?
router.get("/api/member", memberAction.read);

// Edit a member = api/member?id= ?
router.put("/api/member", memberAction.edit);

// Add a new member
router.post("/api/members", auth.hashPassword, memberAction.add);

// Delete a member
router.delete("/api/member", memberAction.destroy);
/* ************************************************************************* */

// Extensions routes
import extensionAction from "./modules/extension/extensionAction";

// Get all the extensions
router.get("/api/extensions", extensionAction.browse);

// Get a specific extension = api/extension?id= ?
router.get("/api/extension", extensionAction.read);

// Edit a extension = api/extension?id= ?
router.put("/api/extension", extensionAction.edit);

// Add a new extension
router.post("/api/extensions", extensionAction.add);

// Delete a extension = api/extension?id= ?
router.delete("/api/extension", extensionAction.destroy);
/* ************************************************************************* */

// Login and logout routes

//Login
router.post("/api/login", auth.login);

// Logout
router.get("/api/logout", auth.logout);
/* ************************************************************************* */

export default router;
