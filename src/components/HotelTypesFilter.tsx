import { hotelTypes } from "../config/hotel-options-config"

type Props = {
    selectedTypes: string[];
    onChangedTypes: (event: React.ChangeEvent<HTMLInputElement>) => void;
  };

const HotelTypesFilter = ({ selectedTypes, onChangedTypes }:Props) => {
  return (
    <div>
      <div className="border-b border-slate-300 pb-5">
      <h4 className="text-md font-semibold mb-2">Type</h4>
      {hotelTypes.map((type) => (
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            className="rounded"
            value={type}
            checked={selectedTypes.includes(type)}
            onChange={onChangedTypes}
          />
          <span>{type} Stars</span>
        </label>
      ))}
    </div>
    </div>
  )
}

export default HotelTypesFilter
