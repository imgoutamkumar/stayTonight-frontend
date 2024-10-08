import { FormProvider, useForm } from "react-hook-form";
import { DetailsSection } from "./DetailsSection";

import { FacilitiesSection } from "./FacilitiesSection";
import { GuestSection } from "./GuestSection";
import { ImagesSection } from "./ImagesSection";
import { TypesSection } from "./TypesSection";
import LoadingButton from "@mui/lab/LoadingButton";
import { HotelType } from "../../shared/types";
import { useEffect } from "react";

export type HotelFormData = {
  name: string;
  landmark: string;
  city: string;
  state: string;
  country: string;
  description: string;
  type: string;
  pricePerNight: number;
  starRating: number;
  facilities: string[];
  imageFiles: FileList;
  imageUrls: string[];
  adultCount: number;
  childCount: number;
};

type Props = {
  hotelData?: HotelType;
  onSave: (hotelFormData: FormData) => void;
  isLoading: boolean;
};

export const ManageHotelForm = ({ onSave, isLoading, hotelData }: Props) => {
  const formMethods = useForm<HotelFormData>();
  const { handleSubmit, reset } = formMethods;

  useEffect(() => {
    reset(hotelData);
  }, [hotelData, reset]);

  const onSubmitHotelForm = handleSubmit((data: HotelFormData) => {
    console.log(data);
    const formData = new FormData();
if (hotelData) {
  formData.append("hotelId",hotelData._id)
}
    formData.append("name", data.name);
    formData.append("landmark", data.landmark);
    formData.append("city", data.city);
    formData.append("state", data.state);
    formData.append("country", data.country);
    formData.append("description", data.description);
    formData.append("type", data.type);
    formData.append("pricePerNight", data.pricePerNight.toString());
    formData.append("starRating", data.starRating.toString());
    formData.append("adultCount", data.adultCount.toString());
    formData.append("childCount", data.childCount.toString());
    data.facilities.forEach((facility, index) => {
      formData.append(`facilities[${index}]`, facility);
    });
    if (data.imageUrls) {
      data.imageUrls.forEach((imageUrl,index) => {
        formData.append(`imageUrls[${index}]`, imageUrl);
      });
    }
    

    Array.from(data.imageFiles).forEach((imageFile) => {
      formData.append(`imageFiles`, imageFile);
    });

    onSave(formData);
    /*  console.log([...formData.entries()]);
    console.log([...formData.values()]);
    console.log(formData.getAll("imageFiles"));
    console.log(formData.get("facilities[2]")); */
  });

  return (
    <FormProvider {...formMethods}>
      <form className="flex flex-col gap-10" onSubmit={onSubmitHotelForm}>
        <DetailsSection></DetailsSection>
        <TypesSection></TypesSection>
        <FacilitiesSection></FacilitiesSection>
        <GuestSection></GuestSection>
        <ImagesSection></ImagesSection>
        <span className="flex justify-end">
          {/* <button
            disabled={isLoading}
            className=" w-[100px] rounded-full bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 disabled:bg-gray-500"
            type="submit"
          >
            {isLoading ? "Saving..." : "Save"}
          </button> */}

          <LoadingButton
            sx={{ width: "100px", height: "40px" }}
            color="primary"
            disabled={isLoading}
            loading={isLoading}
            type="submit"
            variant="contained"
          >
            <span>Save</span>
          </LoadingButton>
        </span>
      </form>
    </FormProvider>
  );
};
