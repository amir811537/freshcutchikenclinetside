import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const fetchCart = async (email) => {
  const res = await axios.get(`https://serversidefreshcut.vercel.app/cart?email=${email}`);
  return res.data;
};

const useCart = (email) => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['cart', email],
    queryFn: () => fetchCart(email),
    enabled: !!email, // only fetch if email is available
  });

  const refetchCart = () => {
    queryClient.invalidateQueries(['cart', email]);
  };

  return { ...query, refetchCart };
};

export default useCart;
