import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const Usermanagement = () => {
  const { data: users = [], isLoading, refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:5000/users");
      return res.data;
    },
  });

  if (isLoading) return <p>Loading users...</p>;

  return (
    <div className="px-4 py-6">
      <h2 className="text-2xl font-semibold mb-4">User Management</h2>
      <div className="overflow-x-auto">
        <table className="table w-full bg-white">
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
                      await axios.delete(`http://localhost:5000/users/${user._id}`);
                      refetch();
                    }}
                  >
                    Delete
                  </button>
                  <button
  className="btn btn-sm btn-info ml-2"
  onClick={async () => {
    await axios.patch(`http://localhost:5000/users/${user._id}`, {
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
