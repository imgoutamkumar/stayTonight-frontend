import { FormEvent, useState } from "react";
import { useSearchContext } from "../contexts/SearchContext";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { Box, Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
const SearchBar = () => {
  const navigate = useNavigate();
  const search = useSearchContext();

  const [destination, setDestination] = useState(search.destination);
  const [checkIn, setCheckIn] = useState(search.checkIn);
  const [checkOut, setCheckOut] = useState(search.checkOut);
  const [adutlCount, setAdutlCount] = useState(search.adutlCount);
  const [childCount, setChildCount] = useState(search.childCount);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    search.saveSearchValues(
      destination,
      checkIn,
      checkOut,
      adutlCount,
      childCount
    );
    navigate("/search");
  };

  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);

  return (
    <form
      onSubmit={handleSubmit}
      className="-mt-8 p-1 bg-slate-100 rounded  shadow-md grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 items-center gap-3"
    >
      <div className="flex items-center px-2 py-1 gap-2">
        <TextField
          className="w-full"
          placeholder="where are you going?"
          value={destination}
          onChange={(e) => {
            setDestination(e.target.value);
          }}
          id="outlined-basic"
          label="Destination"
          variant="outlined"
        />
        {/* <input
          placeholder="where are you going?"
          type="text"
          className="text-md w-full"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        /> */}
      </div>
      <div className="flex  px-2 py-1 gap-2 box-border">
        <TextField
          value={adutlCount}
          type="number"
          inputProps={{ min: 1 }}
          onChange={(e) => setAdutlCount(parseInt(e.target.value))}
          label="Adults"
          variant="outlined"
        />
        <TextField
          value={childCount}
          type="number"
          inputProps={{ min: 0 }}
          onChange={(e) => setChildCount(parseInt(e.target.value))}
          label="Child"
          variant="outlined"
        />

        {/*  <label className="flex items-center">
          Child
          <input
            type="number"
            className="w-full px-2 font-bold"
            value={childCount}
            min={0}
            onChange={(e) => setChildCount(parseInt(e.target.value))}
          />
        </label> */}
      </div>
      <div className="flex px-2 py-1 gap-2 box-border">
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            className="w-full"
            label="Check In"
            value={checkIn}
            format="dd/MM/yyyy"
            minDate={minDate}
            maxDate={maxDate}
            onChange={(date) => setCheckIn(date as Date)}
          ></DatePicker>
        </LocalizationProvider>
      </div>
      <div className="flex px-2 py-1  gap-2 box-border">
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            className="w-full"
            label="Check Out"
            value={checkIn}
            format="dd/MM/yyyy"
            minDate={minDate}
            maxDate={maxDate}
            onChange={(date) => setCheckOut(date as Date)}
          ></DatePicker>
        </LocalizationProvider>
      </div>
      <div className="flex h-full px-2 py-1  gap-2 box-border">
        <Box sx={{ width: "55%" }}>
          <Button
            type="submit"
            sx={{ height: "100%", width: "100%" }}
            variant="contained"
          >
            Search
          </Button>
        </Box>

        <Box sx={{ width: "45%" }}>
          <Button
            type="button"
            sx={{ height: "100%", width: "100%" }}
            color="error"
            variant="outlined"
          >
            Clear
          </Button>
        </Box>
      </div>
    </form>
  );
};

export default SearchBar;
