import AddBlogForm from "@/components/AddBlogForm";
import Sidebar from "@/components/Sidebar";
import Admin from "@/components/admin/Admin";
import BlogTable from "@/components/admin/BlogTable";
import { useState } from "react";

function AdminPage() {
  const [activeComponent, setActiveComponent] = useState("");

  return (
    <div className="flex w-full">
      <div className="relative w-80">
        <Sidebar setActiveComponent={setActiveComponent} />
      </div>
      <div className="w-full">
        <Admin />
        <div>
          {activeComponent === "" && <BlogTable />}
          {activeComponent === "addBlog" && <AddBlogForm />}
        </div>
      </div>
    </div>
  );
}

export default AdminPage;
