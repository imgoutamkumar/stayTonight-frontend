import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

export const ImagesSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();
  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">Images</h2>
      <div className="border rounded p-4 flex flex-col gap-4">
        <input type="file" 
        multiple
        accept="image/*"
        className="w-full text-gray-700 font-normal"
        {...register("imageFiles", {
            validate: (imageFiles) => {
              if (imageFiles && imageFiles.length > 0) {
                return true;
              } else {
                return "At least one facility";
              }
            },
          }
        )}
        />
        {errors.imageFiles && (
            <span className="text-red-500 text-sm font-bold">
              {errors.imageFiles.message}
            </span>
          )}
      </div>
    </div>
  );
};
