import { Button } from "@mui/material";
import { HotelType } from "../shared/types";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
type Props = {
  hotel: HotelType;
};

const SearchResultsCard = ({ hotel }: Props) => {
  
  const navigate = useNavigate();
  const viewDetail = (id: string) => {
    navigate(`/detail/${id}`);
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-[2fr_3fr] border border-slate-300 rounded p-8 gap-8">
      <div className="w-full h-[280px]">
        <img
          src={hotel.imageUrls[0]}
          alt=""
          className="w-full h-full obj object-center"
        />
      </div>
      <div className="grid grid-rows-[1fr_2fr_1fr]">
        <div>
          <div className="flex items-center">
            <span className="flex">
              {Array.from({ length: hotel.starRating }).map(() => (
                <StarBorderIcon color="success"></StarBorderIcon>
              ))}
            </span>
            <span className="ml-1 text-sm">{hotel.type}</span>
          </div>
          <Link to={`/detail/${hotel._id}`}>
            <h2 className="text-2xl font-bold cursor-pointer">{hotel.name}</h2>
          </Link>
        </div>
        <div>
          <div className="line-clamp-4">{hotel.description}</div>
        </div>
        <div>
          <div className="grid grid-cols-2 items-end whitespace-nowrap">
            <div className="flex items-center gap-1">
              {hotel.facilities.slice(0, 3).map((facility) => (
                <span className="bg-slate-300 p-2 rounded-lg font-bold text-xs whitespace-nowrap">
                  {facility}
                </span>
              ))}
              <span className="text-sm">
                {hotel.facilities.length > 3 &&
                  `+${hotel.facilities.length - 3} more`}
              </span>
            </div>
            <div className="flex flex-col items-end gap-1">
              <span className="font-bold">${hotel.pricePerNight}</span>
              {/* <button className="bg-blue-600 text-white h-full p-2 font-bold text-xl max-w-fit">
                View More
              </button> */}
              <Button
                variant="contained"
                size="large"
                onClick={() => viewDetail(hotel._id)}
              >
                View More
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResultsCard;
