import { Container } from '@mui/material';
import ProductDetail from '@/components/product/ProductDetail';
import RelatedProducts from '@/components/product/RelatedProducts';
import { fetchSingleProduct } from '@/api/woocommerce';
interface IProductDetailPageProps {
  params: any
}


const ProductDetailPage: React.FunctionComponent<IProductDetailPageProps> = async (props) => {

  const { params } = props;
  const productID = params.id;
  
  const product = await fetchSingleProduct(productID)
  const related_ids = product?.related_ids

  return (
    <main>
      <Container maxWidth='xl'>
        <div>
          {product && <ProductDetail product={product} />}
          {related_ids && <RelatedProducts related_ids={related_ids}></RelatedProducts>}
        </div>
      </Container>
    </main>
  );
};

export default ProductDetailPage;
