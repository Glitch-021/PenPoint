import { Plus, BookOpen, BellRing } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const Sidebar = ({ setActiveComponent }) => {
  return (
    <div className="h-screen w-64 bg-gray-100 p-4 flex flex-col fixed">
      <div className="mb-14">
        <Link to="/">
          <h1 className="text-2xl font-bold text-gray-800 text-start">
            📝 PenPoint
          </h1>
        </Link>
      </div>

      <div className="space-y-7">
        <Button
          variant="ghost"
          className="w-full justify-start border border-black shadow-[-7px_7px_0px_#000000] hover:scale-105 active:scale-95 transition-all duration-300"
          onClick={() => setActiveComponent("addBlog")}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Blog
        </Button>

        <Button
          variant="ghost"
          className="w-full justify-start border border-black shadow-[-7px_7px_0px_#000000] hover:scale-105 active:scale-95 transition-all duration-300"
          onClick={() => setActiveComponent("")}
        >
          <BookOpen className="mr-2 h-4 w-4" />
          Blog List
        </Button>

        <Button variant="ghost" className="w-full justify-start border border-black shadow-[-7px_7px_0px_#000000] hover:scale-105 active:scale-95 transition-all duration-300">
          <BellRing className="mr-2 h-4 w-4" />
          Subscription
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
