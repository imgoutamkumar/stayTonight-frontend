type Props = {
  selectedPrice: number|undefined;
  onChangedPrice: (value?: number) => void;
};

const PriceFilter = ({ selectedPrice, onChangedPrice }: Props) => {
  return (
    <div>
      <h4 className="text-md font-semibold mb-2">Max Price</h4>
      <select
        value={selectedPrice}
        onChange={(event) =>
          onChangedPrice(
            event.target.value ? parseInt(event.target.value) : undefined
          )
        }
      >
        <option value="">Select Max Price</option>
        {[1000,2500,5000,10000,15000,20000].map((price)=>(
            <option value={price}>{price}</option>
        ))}
      </select>
    </div>
  );
};

export default PriceFilter;
