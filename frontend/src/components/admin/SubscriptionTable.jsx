/* eslint-disable react/prop-types */
import axios from "axios";
import { toast } from "react-toastify";

const SubscriptionTable = ({ subscribers, setSubscribers }) => {
  const deleteSubscriber = async (id) => {
    if (window.confirm("Are you sure you want to remove this subscriber?")) {
      try {
        const response = await axios.delete(`/api/v1/blog/email/${id}`);
        if (response.status === 200) {
          toast("Subscriber removed successfully!!");
          setSubscribers((prev) => prev.filter((sub) => sub._id !== id));
        }
      } catch (error) {
        console.error("Error deleting blog:", error);
        toast("Failed to delete the sub. Please try again.");
      }
    }
  };

  return (
    <div className="p-6 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">All Subscribers</h1>
      <div className="overflow-x-auto">
        {subscribers?.length > 0 ? (
          <table className="min-w-full border border-gray-300 bg-white shadow-sm rounded-lg">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="px-6 py-3 text-left text-sm font-medium border-b border-gray-300">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium border-b border-gray-300">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium border-b border-gray-300">
                  Subscribed Date
                </th>
                <th className="px-6 py-3 text-center text-sm font-medium border-b border-gray-300">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {subscribers?.map((subscriber) => (
                <tr
                  key={subscriber._id}
                  className="border-b border-gray-200 hover:bg-gray-50"
                >
                  <td className="px-6 py-3 text-sm text-left">
                    {subscriber.email}
                  </td>
                  <td className="px-6 py-3 text-sm text-left">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        subscriber.status === "active"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {subscriber.status}
                    </span>
                  </td>

                  <td className="px-6 py-3 text-center text-sm">
                    <button
                      className="text-red-500 hover:text-red-700 transition-colors"
                      onClick={() => deleteSubscriber(subscriber._id)}
                      aria-label="Delete subscriber"
                    >
                      ❌
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="p-6 text-gray-500 text-center">
            No subscribers found.
          </div>
        )}
      </div>
    </div>
  );
};

export default SubscriptionTable;
