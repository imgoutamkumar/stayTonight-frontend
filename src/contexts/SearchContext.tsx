import React, { useContext, useState } from "react";

type SearchContext = {
  destination: string;
  checkIn: Date;
  checkOut: Date;
  adutlCount: number;
  childCount: number;
  hotelId:string
  saveSearchValues: (
    destination: string,
    checkIn: Date,
    checkOut: Date,
    adutlCount: number,
    childCount: number,
  ) => void;
};

type SearchContextProviderProps = {
  children: React.ReactNode;
};

const SearchContext = React.createContext<SearchContext | undefined>(undefined);

export const SearchContextProvider = ({
  children,
}: SearchContextProviderProps) => {
  const [destination, setDestination] = useState("");
  const [checkIn, setCheckIn] = useState(new Date());
  const [checkOut, setCheckOut] = useState(new Date());
  const [adutlCount, setAdutlCount] = useState(1);
  const [childCount, setChildCount] = useState(0);
  const [hotelId, setHotelId] = useState("");
  const saveSearchValues = (
    destination: string,
    checkIn: Date,
    checkOut: Date,
    adutlCount: number,
    childCount: number,
    hotelId?:string
  ) => {
    setDestination(destination)
    setCheckIn(checkIn)
    setCheckOut(checkOut)
    setAdutlCount(adutlCount)
    setChildCount(childCount)
    if(hotelId){
        setHotelId(hotelId)
    }
  };

  return <SearchContext.Provider value={{
    destination,
    checkIn,
    checkOut,
    adutlCount,
    childCount,
    hotelId,
    saveSearchValues,
  }}>{children}</SearchContext.Provider>;
};

export const useSearchContext=()=>{
  const context= useContext(SearchContext)
  return context as SearchContext
}
