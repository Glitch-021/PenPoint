import CardItems from "@/components/CardItems";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";

export const HomePage = () => {
  return (
    <div>
      <Navbar />
      <Header />
      <CardItems />
      <footer className="text-md font-mono pt-20 pb-5 text-center font-medium text-gray-950">
        &copy; 2025 | All rights reserved. Made with 💖 by Arun Singh Bisht.
      </footer>
    </div>
  );
};
