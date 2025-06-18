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

  if (isLoading) return <div className="flex justify-center items-center">
    <Loader></Loader>
  </div>;

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
            {users.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.method}</td>
                <td>{user.role}</td>
                <td>
                  <button
                    className="btn btn-sm btn-error"
                    onClick={async () => {
                      await axios.delete(`https://freshcutserverside.vercel.app/users/${user._id}`);
                      refetch();
                    }}
                  >
                    Delete
                  </button>
                  <button
  className="btn btn-sm btn-info ml-2"
  onClick={async () => {
    await axios.patch(`https://freshcutserverside.vercel.app/users/${user._id}`, {
      role: user.role === "admin" ? "user" : "admin",
    });
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
    </div>
  );
};

export default Usermanagement;
