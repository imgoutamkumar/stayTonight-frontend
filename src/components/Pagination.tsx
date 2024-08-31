import Pagination from "@mui/material/Pagination";

export type Props = {
  page: number;
  totalPage: number;
  onPageChange: (page: number) => void;
};
const CustomPagination = ({ page, totalPage, onPageChange }: Props) => {
  return (
    <div className="flex justify-center items-center">
      <Pagination
        count={totalPage}
        color="primary"
        onChange={() => onPageChange}
      />
    </div>
  );
};

export default CustomPagination;
