import { Container } from '@mui/material';
import { fetchAllProducts } from '@/api/woocommerce';
import { ProductListing } from '@/components/product/ProductListing';
import CustomPagination from '@/components/CustomPagination';

interface IAllProductsPageProps {
  params: IParams,
  searchParams: ISearchParams
}
interface IParams {
  slug?: string | undefined
  page?: number
}

interface ISearchParams {
  page?: string | string[]
}

const AllProductsPage: React.FunctionComponent<IAllProductsPageProps> = async (props) => {

  const { searchParams } = props;
  const itemPerPage = 8
  const currentPage = Number(searchParams.page) || 1;
  const responseProducts = await fetchAllProducts({
    per_page: itemPerPage,
    page: currentPage
  })
  const products = responseProducts?.products || []
  const totalPages = responseProducts?.totalPages || 1

  return (
    <main>
      <Container maxWidth='xl'>
        <h1 className='capitalize text-3xl my-10 font-bold'>All products</h1>
        <ProductListing products={products}/>
        <CustomPagination totalPages={totalPages} currentPage={currentPage} />
      </Container>
    </main>
  )
};

export default AllProductsPage;
