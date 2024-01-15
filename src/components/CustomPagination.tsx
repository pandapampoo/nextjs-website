'use client'
import { Pagination } from "@mui/material";
import { useRouter } from "next/navigation";
interface ICustomPaginationProps {
  currentPage: number;
  totalPages: number;
}

const CustomPagination: React.FunctionComponent<ICustomPaginationProps> = (props) => {
  const { currentPage, totalPages } = props
  const router = useRouter();
  
  const onChange = (event: any, page: number) => {
    let queryParams;
    if (typeof window !== "undefined") {
      queryParams = new URLSearchParams(window.location.search);

      if (queryParams.has("page")) {
        queryParams.set("page", page.toString());
      } else {
        queryParams.append("page", page.toString());
      }

      const path = window.location.pathname + "?" + queryParams.toString();
      router.push(path);
    }
  }

  return (
    <div>
      {totalPages > 1 && (
      <Pagination
        count={totalPages}
        page={currentPage}
        size='large'
        onChange={onChange}
        className='flex justify-center my-10' />
      )}
    </div>
  );
};

export default CustomPagination;
