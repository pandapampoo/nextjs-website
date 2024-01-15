'use client'
import { formatPrice } from "@/utilities/products";
import { TableContainer, Table, TableHead, TableBody, TableFooter, TableRow, TableCell } from "@mui/material";
import CartItem from "./CartItem";
import { ICartItem, useCartStore } from "@/store/cartStore";

export default function Cart() {
  const { products, totalPrice } = useCartStore()
  return (
    <TableContainer>
      <Table className="w-full bg-white my-10">
        <TableHead>
          <TableRow>
            <TableCell className="w-[150px]">Image</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Total</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((item: ICartItem, index: number) => (
            <CartItem product={item} key={index}/>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow className="bg-gray-100">
            <TableCell colSpan={3}>

            </TableCell>
            <TableCell>
              <b className="text-lg">Total</b>
            </TableCell>
            <TableCell>
              <b className="text-lg">{formatPrice(totalPrice)}</b>
            </TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  )
}
