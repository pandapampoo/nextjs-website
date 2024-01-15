import { Container } from '@mui/material';
import { fetchAllProducts, fetchCategory } from '@/api/woocommerce';
import { ProductListing } from '@/components/product/ProductListing';
import CustomPagination from '@/components/CustomPagination';
import { fetchMainMenu } from '@/api/wordpress';

export async function generateStaticParams() {
  const menu = await fetchMainMenu()
  return menu.items.map((item) => ({
    id: String(item.id)
  }))
}
interface ICategoryPageProps {
  params: IParams,
  searchParams: ISearchParams
}
interface IParams {
  id: string
}

interface ISearchParams {
  page?: string | string[]
}

const CategoryPage: React.FunctionComponent<ICategoryPageProps> = async (props) => {

  const { params, searchParams } = props;
  const categoryID = params.id;
  
  const responseCategory = await fetchCategory(Number(categoryID))
  const category = await responseCategory
  const { name, slug, parent, description, image, count } = category
  

  const itemPerPage = 8
  const currentPage = Number(searchParams.page) || 1;
  const responseProducts = await fetchAllProducts({
    per_page: itemPerPage, 
    page: currentPage,
    category: categoryID
  })

  const products = responseProducts?.products || []
  const totalPages = Number(responseProducts?.totalPages)

  return (
    <main>
      <Container maxWidth='xl' className='mb-20'>
        <h1 className='capitalize text-3xl my-10 font-bold' dangerouslySetInnerHTML={{__html: name}}></h1>
        {description && <div>{description}</div>}
        <ProductListing products={products} />
        <CustomPagination totalPages={totalPages} currentPage={currentPage} />
      </Container>
    </main>
  )
};

export default CategoryPage;
