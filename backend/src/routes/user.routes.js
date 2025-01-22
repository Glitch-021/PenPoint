import { Router } from "express";
import { createBlog } from "../controllers/blog.controller.js";
import { upload } from "../middlewares/multer.middlewares.js";
import { Blog } from "../models/blog.model.js";
import { error } from "console";

const router = Router();

// Secured routes:
router.route("/create-blog").post(
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "authorImage", maxCount: 1 },
  ]),
  createBlog
);

// GET all blogs with error handling
router.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find({});
    res.status(200).send({ blogs });
  } catch (error) {
    console.error("Error fetching blogs:", error.message);
    res.status(500).json({ error: "An error occurred while fetching blogs" });
  }
});

// Get a single blog by Id;
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }
    res.status(200).json({ blog });
  } catch (error) {
    console.error("Error fetching blog by ID: ", error.message);
    res.status(500).json({ error: "An error occured while fetching the blog" });
  }
});

export default router;
