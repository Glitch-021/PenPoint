import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="py-1 px-3 md:px-7 lg:px-14">
      <div className="flex justify-between items-center">
        <img
          src="https://cdn.pixabay.com/photo/2014/10/29/01/00/logo-507440_640.png"
          alt="PenPoint"
          className="w-[180px]"
        />
        <Link to="/admin">
          <Button variant="secondary">Get Started</Button>
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
