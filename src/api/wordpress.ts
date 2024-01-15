import { IMenu } from './../types/menu';
import { WORDPRESS_URL } from "@/config/init";

export const fetchMainMenu = async (): Promise<IMenu | undefined> => {
  try {
    const response = await fetch(WORDPRESS_URL+'/wp-json/wp-api-menus/v2/menus/16', { next: { revalidate: 600 } })
    return await response.json()
  } catch (error) {
    console.log(error);
  }
}