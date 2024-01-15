import { fetchSingleProduct } from "@/api/woocommerce";
import { validateQuantity } from "@/utilities/products";
import { toast } from "react-toastify";
import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

export interface ICartStore {
  products: ICartItem[]
  totalProducts: number
  totalPrice: number
  isLockedClick: boolean
  addToCart: (id: number, quantity: number) => void
  deleteItem: (id: number) => void
  updateItemQuantity: (id: number, quantity: number) => void
  loadFromLocalStorage: () => void
}

export interface ICartItem {
  id: number
  name: string
  thumbnail?: string
  price: number
  sale_price?: number
  regular_price?: number
  quantity: number
  stock_quantity?: number
}

export const useCartStore = create<any>(
  subscribeWithSelector((set: any, get: any) => ({
    products: [],
    totalProducts: 0,
    totalPrice: 0,
    isLockedClick: false,
    addToCart(id: number, quantity: number = 1) {
      const products = get().products;
      const isLockedClick = get().isLockedClick;

      if (isLockedClick) return;
      set({ isLockedClick: true });

      const foundProductIndex = findProductIndex(id, products);
      let newProducts = [...products];

      if (foundProductIndex !== -1) {
        const oldProduct = newProducts[foundProductIndex];
        oldProduct.quantity += quantity;
        if (oldProduct.stock_quantity)
          oldProduct.quantity = validateQuantity(
            oldProduct.quantity,
            oldProduct.stock_quantity
          );
        toast.success("Updated Quatity");
        set({ products: newProducts });
        set({ isLockedClick: false });
      } else {
        (async () => {
          const newCartItem = await getNewCartProduct(id);
          if (newCartItem) {
            newProducts.push({ ...newCartItem, quantity: quantity });
            toast.success("Added to cart");
            set({ products: newProducts });
          } else {
            toast.error("Product not found");
          }
          set({ isLockedClick: false });
        })();
      }
    },
    deleteItem(id: number) {
      const products = get().products;
      const foundProductIndex = findProductIndex(id, products);
      if (foundProductIndex !== -1) {
        let newProducts = [...products];
        toast.success("Deleted to cart");
        newProducts.splice(foundProductIndex, 1);
        set({ products: newProducts });
      } else {
        toast.error("Product not found");
      }
    },
    updateItemQuantity(id: number, quantity: number) {
      const products = get().products;
      const foundProductIndex = findProductIndex(id, products);
      let newProducts = [...products];
      if (foundProductIndex !== -1) {
        const stock_quantity = newProducts[foundProductIndex].stock_quantity;
        if (stock_quantity)
          newProducts[foundProductIndex].quantity = validateQuantity(
            quantity,
            stock_quantity
          );
      }
      set({ products: newProducts });
    },
    loadFromLocalStorage() {
      if (localStorage.getItem("cart")) {
        const cart = JSON.parse(localStorage.getItem("cart") || "");
        set({
          products: cart.products,
          totalPrice: cart.totalPrice,
        });
      }
    },
  }))
);

const CartProductsListener = (products: ICartItem[]) => {
  useCartStore.setState({
    totalProducts: calcTotalProducts(products),
    totalPrice: calcTotalPrice(products),
  });
  const cart = {
    products: useCartStore.getState().products,
    totalProducts: useCartStore.getState().totalProducts,
    totalPrice: useCartStore.getState().totalPrice,
  }
  updateLocalStorage(cart)
}

const cartProductsWatching = useCartStore.subscribe(
  (state: ICartStore) => state.products,
  CartProductsListener
)

function findProductIndex(productID: number, products: ICartItem[]) {
  return products?.findIndex((item: ICartItem) => item.id === productID);
}

function calcTotalProducts(products: ICartItem[]) {
  let total = 0;
  products?.map((item: ICartItem) => {
    total += item.quantity;
  });
  return total;
}

function calcTotalPrice(products: ICartItem[]) {
  let totalPrice = 0;
  products.map((item) => {
    totalPrice += item.quantity * item.price;
  });
  return totalPrice;
}

function updateLocalStorage(cart : {
  products: ICartItem[]
  totalProducts: number
  totalPrice: number
}) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

async function getNewCartProduct(id: number) {
  const newProduct = await fetchSingleProduct(id);
  const newCartProduct = newProduct
    ? {
        id: newProduct.id,
        name: newProduct.name,
        thumbnail: newProduct.images[0].src,
        price: Number(newProduct.price),
        sale_price: Number(newProduct.sale_price),
        regular_price: Number(newProduct.regular_price),
        stock_quantity: newProduct.stock_quantity,
      }
    : undefined;
  return newCartProduct;
}
