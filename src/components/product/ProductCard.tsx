'use client'
import { useContext } from 'react'
import { CartContext } from '@/context/CartContext';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Link from 'next/link';
import { formatPrice, calculateDiscountPrice, calculatePercentĐiscount } from '@/utilities/products';
import Button from '@/components/Button';
import { IProductCategory } from '@/types/product';
import Image from "next/image";
import { useCartStore } from '@/store/cartStore';

export interface IProductCardProps {
  id: number
  name: string
  description?: string
  price?: string
  sale_price?: string
  regular_price?: string
  average_rating?: string
  stock_quantity?: number
  categories?: IProductCategory
  thumbnail?: string
}

const ProductCard: React.FunctionComponent<IProductCardProps> = (props) => {

  const { addToCart } = useCartStore()

  const { id, name, description, price, sale_price, regular_price, average_rating, stock_quantity, categories, thumbnail } = props

  const handleAddToCart = () => {
    addToCart(id, 1)
  }

  return (
    <div className="group flex w-full max-w-md flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
      <Link href={'/product/' + id} className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl">
         {thumbnail && <Image className="peer absolute top-0 right-0 h-full w-full object-cover" src={thumbnail} width={334} height={250} alt="product image" />}

        {sale_price  && regular_price &&
          <span className="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">{calculatePercentĐiscount(sale_price, regular_price)}% OFF</span>
        }
      </Link>
      <div className="mt-4 px-5 pb-5">
        <a href="#">
          <h5 className="text-md tracking-tight text-slate-900">{name}</h5>
        </a>
        <div className="mt-2 mb-5 flex items-center justify-between">
          {sale_price ?
            <p>
              <span className="text-xl font-bold text-slate-900">{sale_price && formatPrice(sale_price)}</span>
              <span className="text-base text-slate-400 line-through mx-2">{regular_price && formatPrice(regular_price)}</span>
            </p>
            :
            <p>
              <span className="text-xl font-bold text-slate-900">{price && formatPrice(price)}</span>
            </p>
          }
        </div>
        <Button className='w-full' onClick={handleAddToCart}>
          <ShoppingCartIcon className='mx-2' />
          Add to cart
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
