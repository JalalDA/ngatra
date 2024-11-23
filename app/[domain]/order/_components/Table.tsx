import React from "react";

type Order = {
  id: string;
  service: string;
  link: string;
  progress: string;
  price: string;
  date: string;
  status: "completed" | "cancelled" | "in-progress";
};

const orders: Order[] = [
  {
    id: "108906441",
    service: "YouTube Likes | Non Drop | 10K/Day",
    link: "https://youtube.com/watch?v=0acekse9Db8",
    progress: "1000 of 1000 Completed",
    price: "Rp 16,957",
    date: "21 Nov. 16:44",
    status: "completed",
  },
  {
    id: "108721154",
    service: "TikTok Live Stream Views | 15 Min",
    link: "#",
    progress: "0 of 50 Cancelled",
    price: "Rp 0",
    date: "20 Nov. 20:33",
    status: "cancelled",
  },
];

const Table: React.FC = () => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <table className="min-w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 border-b border-gray-200">
            <th className="text-left text-sm font-semibold text-gray-600 px-6 py-4">
              ID
            </th>
            <th className="text-left text-sm font-semibold text-gray-600 px-6 py-4">
              Service and Link
            </th>
            <th className="text-left text-sm font-semibold text-gray-600 px-6 py-4">
              Progress
            </th>
            <th className="text-left text-sm font-semibold text-gray-600 px-6 py-4">
              Price
            </th>
            <th className="text-left text-sm font-semibold text-gray-600 px-6 py-4">
              Date
            </th>
            <th className="text-left text-sm font-semibold text-gray-600 px-6 py-4">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr
              key={order.id}
              className={`${
                index % 2 === 0 ? "bg-gray-50" : "bg-white"
              } hover:bg-gray-100 transition`}
            >
              <td className="text-sm text-gray-800 px-6 py-4 font-medium">
                {order.id}
              </td>
              <td className="text-sm text-gray-800 px-6 py-4">
                <div className="flex flex-col">
                  <span>{order.service}</span>
                  <a
                    href={order.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-600 text-sm"
                  >
                    View Link
                  </a>
                </div>
              </td>
              <td
                className={`text-sm px-6 py-4 ${
                  order.status === "completed"
                    ? "text-green-600"
                    : order.status === "cancelled"
                    ? "text-red-600"
                    : "text-gray-600"
                }`}
              >
                {order.progress}
              </td>
              <td className="text-sm text-gray-800 px-6 py-4">{order.price}</td>
              <td className="text-sm text-gray-800 px-6 py-4">{order.date}</td>
              <td className="text-sm px-6 py-4">
                <button className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition">
                  Reorder
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
