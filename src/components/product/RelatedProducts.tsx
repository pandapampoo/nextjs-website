import BoxModule from '@/components/BoxModule'
import { IProduct } from "@/types/product";
import { fetchSingleProduct } from "@/api/woocommerce";
import { ProductListing } from "./ProductListing";

export interface IRelatedProductsProps {
  related_ids: number[]
}

const RelatedProducts: React.FunctionComponent<IRelatedProductsProps> = async (props) => {
  const { related_ids } = props;

  const fetchRelatedProduct = async () => {
    const productPromises = related_ids.map(async (id) => {
      const product = await fetchSingleProduct(id)
      return product
    })
    return await Promise.all(productPromises)
  }
  const result  = await fetchRelatedProduct()
  const products: IProduct[] = []
  result.map(item => {
    if (item) products.push(item)
  })


  return (
    <>
      {products?.length > 0 &&
        <BoxModule title='Related Products'>
          <ProductListing products={products} />
        </BoxModule>
      }
    </>
  );
}

export default RelatedProducts;