import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";


export const DetailsSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold mb-3">Add Hotel</h1>
      <label className=" text-gray-700 text-sm font-bold">
        Name
        <input
          className=" rounded w-full py-1 px-2 font-normal h-12 border-2 border-gray-400"
          type="text"
          placeholder="enter name"
          {...register("name", { required: "This field is required" })}
        />
        {errors.name && (
          <span className="text-red-500">{errors.name.message}</span>
        )}
      </label>

      <div className="flex justify-between gap-4">
      <label className="w-full text-gray-700 text-sm font-bold">
          Landmark
          <input
            className=" rounded w-full py-1 px-2 font-normal h-10 border-2 border-gray-400"
            type="text"
            placeholder="enter landmark"
            {...register("landmark", { required: "This field is required" })}
          />
          {errors.landmark && (
            <span className="text-red-500">{errors.landmark.message}</span>
          )}
        </label>
        <label className="w-full text-gray-700 text-sm font-bold">
          City
          <input
            className=" rounded w-full py-1 px-2 font-normal h-10 border-2 border-gray-400"
            type="text"
            placeholder="enter city"
            {...register("city", { required: "This field is required" })}
          />
          {errors.city && (
            <span className="text-red-500">{errors.city.message}</span>
          )}
        </label>
        <label className="w-full text-gray-700 text-sm font-bold">
          State
          <input
            className=" rounded w-full py-1 px-2 font-normal h-10 border-2 border-gray-400"
            type="text"
            placeholder="enter state"
            {...register("state", { required: "This field is required" })}
          />
          {errors.state && (
            <span className="text-red-500">{errors.state.message}</span>
          )}
        </label>
        <label className="w-full text-gray-700 text-sm font-bold">
          Country
          <input
            className=" rounded w-full py-1 px-2 font-normal h-10 border-2 border-gray-400"
            type="text"
            placeholder="enter country"
            {...register("country", { required: "This field is required" })}
          />
          {errors.country && (
            <span className="text-red-500">{errors.country.message}</span>
          )}
        </label>
      </div>
      <label className=" text-gray-700 text-sm font-bold">
        Description
        <textarea
          rows={10}
          className=" rounded w-full py-1 px-2 font-normal h-40 border-2 border-gray-400"
          placeholder="enter description"
          {...register("description", { required: "This field is required" })}
        />
        {errors.description && (
          <span className="text-red-500">{errors.description.message}</span>
        )}
      </label>
      <div className="flex gap-4">
        <label className=" text-gray-700 text-sm font-bold ">
          Price Per Night
          <input
            className=" rounded w-full py-1 px-2 font-normal h-10 border-2 border-gray-400"
            type="number"
            min={1}
            placeholder="enter price per night"
            {...register("pricePerNight", {
              required: "This field is required",
            })}
          />
          {errors.pricePerNight && (
            <span className="text-red-500">{errors.pricePerNight.message}</span>
          )}
        </label>
        <label className=" text-gray-700 text-sm font-bold max-w-[50%]">
          Luxury Star Rating
          <select className=" rounded w-full py-1 px-2 h-10 border-2  border-gray-400"
          {...register("starRating", {
            required: "This field is required",
          })}
          >
            <option value="" className="font-bold text-sm">
              Select as Rating
            </option>
            {[1, 2, 3, 4, 5].map((num) => (
              <option key={num} value={num}>{num}</option>
            ))}
          </select>
          {errors.starRating && (
            <span className="text-red-500">{errors.starRating.message}</span>
          )}
        </label>

      </div>
    </div>
  );
};
