import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../../components/loader";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/api/user") // Your backend endpoint
      .then((response) => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.response?.data?.error || err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <Loader />;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

  return (
    <div className="overflow-x-auto p-2">
      <h2 className="text-2xl font-semibold mb-4">Users</h2>
  {users.length === 0 ? (
    <p className="text-center text-gray-500 text-sm">No users found.</p>
  ) : (
    <div className="w-full mx-auto bg-white border border-gray-200 rounded-xl shadow-sm">
      <table className="min-w-full divide-y divide-gray-200 ">
        <thead className="bg-green-500 text-white ">
          <tr className="divide-x divide-gray-300">
            <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">
              Username
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">
              Role
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100">
          {users.map((user) => (
            <tr key={user._id} className="hover:bg-gray-100 transition">
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                {user.username}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                {user.role}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )}
</div>

  );
};

export default Users;
