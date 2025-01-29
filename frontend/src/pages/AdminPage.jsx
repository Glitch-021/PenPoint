import AddBlogForm from "@/components/AddBlogForm";
import Sidebar from "@/components/Sidebar";
import Admin from "@/components/admin/Admin";
import axios from "axios";
import BlogTable from "@/components/admin/BlogTable";
import { useEffect, useState } from "react";
import SubscriptionTable from "@/components/admin/SubscriptionTable";

function AdminPage() {
  const [activeComponent, setActiveComponent] = useState("");
  const [data, setData] = useState(null);

  const fetchAllBlogData = async () => {
    try {
      const response = await axios.get(`/api/v1/blog`);
      setData(response.data.data || []);
    } catch (error) {
      console.error("Error fetching blog:", error);
    }
  };

  // Fetch blog data and subscribers when the component mounts
  useEffect(() => {
    fetchAllBlogData();
  }, []);

  const [subscribers, setSubscribers] = useState(null);

  const fetchSubscribers = async () => {
    try {
      const response = await axios.get(`/api/v1/blog/email`);
      setSubscribers(response.data.data || []);
    } catch (error) {
      console.error("Error fetching subscribers:", error);
    }
  };

  // Fetch subscribers when the component mounts
  useEffect(() => {
    fetchSubscribers();
  }, []);

  return (
    <div className="flex w-full">
      <div className="relative w-80">
        <Sidebar setActiveComponent={setActiveComponent} />
      </div>
      <div className="w-full">
        <Admin data={data} />
        <div>
          {activeComponent === "" && (
            <BlogTable data={data} setData={setData} />
          )}
          {activeComponent === "addBlog" && <AddBlogForm />}
          {activeComponent === "subscription" && (
            <SubscriptionTable
              subscribers={subscribers}
              setSubscribers={setSubscribers}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminPage;
