import { WORDPRESS_URL, WORDPRESS_WOOCOMMERCE_KEY, WORDPRESS_WOOCOMMERCE_SECRET_KEY } from "@/config/init";
import { IProduct } from "@/types/product";
import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";

export const wooApi = new WooCommerceRestApi({
  url: WORDPRESS_URL,
  consumerKey: WORDPRESS_WOOCOMMERCE_KEY,
  consumerSecret: WORDPRESS_WOOCOMMERCE_SECRET_KEY,
  version: 'wc/v3',
  queryStringAuth: true,
  axiosConfig: {
    headers: {}
  }
});

export interface IResultFetchAllProducts {
  products: IProduct[],
  totalPages: number
}

export const fetchAllProducts = async (arg: {
  per_page?: number | null,
  page?: number | null,
  featured?: boolean | null,
  category?: string | null,
  tag?: string | null,
  search?: string | null,
  order?: string | null
}) => {
  const { per_page = 0, page = 1, featured = false, category="", tag="", search="", order="desc" } = arg
  try {
    // const response = await wooApi.get("products", {
    //   per_page: per_page, // 20 products per page
    //   page: page || 1,
    //   category: category || "",
    //   featured: featured || false,
    //   tag: tag || "",
    //   search: search || "",
    //   order: order || "desc"
    // })
    const response = await fetch(WORDPRESS_URL + `/wp-json/wc/v3/products?consumer_key=${WORDPRESS_WOOCOMMERCE_KEY}&consumer_secret=${WORDPRESS_WOOCOMMERCE_SECRET_KEY}&per_page=${per_page}&page=${page}&category=${category}&featured=${featured}&tag=${tag}&search=${search}&order=${order}`, { next: { revalidate: 600 } })
    
    return {products : await response.json(), totalPages: await Number(response.headers.get('x-wp-totalpages'))}
  } catch (error) {
    console.log(error);
  }
}

export const fetchSingleProduct = async (id: number) : Promise<IProduct | undefined> => {
  try {
    const response = await fetch(WORDPRESS_URL + `/wp-json/wc/v3/products/${id}?consumer_key=${WORDPRESS_WOOCOMMERCE_KEY}&consumer_secret=${WORDPRESS_WOOCOMMERCE_SECRET_KEY}`, { next: { revalidate: 600 } })
    return await response.json()
  } catch (error) {
    console.log(error);
  }
}

export const fetchCategory = async (id: number) => {
  try {
    const response = await fetch(WORDPRESS_URL + `/wp-json/wc/v3/products/categories/${id}?consumer_key=${WORDPRESS_WOOCOMMERCE_KEY}&consumer_secret=${WORDPRESS_WOOCOMMERCE_SECRET_KEY}`, { next: { revalidate: 600 } })
    return await response.json()
  } catch (error) {
    console.log(error);
  }
}