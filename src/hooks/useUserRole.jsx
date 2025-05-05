import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";

const useUserRole = () => {
  const { user, loading } = useContext(AuthContext);

  const { data: userData = {}, isLoading } = useQuery({
    queryKey: ["userRole", user?.email],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const res = await axios.get(`/api/users/${user.email}`);
      return res.data;
    },
  });

  return { role: userData?.role, isLoading };
};

export default useUserRole;
