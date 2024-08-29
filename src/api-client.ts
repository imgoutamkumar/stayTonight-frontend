import { RegisterFormData } from "./pages/Register";
import { SignInFormData } from "./pages/signIn";
import { HotelSearchResponse } from "./shared/types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

type HotelType = {
  _id: string;
  createrId: string;
  name: string;
  landmark: string;
  city: string;
  state: string;
  country: string;
  description: string;
  starRating: number;
  type: string;
  adultCount: number;
  childCount: number;
  facilities: string[];
  pricePerNight: number;
  imageUrls: string[];
  lastUpdated: Date;
  rating: number;
  reviews: string[];
};

export const register = async (formData: RegisterFormData) => {
  const response = await fetch(`${API_BASE_URL}/api/user/register`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const responseBody = await response.json();
  if (!response.ok) {
    throw new Error(responseBody.message);
  }
};

export const signIn = async (formData: SignInFormData) => {
  console.log("API_BASE_URL", API_BASE_URL);
  const response = await fetch(`${API_BASE_URL}/api/user/signIn`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const responseBody = await response.json();
  if (!response.ok) {
    throw new Error(responseBody.message);
  }
  return responseBody;
};

export const logOut = async () => {
  const response = await fetch(`${API_BASE_URL}/api/user/logOut`, {
    method: "POST",
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Error during sign out");
  }
};

export const validateToken = async () => {
  const response = await fetch(`${API_BASE_URL}/api/user/validate-token`, {
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Token invalid");
  }
  return response.json();
};

export const addHotel = async (hotelFormData: FormData) => {
  console.log("hotelFormData ", hotelFormData);

  const response = await fetch(`${API_BASE_URL}/api/hotel/create`, {
    method: "POST",
    credentials: "include",
    body: hotelFormData,
  });
  if (!response.ok) {
    throw new Error("Something went wrong");
  }
  return response.json();
};

export const fetchHotels = async (): Promise<HotelType[]> => {
  const response = await fetch(`${API_BASE_URL}/api/hotel/all`, {
    method: "GET",
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Token invalid");
  }
  return response.json();
};

export const fetchHotelById = async (hotelId: string): Promise<HotelType> => {
  const response = await fetch(`${API_BASE_URL}/api/hotel/id/${hotelId}`, {
    method: "GET",
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Token invalid");
  }
  return response.json();
};

export const updateHotelById = async (
  hotelFormData: FormData
): Promise<HotelType> => {
  const response = await fetch(
    `${API_BASE_URL}/api/hotel/${hotelFormData.get("hotelId")}`,
    {
      method: "PUT",
      credentials: "include",
      body: hotelFormData,
    }
  );
  if (!response.ok) {
    throw new Error("Failed to update hotel");
  }
  return response.json();
};

export type SerachParams = {
  destination?: string;
  checkIn?: string;
  checkOut?: string;
  adultCount?: string;
  childCount?: string;
  page?: string;
};

export const searchHotels = async (
  searchParams: SerachParams
): Promise<HotelSearchResponse> => {
  console.log(searchParams);
  const queryParams = new URLSearchParams();
  queryParams.append("destination", searchParams.destination || "");
  queryParams.append("checkIn", searchParams.checkIn || "");
  queryParams.append("checkOut", searchParams.checkOut || "");
  queryParams.append("adultCount", searchParams.adultCount || "");
  queryParams.append("childCount", searchParams.childCount || "");
  queryParams.append("page", searchParams.page || "");

  const response = await fetch(
    `${API_BASE_URL}/api/hotel/search?${queryParams}`
    /* {
      method: "GET",
      credentials: "include",
    } */
  );

  if (!response.ok) {
    throw new Error("Error while searching hotels");
  }

  console.log(response);
  return response.json();
};
