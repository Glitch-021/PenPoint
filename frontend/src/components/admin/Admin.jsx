import { Bell, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

const AdminNavbar = () => {
  return (
    <nav className="bg-white border-b h-16 px-6 flex items-center justify-between">
      {/* Left side - User info */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
            <span className="text-white font-semibold">JD</span>
          </div>
          <div className="ml-3">
            <p className="font-medium">John Doe</p>
            <p className="text-sm text-gray-500">Admin</p>
          </div>
        </div>
      </div>

      {/* Right side - Stats and actions */}
      <div className="flex items-center space-x-8">
        <div className="flex space-x-6">
          <div className="text-center">
            <p className="font-semibold">12</p>
            <p className="text-sm text-gray-500">Blogs</p>
          </div>
          <div className="text-center">
            <p className="font-semibold">1.2k</p>
            <p className="text-sm text-gray-500">Views</p>
          </div>
          <div className="text-center">
            <p className="font-semibold">48</p>
            <p className="text-sm text-gray-500">Comments</p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5 text-gray-500" />
          </Button>
          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5 text-gray-500" />
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
