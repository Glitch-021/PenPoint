/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const BlogTable = ({ data, setData }) => {
  const navigate = useNavigate();

  const deleteBlog = async (id) => {
    if (window.confirm("Are you sure you want to delete this blog? 💀")) {
      try {
        const response = await axios.delete(`/api/v1/blog/${id}`); 
        if (response.status === 200) {
          toast("Blog deleted successfully!");
          setData((prevData) => prevData.filter((blog) => blog._id !== id));
        }
      } catch (error) {
        console.error("Error deleting blog:", error);
        toast("Failed to delete the blog. Please try again.");
      }
    }
  };

  return (
    <div className="p-6 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">All Blogs</h1>
      <div className="overflow-x-auto">
        {data?.length > 0 ? (
          <table className="min-w-full border border-gray-300 bg-white shadow-sm rounded-lg">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="px-6 py-3 text-left text-sm font-medium border-b border-gray-300">
                  Author Name
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium border-b border-gray-300">
                  Blog Title
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium border-b border-gray-300">
                  Date
                </th>
                <th className="px-6 py-3 text-center text-sm font-medium border-b border-gray-300">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {data?.map((blog) => (
                <tr key={blog._id} className="border-b border-gray-200">
                  <td className="px-6 py-3 text-sm text-left">
                    <img
                      src={blog.authorImage}
                      alt="💀"
                      className="w-10 h-10 bg-cover rounded-full inline-block mr-3"
                    />
                    {blog.author}
                  </td>
                  <td className="px-6 py-3 text-sm text-left">{blog.title}</td>
                  <td className="px-6 py-3 text-sm text-left">
                    {new Intl.DateTimeFormat("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    }).format(new Date(blog.date))}
                  </td>
                  <td className="px-6 py-3 text-center text-sm">
                    <button
                      className="text-blue-500 hover:underline"
                      onClick={() => navigate(`/blog/${blog._id}`)}
                    >
                      👁️
                    </button>
                    <button
                      className="text-red-500 hover:underline ml-4"
                      onClick={() => deleteBlog(blog._id)}
                    >
                      ❌
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="p-6 text-gray-500">No blogs available.</div>
        )}
      </div>
    </div>
  );
};

export default BlogTable;
