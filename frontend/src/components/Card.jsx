/* eslint-disable react/prop-types */
import { Clock, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

function Card({ post }) {
  // Trim description to 100 characters
  const trimmedDescription =
    post.description.length > 100
      ? post.description.substring(0, 100) + "..."
      : post.description;

  // Format the date
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(post.date));

  return (
    <div
      key={post._id}
      className="w-[300px] h-[480px] overflow-hidden bg-white hover:shadow-xl transition-shadow duration-300 rounded-sm  border border-black shadow-[-7px_7px_0px_#000000]"
    >
      <div className="relative">
        <img
          src={post.image}
          alt={post.title}
          className="w-72 h-52 object-cover"
        />
        <span className="absolute top-4 left-4 px-2 py-1 text-sm rounded-full bg-primary/90 hover:bg-primary text-white">
          {post.category}
        </span>
      </div>

      <div className="pt-5 pb-3 px-6 font-hubot">
        <div className="flex items-center space-x-4">
          <div className="relative w-10 h-10">
            <span className="absolute inset-0 rounded-full flex items-center justify-center bg-gray-100 text-gray-600">
              <img
                src={post.authorImage}
                alt={post.author}
                className="rounded-full w-full h-full object-cover"
              />
            </span>
          </div>
          <div>
            <p className="font-medium">{post.author}</p>
            <p className="text-sm text-gray-500">{formattedDate}</p>
          </div>
        </div>
        <h2 className="text-2xl text-start font-bold leading-tight hover:text-primary cursor-pointer mt-4 font-sourgummy">
          {post.title}
        </h2>
      </div>

      <div className="px-6 pb-4 text-start font-exo">
        <p className="text-gray-500">{trimmedDescription}</p>
      </div>

      <div className="px-6 py-4 flex justify-between border-t border-gray-100">
        <div className="flex items-center space-x-4 text-gray-500">
          <Link to={`/blog/${post._id}`}>
            <div className="flex items-center space-x-1">
              <ArrowRight size={22} />
              <h1 className="inline-block">Read More</h1>
            </div>
          </Link>
        </div>
        <div className="flex items-center text-gray-500 font-lacquer">
          <Clock className="w-4 h-4 mr-1" />
          <span className="text-sm">{post.read_time}</span>
        </div>
      </div>
    </div>
  );
}

export default Card;
