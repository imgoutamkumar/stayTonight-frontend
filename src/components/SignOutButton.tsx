import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";

export const SignOutButton = () => {
    const queryClient= useQueryClient();
  const { showToast } = useAppContext();
  const mutation = useMutation(apiClient.logOut, {
    onSuccess: async() => {
        await queryClient.invalidateQueries("validateToken")
      showToast({ message: "Sign Out!", type: "SUCCESS" });
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "SUCCESS" });
    },
  });
  const handleClick = () => {
    mutation.mutate();
  };

  return (
    <button
      onClick={handleClick}
      className=" text-blue-600 px-3 font-bold bg-white hover:bg-black hover:border-white hover:border-2"
    >
      Sign Out
    </button>
  );
};
