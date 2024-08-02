import { RegisterFormData } from "./pages/Register";
import { SignInFormData } from "./pages/signIn";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

type HotelType = {
  _id: string;
  createrId: string;
  name: string;
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
  const response = await fetch(`${API_BASE_URL}/api/hotel/`, {
    method: "GET",
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Token invalid");
  }
  return response.json();
};
