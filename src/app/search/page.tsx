import { Container } from "@mui/material"
import Button from "@/components/Button";
import BoxModule from "@/components/BoxModule";
import { fetchAllProducts } from "@/api/woocommerce";
import { ProductListing } from "@/components/product/ProductListing";
import CustomPagination from "@/components/CustomPagination";
import { IProduct } from "@/types/product";

export interface ISearchPageProps {
  params: string | string[],
  searchParams: ISearchParams
}

export interface ISearchParams {
  query?: string
  page?: number
}

export default async function SearchPage(props: ISearchPageProps) {

  const { params, searchParams } = props;

  let query = searchParams.query;
  let products: IProduct[] = [];
  const itemPerPage = 8
  let currentPage = searchParams.page ? Number(searchParams.page) : 1,
    totalPages = 0

  if (searchParams.query) {
    const itemPerPage = 8
    const currentPage = Number(searchParams.page) || 1;
    const responseProducts = await fetchAllProducts({
      per_page: itemPerPage,
      page: currentPage,
      search: query
    })

    products = await responseProducts?.products || []
    totalPages = Number(responseProducts?.totalPages)
  }

  const isResult = query && products.length > 0 ? true : false

  return (
    <main className="min-h-[70vh] flex items-center">
      <Container maxWidth="xl">
        <BoxModule>
          <h1 className="89font-bold text-2xl font-bold leading-tight tracking-tight text-gray-900 text-center">Search</h1>
          <form className="space-y-4 md:space-y-6 my-10" action="/search">
            <div className="flex gap-x-4 justify-center">
              <div className="w-[500px]">
                <input type="text" name="query" id="query" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Product name" defaultValue={query} />
              </div>
              <div>
                <button type="submit" className="w-full">
                  <Button styleOnly={true}>
                    Search
                  </Button>
                </button>
              </div>
            </div>
          </form>
        </BoxModule>
        {isResult &&
          <BoxModule title='Result'>
            {products &&
              <ProductListing products={products} />
            }
            <CustomPagination totalPages={totalPages} currentPage={currentPage} />
          </BoxModule>
        }
      </Container>
    </main>
  );
}
