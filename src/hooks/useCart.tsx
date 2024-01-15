import { useState, useEffect } from "react";
import { toast } from 'react-toastify';
export type TCart = {
  products: TCartProductItem[],
  total: number,
  totalPrice: number
}

export type TCartProductItem = {
  id: number,
  title: string,
  thumbnail: string,
  price: number,
  discountPercentage?: number,
  quantity: number
  stock: number
}

export type TUseCart = {

}

export default function useCart() {
  const [cart, setCart] = useState<TCart>({ products: [], total: 0, totalPrice: 0 })

  useEffect(() => {
    if (localStorage.getItem("cart")) {
      setCart(JSON.parse(localStorage.getItem("cart") || ""))      
    }
  }, [])

  useEffect(() => {
    setTimeout(()=>{
      updateLocalStorage()
    },0)
  }, [cart])


  function addToCart(product: TCartProductItem, quantity: number = 1) {

    const { id, title, thumbnail, price, discountPercentage, stock } = product;

    const foundProductIndex = findProductIndex(id)

    let newCart = { ...cart as TCart }
    if (foundProductIndex !== -1) {
      const foundProduct = newCart.products[foundProductIndex];
      foundProduct.quantity += quantity;
      foundProduct.quantity = validateQuantity(foundProduct.quantity, stock)
    } else {
      newCart.products?.push({ ...product, quantity: quantity })
    }
    toast.success('Added to cart')
    newCart = updateTotal(newCart)
    newCart = updateTotalPrice(newCart)
    setCart(newCart)
  }

  function updateTotal(cart: TCart) {
    let total = 0
    cart?.products.map((item: TCartProductItem) => {
      total += item.quantity
    })
    return { ...cart as TCart, total: total }
  }

  function updateTotalPrice(cart: TCart) {
    let totalPrice = 0
    cart?.products.map((item: TCartProductItem) => {

      if (item.discountPercentage) {
        totalPrice += item.quantity * item.price * (1 - item.discountPercentage / 100)
      } else {
        totalPrice += item.quantity * item.price
      }
    })
    return { ...cart as TCart, totalPrice: totalPrice };
  }

  function deleteItem(productID: number) {

    const foundProductIndex = findProductIndex(productID)
    if (foundProductIndex !== -1) {
      let newCart = { ...cart };
      toast.success('Deleted to cart')
      newCart.products.splice(foundProductIndex, 1); newCart = updateTotal(newCart)
      newCart = updateTotalPrice(newCart)
      setCart(newCart)
    }
  }

  function updateItemQuantity(productID: number, quantity: number) {

    const foundProductIndex = findProductIndex(productID)
    let newCart = { ...cart as TCart };
    if (foundProductIndex !== -1) {
      const stock = newCart.products[foundProductIndex].stock;
      newCart.products[foundProductIndex].quantity = validateQuantity(quantity, stock)
    }
    newCart = updateTotal(newCart)
    newCart = updateTotalPrice(newCart)
    setCart(newCart)
  }

  function findProductIndex(productID: number) {
    return cart?.products?.findIndex((item: TCartProductItem) => item.id === productID)
  }

  function validateQuantity(value: number, stock: number) {
    return value < 0 ? 0
      : value > stock ? stock
        : value
  }

  function updateLocalStorage() {
    localStorage.setItem("cart", JSON.stringify(cart))
  }
  return { cart, addToCart, deleteItem, validateQuantity, updateItemQuantity }
}
