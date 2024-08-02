import { FormProvider, useForm } from "react-hook-form";
import { DetailsSection } from "./DetailsSection";

import { FacilitiesSection } from "./FacilitiesSection";
import { GuestSection } from "./GuestSection";
import { ImagesSection } from "./ImagesSection";
import { TypesSection } from "./TypesSection";
import LoadingButton from "@mui/lab/LoadingButton";

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
  onSave: (hotelFormData: FormData) => void;
  isLoading: boolean;
};

export const ManageHotelForm = ({ onSave, isLoading }: Props) => {
  const formMethods = useForm<HotelFormData>();
  const { handleSubmit } = formMethods;

  const onSubmitHotelForm = handleSubmit((data: HotelFormData) => {
    console.log(data);
    const formData = new FormData();

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
    /*  Array.from(data.imageUrls).forEach((imageUrl) => {
      formData.append(`imageUrls`, imageUrl);
    }); */

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
