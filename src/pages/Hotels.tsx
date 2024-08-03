import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";
import { BsBuilding, BsMap } from "react-icons/bs";
import { BiHotel, BiMoney, BiStar } from "react-icons/bi";
export const Hotels = () => {
  const { showToast } = useAppContext();
  const { data: hotelsData } = useQuery("fetchHotels", apiClient.fetchHotels, {
    onSuccess: (result) => {
      console.log(result);
    },
    onError: () => {
      showToast({ message: "Something went wrong", type: "ERROR" });
    },
  });

  if (!hotelsData) {
    return <span>No Hotels Found</span>;
  }

  return (
    <div className="space-y-5">
      <span className="flex justify-between">
        <h1 className="text-3xl font-bold">My Hotels</h1>
        <Link
          to="/addHotel"
          className="rounded-md w-[100px] flex  justify-center items-center bg-blue-600 text-white font-bold p-2 hover:bg-blue-500"
        >
          Add Hotel
        </Link>
      </span>
      <div className="grid grid-cols-1 gap-8">
        {hotelsData.map((hotel,index) => (
          <div key={index} className="flex flex-col justify-between border border-slate-300 rounded-lg p-8 gap-5">
            <h2 className="text-2xl text-bold">{hotel.name}</h2>
            <div className="truncate whitespace-pre-line h-[150px]">{hotel.description}</div>
          <div className="grid grid-cols-5 gap-2">
            <div className="truncate border  border-slate-300 rounded-sm px-3 flex items-center justify-center">
                <BsMap className="mr-1"></BsMap>
                {hotel.city},{hotel.state},{hotel.country}
            </div>
            <div className=" border border-slate-300 rounded-sm p-3 flex items-center justify-center">
                <BsBuilding className="mr-1"></BsBuilding>
                {hotel.type}
            </div>
            <div className="border border-slate-300 rounded-sm p-3 flex items-center justify-center">
                <BiMoney className="mr-1"></BiMoney>
                <span className="font-semibold">{hotel.pricePerNight} </span> per Night
            </div>
            <div className="border border-slate-300 rounded-sm p-3 flex items-center justify-center">
                <BiHotel className="mr-1"></BiHotel>
                {hotel.adultCount} adults | {hotel.childCount} children 
            </div>
            <div className="border border-slate-300 rounded-sm p-3 flex items-center justify-center">
                <BiStar className="mr-1"></BiStar>
                {hotel.starRating} star
            </div>
          </div>
          <span className="flex justify-end ">
            <Link to={`/edit-hotel/${hotel._id}`} className="rounded-md w-[120px] flex  justify-center items-center bg-blue-600 text-white font-bold p-2 hover:bg-blue-500">
            View Details</Link>
          </span>
          </div>
        ))}
      </div>
    </div>
  );
};
