import express from "express";
import auth from "./middlewares/auth";

const router = express.Router();

/* ************************************************************************* */

// Members routes
import memberAction from "./modules/member/memberAction";

// Get all the members
router.get("/api/members", auth.verify, auth.verifyAdmin, memberAction.browse);

// Get a specific member = api/member?id= ?
router.get("/api/member", auth.verify, auth.verifyAdmin, memberAction.read);

// Edit a member = api/member?id= ?
router.put("/api/member", auth.verify, memberAction.edit);

// Add a new member
router.post("/api/members", auth.hashPassword, memberAction.add);

// Delete a member
router.delete(
  "/api/member",
  auth.verify,
  auth.verifyAdmin,
  memberAction.destroy,
);
/* ************************************************************************* */

// Extensions routes
import extensionAction from "./modules/extension/extensionAction";

// Get all the extensions
router.get("/api/extensions", auth.verify, extensionAction.browse);

// Get a specific extension = api/extension?id= ?
router.get("/api/extension", auth.verify, extensionAction.read);

// Edit a extension = api/extension?id= ?
router.put(
  "/api/extension",
  auth.verify,
  auth.verifyAdmin,
  extensionAction.edit,
);

// Add a new extension
router.post(
  "/api/extensions",
  auth.verify,
  auth.verifyAdmin,
  extensionAction.add,
);

// Delete a extension = api/extension?id= ?
router.delete(
  "/api/extension",
  auth.verify,
  auth.verifyAdmin,
  extensionAction.destroy,
);
/* ************************************************************************* */

// Login and logout routes

//Login
router.post("/api/login", auth.login);

// Logout
router.get("/api/logout", auth.logout);
/* ************************************************************************* */

export default router;
