import { IProduct } from '@/types/product';
import * as React from 'react';
import ProductCard from './ProductCard';

export interface IProductListingProps {
  products: IProduct[]
}

export function ProductListing(props: IProductListingProps) {
  const { products } = props
  return (
    <>
      {products?.length > 0 &&
        <div className="grid grid-cols-4 gap-4">
          {products?.map((item: IProduct, i: number) => <ProductCard
            key={i}
            id={item.id}
            name={item.name}
            description={item.short_description}
            price={item.price}
            sale_price={item.sale_price}
            regular_price={item.regular_price}
            stock_quantity={item.stock_quantity}
            average_rating={item.average_rating}
            thumbnail={item.images[0].src}
          />)}
        </div>
      }
    </>
  );
}
