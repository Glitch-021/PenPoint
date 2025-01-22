import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { Blog } from "../models/blog.model.js";

const createBlog = asyncHandler(async (req, res) => {
  // 1. get the form data
  // 2. validate - all required fields
  // 3. handle image upload on cloudinary
  // 4. create a new blog post object
  // 5. return respose with newly created blog

  const { title, description, author, category } = req.body;

  if (!title || !description || !author || !category) {
    throw new ApiError(400, "All fields must be filled");
  }

  const imagePath = req.files?.image[0]?.path;
  const authorImagePath = req.files?.authorImage[0]?.path;

  if (!imagePath) throw new ApiError(400, "Image is missing");
  if (!authorImagePath) throw new ApiError(400, "authorImage is missing");

  let imageUrl = await uploadOnCloudinary(imagePath);
  let authorImageUrl = await uploadOnCloudinary(authorImagePath);

  const newBlog = await Blog.create({
    title,
    description,
    author,
    category,
    image: imageUrl?.url || "",
    authorImage: authorImageUrl?.url || "",
  });

  return res
    .status(200)
    .json(new ApiResponse(200, newBlog, "Blog created successfully"));
});

export { createBlog };
