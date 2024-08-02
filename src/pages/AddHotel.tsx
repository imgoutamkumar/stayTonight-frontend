import { useMutation } from "react-query";
import { ManageHotelForm } from "../forms/ManageHotelForm/ManageHotelForm";
import { useAppContext } from "../contexts/AppContext";
import * as apiClient from "../api-client";

export const AddHotel = () => {
  const { showToast } = useAppContext();
  const { mutate, isLoading } = useMutation(apiClient.addHotel, {
    onSuccess: () => {
      showToast({ message: "Hotel Saved", type: "SUCCESS" });
    },
    onError: () => {
      showToast({ message: "Something went wrong", type: "ERROR" });
    },
  });

  const handleSave = (hotelFormData:FormData) => {
    mutate(hotelFormData);
    console.log(hotelFormData);
  };
  return <ManageHotelForm onSave={handleSave} isLoading={isLoading}></ManageHotelForm>;
};
