/* eslint-disable react/prop-types */
const BlogTable = ({ blogs }) => {
  return (
    <div className="p-6 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">All Blogs</h1>
      <div className="overflow-x-auto">
        {blogs?.length > 0 ? (
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
              {blogs?.map((blog) => (
                <tr key={blog._id} className="border-b border-gray-200">
                  <td className="px-6 py-3 text-sm">{blog.author}</td>
                  <td className="px-6 py-3 text-sm">{blog.title}</td>
                  <td className="px-6 py-3 text-sm">
                    {new Intl.DateTimeFormat("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    }).format(new Date(blog.date))}
                  </td>
                  <td className="px-6 py-3 text-center text-sm">
                    <button className="text-blue-500 hover:underline">
                      View
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
