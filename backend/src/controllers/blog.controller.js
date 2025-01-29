import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Blog } from "../models/blog.model.js";
import { User } from "../models/user.model.js";
import {
  deleteFromCloudinary,
  uploadOnCloudinary,
} from "../utils/cloudinary.js";

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
    .json(
      new ApiResponse(200, newBlog, "Blog created successfully bro 🔥📝⚡")
    );
});

const fetchAllBlog = asyncHandler(async (req, res) => {
  const blogs = await Blog.find({});
  if (!blogs) throw new ApiError(500, "Error fetching blogs!!");

  return res
    .status(200)
    .json(new ApiResponse(200, blogs, "Blog fetched successfully!!"));
});

const fetchBlogById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const blog = await Blog.findById(id);

  if (!blog) throw new ApiError(404, "Blog not found!!");

  return res
    .status(200)
    .json(new ApiResponse(200, blog, "Blog located successfully!!"));
});

const deleteBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const blog = await Blog.findById(id);

  if (!blog) throw new ApiError(404, "Blog not found!!");

  const imageUrl = blog.image;
  const authorImgUrl = blog.authorImage;
  const publicId1 = imageUrl.split("/").pop().split(".")[0];
  const publicId2 = authorImgUrl.split("/").pop().split(".")[0];

  await deleteFromCloudinary(publicId1);
  await deleteFromCloudinary(publicId2);

  await Blog.findByIdAndDelete(id);

  res
    .status(200)
    .json(
      new ApiResponse(200, "Blog and associated image deleted successfully!!")
    );
});

const registerEmail = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) throw new ApiError(400, "Email must be filled");

  const newEmail = await User.create({ email });

  return res
    .status(200)
    .json(new ApiResponse(200, newEmail, "User registeration successfull!!"));
});

const getUserEmail = asyncHandler(async (req, res) => {
  const usersEmail = await User.find({});

  if (usersEmail.length === 0) {
    throw new ApiError(404, "No users found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, usersEmail, "Users fetched successfully"));
});

const deleteUserEmail = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const user = await User.findById(id);

  if (!user) throw new ApiError(404, "User not found!!");

  await User.findByIdAndDelete(id);

  res.status(200).json(new ApiResponse(200, "User removed successfully!!"));
});

export {
  createBlog,
  fetchAllBlog,
  fetchBlogById,
  deleteBlog,
  registerEmail,
  getUserEmail,
  deleteUserEmail,
};
