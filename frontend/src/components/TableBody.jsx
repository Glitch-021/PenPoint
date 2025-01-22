import { X } from "lucide-react";

// eslint-disable-next-line react/prop-types
const TableBody = ({ author, authorImg, title }) => {
  return (
    <tr>
      <td className="px-6 py-4 border-b border-gray-300 text-gray-800 text-left">
        <img
          src={
            authorImg
              ? authorImg
              : "https://img.icons8.com/?size=64&id=SBbseRkPv91g&format=png"
          }
          alt="A"
          className="w-10 h-10 inline-block mr-2"
        />
        {author ? author : "John Doe"}
      </td>
      <td className="px-6 py-4 border-b border-gray-300 text-gray-800 text-left">
        {title ? title : "Learning React"}
      </td>
      <td className="px-6 py-4 border-b border-gray-300 text-gray-800 text-left">
        2025-01-21
      </td>
      <td className="px-6 py-4 border-b border-gray-300 text-center text-gray-800 text-left">
        <button className="text-red-500 hover:text-red-700">
          <X size={20} />
        </button>
      </td>
    </tr>
  );
};

export default TableBody;
