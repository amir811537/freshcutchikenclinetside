import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loader from "../../Loader/Loader";

const Usermanagement = () => {
  const { data: users = [], isLoading, refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axios.get("https://freshcutserverside.vercel.app/users");
      return res.data;
    },
  });

  // pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 14;

  // calculate pagination
  const totalPages = Math.ceil(users.length / usersPerPage);
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  if (isLoading)
    return (
      <div className="flex justify-center items-center">
        <Loader />
      </div>
    );

  return (
    <div className="px-4 py-6">
      <h2 className="text-2xl font-semibold mb-4">User Management</h2>
      <div className="overflow-x-auto">
        <table className="table w-full bg-white dark:bg-black dark:text-white">
          <thead className="bg-base-200">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Method</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user, index) => (
              <tr key={user._id}>
                <td>{indexOfFirstUser + index + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.method}</td>
                <td>{user.role}</td>
                <td>
                  <button
                    className="btn btn-sm btn-error"
                    onClick={async () => {
                      await axios.delete(
                        `https://freshcutserverside.vercel.app/users/${user._id}`
                      );
                      refetch();
                    }}
                  >
                    Delete
                  </button>
                  <button
                    className="btn btn-sm btn-info ml-2"
                    onClick={async () => {
                      await axios.patch(
                        `https://freshcutserverside.vercel.app/users/${user._id}`,
                        {
                          role: user.role === "admin" ? "user" : "admin",
                        }
                      );
                      refetch();
                    }}
                  >
                    {user.role === "admin" ? "Demote" : "Promote"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6 space-x-2">
        <button
          className="btn btn-sm btn-outline"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          Prev
        </button>

        {[...Array(totalPages).keys()].map((num) => (
          <button
            key={num}
            className={`btn btn-sm ${
              currentPage === num + 1
                ? "btn-primary"
                : "btn-outline"
            }`}
            onClick={() => setCurrentPage(num + 1)}
          >
            {num + 1}
          </button>
        ))}

        <button
          className="btn btn-sm btn-outline"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Usermanagement;
