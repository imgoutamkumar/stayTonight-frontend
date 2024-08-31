import { hotelFacilities } from "../config/hotel-options-config";

type Props = {
    selectedFacilities: string[];
    onChangedFacilities: (event: React.ChangeEvent<HTMLInputElement>) => void;
  };

const FacilitiesFilter = ({selectedFacilities, onChangedFacilities}:Props) => {
  return (
     <div>
      <div className="border-b border-slate-300 pb-5">
      <h4 className="text-md font-semibold mb-2">Facilities</h4>
      {hotelFacilities.map((facility) => (
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            className="rounded"
            value={facility}
            checked={selectedFacilities.includes(facility)}
            onChange={onChangedFacilities}
          />
          <span>{facility} Stars</span>
        </label>
      ))}
    </div>
    </div>
  )
}

export default FacilitiesFilter
