import { useQuery } from "react-query";
import { useSearchContext } from "../contexts/SearchContext";
import * as apiClient from "../api-client";
import { useEffect, useState } from "react";
import { HotelSearchResponse } from "../shared/types";
import SearchResultsCard from "../components/SearchResultsCard";
import CustomPagination from "../components/Pagination";
import StarRatingFilter from "../components/StarRatingFilter";
import HotelTypesFilter from "../components/HotelTypesFilter";
import FacilitiesFilter from "../components/FacilitiesFilter";
import PriceFilter from "../components/PriceFilter";

const Search = () => {
  const search = useSearchContext();
  //console.log(search);

  const [page, setPage] = useState<number>(1);
  const [selectedStars, setSelectedStars] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);
  const [selectedPrice, setSelectedPrice] = useState<number|undefined>();

  const searchParams = {
    destination: search.destination,
    checkIn: search.checkIn.toISOString(),
    checkOut: search.checkOut.toISOString(),
    adultCount: search.adutlCount.toString(),
    childCount: search.childCount.toString(),
    page: page.toString(),
    stars:selectedStars,
    types:selectedTypes,
    facilities:selectedFacilities,
    maxPrice:selectedPrice?.toString()
  };

  const [searchedHotels, setSearchedHotels] = useState<HotelSearchResponse>();

  useEffect(() => {
    apiClient
      .searchHotels(searchParams)
      .then((result) => {
        console.log(result);
        setSearchedHotels(result);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const { data: hotelsData } = useQuery(
    ["searchHotels", searchParams],
    () => {
      apiClient.searchHotels(searchParams);
    },
    {
      onSuccess: (result) => {
        console.log(result);
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );

  const handleStarsChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    const starRating = event.target.value;
    setSelectedStars((prevStars) =>
      event.target.checked
        ? [...prevStars, starRating]
        : prevStars.filter((star) => star != starRating)
    );
  };

  const handleTypesChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    const types = event.target.value;
    setSelectedTypes((prevTypes) =>
      event.target.checked
        ? [...prevTypes, types]
        : prevTypes.filter((type) => type != types)
    );
  };

  const handleFacilitiesChanged = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const facilities = event.target.value;
    setSelectedFacilities((prevFacilities) =>
      event.target.checked
        ? [...prevFacilities, facilities]
        : prevFacilities.filter((facility) => facility != facilities)
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
      <div className="rounded-lg border border-slate-300 p-5 h-fit sticky top-10">
        <div className="space-y-5">
          <h3 className="text-lg font-semibold border-b border-slate-300 pb-5">
            Filter By :
          </h3>
          <StarRatingFilter
            selectedStars={selectedStars}
            onChangedStars={handleStarsChanged}
          ></StarRatingFilter>
          <HotelTypesFilter
            selectedTypes={selectedTypes}
            onChangedTypes={handleTypesChanged}
          ></HotelTypesFilter>
          <FacilitiesFilter
            selectedFacilities={selectedFacilities}
            onChangedFacilities={handleFacilitiesChanged}
          ></FacilitiesFilter>
          <PriceFilter
            selectedPrice={selectedPrice}
            onChangedPrice={(value?: number) => setSelectedPrice(value)}
          ></PriceFilter>
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold">
            {searchedHotels?.pagination.total} Hotels found
            {search.destination ? ` in ${search.destination}` : ""}
          </span>
        </div>
        {searchedHotels?.data.map((hotel) => (
          <SearchResultsCard hotel={hotel}></SearchResultsCard>
        ))}
        <CustomPagination
          page={searchedHotels?.pagination.page || 1}
          totalPage={searchedHotels?.pagination.pages || 1}
          onPageChange={(page) => setPage(page)}
        ></CustomPagination>
      </div>
    </div>
  );
};

export default Search;
