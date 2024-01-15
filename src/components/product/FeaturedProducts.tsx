import Image from "next/image";
import BoxModule from '@/components/BoxModule'
import ProductCard from "@/components/product/ProductCard";
import { fetchAllProducts } from "@/api/woocommerce";
import { IProduct } from "@/types/product";
import { ProductListing } from "./ProductListing";

export interface IFeaturedProductsProps {
  children?: React.ReactNode
}

const FeaturedProducts: React.FunctionComponent<IFeaturedProductsProps> = async (props) => {
  const { children } = props;

  const responseProducts = await fetchAllProducts({
    featured: true,
    per_page: 8
  })
  const products = responseProducts?.products || []


  return (
    <>
      {products?.length > 0 &&
        <BoxModule title='Featured Products'>
          <ProductListing products={products} />
        </BoxModule>
      }
    </>
  );
}

export default FeaturedProducts;