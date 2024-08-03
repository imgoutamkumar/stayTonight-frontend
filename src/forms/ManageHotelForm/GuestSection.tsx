import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

export const GuestSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();
  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">Guests</h2>
      <div className="grid grid-cols-2 p-6 gap-5 bg-gray-300 rounded-md">
        <label className="text-gray-700 text-sm font-semibold">
          Adult
          <input
            className="rounded w-full py-1 px-2 font-normal h-10 border-2 border-gray-400"
            type="number"
             placeholder="maximum number of adult"
            min={1}
            {...register("adultCount", { required: "this field is required" })}
          />
          {errors.adultCount && (
            <span className="text-red-500 text-sm font-bold">
              {errors.adultCount.message}
            </span>
          )}
        </label>

        <label className="text-gray-700 text-sm font-semibold">
          Child
          <input
            className="rounded w-full py-1 px-2 font-normal h-10 border-2 border-gray-400"
            type="number"
            placeholder="maximum number of child"
            min={0}
            {...register("childCount", { required: "this field is required" })}
          />
          {errors.childCount && (
            <span className="text-red-500 text-sm font-bold">
              {errors.childCount.message}
            </span>
          )}
        </label>
      </div>
    </div>
  );
};
