import { useState, useEffect } from "react";
import axios from "axios"; 
import Card from "./Card";
import { Button } from "./ui/button";

const CardItems = () => {
  const [menu, setMenu] = useState("All");
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get("/api/v1/blog");
      setBlogs(response.data.blogs || []);
      console.log(response.data.blogs || []);
    } catch (err) {
      console.error("Error fetching blogs:", err);
      setError(err.response?.data?.message || "Failed to fetch blogs.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  if (loading) {
    return <div className="p-6">Loading blogs...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-500">{error}</div>;
  }

  const filteredBlogs = blogs.filter(
    (item) => menu === "All" || item.category === menu
  );

  return (
    <div>
      <div className="flex justify-center gap-5 my-10">
        <Button
          variant="secondary"
          type="button"
          onClick={() => setMenu("All")}
        >
          All
        </Button>
        <Button
          variant="secondary"
          type="button"
          onClick={() => setMenu("Technology")}
        >
          Technology
        </Button>
        <Button
          variant="secondary"
          type="button"
          onClick={() => setMenu("Travel")}
        >
          Travel
        </Button>
        <Button
          variant="secondary"
          type="button"
          onClick={() => setMenu("Startup")}
        >
          Startup
        </Button>
      </div>

      <div className="flex flex-wrap gap-5 w-full justify-center">
        {filteredBlogs.map((item) => (
          <Card post={item} key={item._id} />
        ))}
      </div>
    </div>
  );
};

export default CardItems;
