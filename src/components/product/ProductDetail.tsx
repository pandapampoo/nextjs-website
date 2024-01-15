'use client'
import { useState, useContext } from 'react';
import { CartContext } from "@/context/CartContext";
import { Rating } from '@mui/material';
import BoxModule from '@/components/BoxModule';
import ShoppingCartRounded from '@mui/icons-material/ShoppingCartRounded';
import Button from '@/components/Button';
import Quantity from '@/components/product/Quantity';
import { formatPrice, validateQuantity } from '@/utilities/products';
import { IProduct } from '@/types/product';
import Link from 'next/link';
import ProductImages from './ProductImages';
import { useCartStore } from '@/store/cartStore';

export interface IProductDetail {
  product: IProduct
}

const ProductDetail: React.FunctionComponent<IProductDetail> = (props) => {

  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCartStore()

  const { product } = props;

  const { id, name, description, price, sale_price, regular_price, average_rating, stock_quantity, categories, related_ids, images } = product;

  const handleOnMinus = () => {
    setQuantity(validateQuantity(quantity - 1, stock_quantity))
  }

  const handleOnPlus = () => {
    setQuantity(validateQuantity(quantity + 1, stock_quantity))
  }

  const handleQuantityOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(validateQuantity(Number(e.target.value), stock_quantity))
  }

  const handleOnAddToCart = () => {
    addToCart(id, quantity)
  }

  return (
    <div>
      <section className='grid grid-cols-2 gap-4  bg-white rounded-md shadow my-10 p-8'>
        <div className='left'>
          {images && <ProductImages images={images} />}
        </div>
        <div className='right pl-10 py-5'>
          <h1 className='title text-4xl font-bold'>{name}</h1>
          <p className='category capitalize my-2'><b>Category: </b>{categories?.map((item, i) => <Link key={i} href={'category/' + item.id}><span dangerouslySetInnerHTML={{ __html: item.name }}></span></Link>)}</p>
          <Rating name='half-rating' defaultValue={Number(average_rating)} precision={0.5} readOnly />
          <hr className='my-2' />
          {sale_price ?
            <p>
              <span className="text-3xl font-bold text-slate-900">{sale_price && formatPrice(sale_price)}</span>
              <span className="text-sm text-slate-400 line-through mx-2">{regular_price && formatPrice(regular_price)}</span>
            </p>
            :
            <p>
              <span className="text-3xl font-bold text-slate-900">{price && formatPrice(price)}</span>
            </p>
          }
          <hr className='my-2' />
          <Quantity value={quantity} handleOnMinus={handleOnMinus} handleOnPlus={handleOnPlus} handleOnChange={handleQuantityOnChange} />
          <div className='cart my-5'>
            <Button onClick={handleOnAddToCart} className='inline-flex'>
              <ShoppingCartRounded />
              <span className='ml-2'>Add to Cart</span>
            </Button>
          </div>
        </div>
      </section>
      {description &&
        <BoxModule title='Description'>
          <div dangerouslySetInnerHTML={{ __html: description }}></div>
        </BoxModule>
      }
    </div>
  );
};

export default ProductDetail;
