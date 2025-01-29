import { Router } from "express";
import {
  createBlog,
  deleteBlog,
  deleteUserEmail,
  fetchAllBlog,
  fetchBlogById,
  getUserEmail,
  registerEmail,
} from "../controllers/blog.controller.js";
import { upload } from "../middlewares/multer.middlewares.js";

const router = Router();


// Email Register:
router.route("/email").get(getUserEmail);

// Email Register:
router.route("/email").post(registerEmail);

// Remove Email Users:
router.route("/email/:id").delete(deleteUserEmail);

// GET all blogs with error handling
router.route("/").get(fetchAllBlog);

// Other routes
router.route("/create-blog").post(
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "authorImage", maxCount: 1 },
  ]),
  createBlog
);

// Get a single blog by Id:
router.route("/:id").get(fetchBlogById);

// Delete a blog by Id:
router.route("/:id").delete(deleteBlog);

export default router;
