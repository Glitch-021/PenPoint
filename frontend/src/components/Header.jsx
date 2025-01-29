import { Button } from "@/components/ui/button";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

const Header = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`/api/v1/blog/email`, { email });
      console.log(response);

      toast.success("User registered successfully");

      setEmail("");
    } catch (error) {
      toast.error(error.message);
      console.error(error.message);
    }
  };

  return (
    <div className="py-5 px-5 md:px-12 lg:px-28">
      <div className="text-center my-8">
        <h1 className="text-3xl sm:text-5xl font-medium">Latest Blogs</h1>
        <p className="mt-10 max-w-[740px] m-auto text-xs sm:text-base">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam
          commodi, totam a voluptas facilis tempore asperiores unde nobis
          praesentium necessitatibus.
        </p>
        <form
          className="flex items-center justify-between gap-2 max-w-[500px] scale-75 sm:scale-100 mx-auto mt-10 border border-black shadow-[-7px_7px_0px_#000000]"
          onSubmit={handleSubmit}
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="pl-4 py-3 outline-none w-full h-full"
            required
          />
          <Button
            variant="secondary"
            type="submit"
            style={{
              backgroundColor: "black",
              color: "white",
              borderRadius: "0px",
              padding: "25px 32px",
            }}
          >
            Subscribe
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Header;
