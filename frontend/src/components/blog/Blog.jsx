import axios from "axios";
import { ArrowLeft, Clock, Calendar, User } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export const Blog = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);

  const fetchBlogData = async () => {
    try {
      const response = await axios.get(`/api/v1/blog/${id}`);
      setData(response.data.blog);
    } catch (error) {
      console.error("Error fetching blog:", error);
    }
  };

  useEffect(() => {
    fetchBlogData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const formattedDate = data?.date
    ? new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }).format(new Date(data.date))
    : "N/A";

  if (!data)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );

  return (
    <article className="min-h-screen bg-white">
      {/* Back button */}
      <Link
        to="/"
        className="fixed top-6 left-6 flex items-center text-gray-600 hover:text-black transition-colors"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back to Blogs
      </Link>

      <div className="max-w-3xl mx-auto px-4 py-16">
        {/* Category tag */}
        <div className="text-center mb-6">
          <span className="inline-block px-4 py-1.5 bg-gray-100 text-gray-800 rounded-full text-sm font-medium">
            {data.category ? data.category : "All"}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-8">
          {data.title}
        </h1>

        {/* Author info and metadata */}
        <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8 mb-12">
          <div className="flex items-center">
            <img
              src={data.image}
              alt={data.author}
              className="w-10 h-10 rounded-full"
            />
            <div className="ml-3">
              <div className="flex items-center text-gray-600">
                <User className="w-4 h-4 mr-2" />
                <span>{data.author}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-6 text-gray-600">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              <span>{formattedDate}</span>
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              <span>
                {data.description?.length > 100 ? "5 min read" : "2 min read"}
              </span>
            </div>
          </div>
        </div>

        {/* Main image */}
        <div className="mb-12">
          <img
            src={data.image}
            alt={data.title}
            className="w-full h-[400px] object-cover rounded-2xl shadow-lg"
          />
        </div>

        {/* Introduction */}
        <div className="prose max-w-none mb-12">
          <h2 className="text-2xl font-bold mb-4">Introduction</h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            {data.description} 😉
          </p>
        </div>

        {/* Main content */}
        <div className="prose max-w-none mb-12">
          <h2 className="text-2xl font-bold mb-4">Deep Dive</h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>

          <h3 className="text-xl font-bold mb-4">Key Insights</h3>
          <p className="text-gray-700 leading-relaxed mb-6">
            Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
            cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum.
          </p>

          <blockquote className="border-l-4 border-gray-900 pl-4 italic my-8">
            &quot;he key to understanding {data.category} is to approach it with
            an open mind and a willingness to learn continuously.&quot;
          </blockquote>

          <h3 className="text-xl font-bold mb-4">Looking Ahead</h3>
          <p className="text-gray-700 leading-relaxed">
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
            quae ab illo inventore veritatis et quasi architecto beatae vitae
            dicta sunt explicabo.
          </p>
        </div>

        {/* Author bio */}
        <div className="bg-gray-50 rounded-xl p-6 mb-12">
          <div className="flex items-center mb-4">
            <img
              src={data.authorImage}
              alt={data.author}
              className="w-16 h-16 rounded-full bg-cover"
            />
            <div className="ml-4">
              <h3 className="font-bold text-lg">{data.author}</h3>
              <p className="text-gray-600">Expert in {data.category}</p>
            </div>
          </div>
          <p className="text-gray-700">
            A passionate writer and expert with years of experience in{" "}
            {data.category}. Committed to sharing knowledge and insights with
            readers around the world.
          </p>
        </div>
      </div>
    </article>
  );
};

export default Blog;
