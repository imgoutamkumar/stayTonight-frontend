import { useMutation, useQuery } from "react-query"
import { useParams } from "react-router-dom"
import * as apiClient from "../api-client";
import { ManageHotelForm } from '../forms/ManageHotelForm/ManageHotelForm';
import { useAppContext } from "../contexts/AppContext";

const EditHotel = () => {
  
  const {hotelId}=useParams()
  const {data:hotelData}= useQuery("fetchHotelById",()=>apiClient.fetchHotelById(hotelId?.toString() || "" ),{
    enabled:!!hotelId
  })

console.log(hotelData)
const { showToast } = useAppContext();
  const {mutate,isLoading} =useMutation(apiClient.updateHotelById,{
    onSuccess: () => {
      showToast({ message: "Hotel updated", type: "SUCCESS" });
    },
    onError: () => {
      showToast({ message: "Something went wrong", type: "ERROR" });
    },
  })

  const handleSave = (hotelFormData:FormData) => {
    console.log("handle save clicked")
    mutate(hotelFormData)
  };
  return (
    <ManageHotelForm hotelData={hotelData} onSave={handleSave} isLoading={isLoading} />
  )
}

export default EditHotel

