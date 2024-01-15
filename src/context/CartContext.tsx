'use client'
import useCart, { TCart, TCartProductItem } from "@/hooks/useCart";
import { createContext } from "react";

export type TCartContext = {
  cart: TCart,
  addToCart: (product: TCartProductItem, quantity: number) => void,
  deleteItem: (productID: number) => void,
  updateItemQuantity: (productID: number, quantity: number) => void,
  validateQuantity: (value: number, stock: number) => void
}
export const CartContext = createContext<TCartContext | null>(null);

export const CartProvider = ({ children }: any) => {
  const cartHooks = useCart()
  return <CartContext.Provider
    value={ cartHooks }
  >
    {children}
  </CartContext.Provider>
}