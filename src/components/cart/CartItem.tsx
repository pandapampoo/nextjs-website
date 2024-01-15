'use client'
import { formatPrice } from "@/utilities/products";
import { TableCell, TableRow } from "@mui/material";
import Image from "next/image";
import Quantity from "../product/Quantity";
import Link from "next/link";
import { ICartItem, useCartStore } from "@/store/cartStore";
export interface ICartItemProps {
  product: ICartItem
}


export default function CartItem(props: ICartItemProps) {

  const { deleteItem, updateItemQuantity } = useCartStore()
  const {id, name, thumbnail, price, regular_price, sale_price, quantity} = props.product;

  const handleDelete = () => {
    deleteItem(id)
  }

  const handleOnMinus = () => {
    updateItemQuantity(id,quantity-1)
  }
const handleOnPlus = () => {
    updateItemQuantity(id,quantity+1)
  }

  const handleQuantityOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const quantity = Number(e.target.value);
    updateItemQuantity(id,quantity)
  }

  return (
    <TableRow>
      <TableCell>
        {thumbnail && <Link href={'/product/' + id}><Image width={100} height={100} src={thumbnail} alt={name ? name: ""} /></Link>}
      </TableCell>
      <TableCell><Link href={'/product/' + id}><h4>{name}</h4></Link></TableCell>
      <TableCell>
        {sale_price ? 
         <div><b>{formatPrice(Number(price))}</b><s className="mx-2 text-gray-400">{formatPrice(Number(regular_price))}</s></div>: 
        formatPrice(Number(price))
        }
      </TableCell>

      <TableCell><Quantity value={quantity} handleOnMinus={handleOnMinus} handleOnPlus={handleOnPlus} handleOnChange={handleQuantityOnChange} /></TableCell>
      <TableCell>{formatPrice(quantity * Number(price))}</TableCell>
      <TableCell><button onClick={handleDelete}>Delete</button></TableCell>
    </TableRow>
  );
}
