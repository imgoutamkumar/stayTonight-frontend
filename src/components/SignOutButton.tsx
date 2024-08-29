import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";
import { Button } from "@mui/material";

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
    <Button onClick={handleClick} color="error" variant="outlined">Sign Out </Button>
  );
};
