import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

export const ImagesSection = () => {
  const {
    register,
    formState: { errors },
    watch,
    setValue
  } = useFormContext<HotelFormData>();

  const existingUmagesUrls = watch("imageUrls");

const handleDelete = (e:React.MouseEvent<HTMLButtonElement,MouseEvent>,imageUrl:string)=>{
  e.preventDefault()
  setValue("imageUrls",existingUmagesUrls.filter((url)=>url!=imageUrl))
}

  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">Images</h2>
      <div className="border border-gray-400 rounded-xl p-4 flex flex-col gap-4">
        {existingUmagesUrls && (
          <div className="flex flex-wrap gap-4 ">
            {existingUmagesUrls.map((url) => (
              <div className="relative group">
                <img src={url} alt="" className="min-h-full w-[160px] rounded-xl object-cover" />
                <button onClick={(event)=>handleDelete(event,url)} className="absolute inset-0 rounded-xl flex justify-center items-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 ">
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}

        <input
          type="file"
          multiple
          accept="image/*"
          className="w-full text-gray-700 font-normal"
          {...register("imageFiles", {
            validate: (imageFiles) => {
              if (imageFiles && imageFiles.length > 0) {
                return true;
              } else {
                return "At least one image";
              }
            },
          })}
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
