import { fetchMainMenu } from '@/api/wordpress';
import { IMenuItem } from '@/types/menu';
import Link from 'next/link';
import * as React from 'react';

export interface IMainMenuProps {

}


export async function MainMenu(props: IMainMenuProps) {

  const response = await fetchMainMenu()
  const menu = await response

  return (
    <div className="main-menu">
      <Link href="/all-products" className='m-2'>All Products</Link>
      {menu?.items?.map((item: IMenuItem, i: number) => <Link key={i} href={`/category/${item.object_id}`} className='m-2 capitalize inline-block'><span dangerouslySetInnerHTML={{__html: item.title}}></span></Link>)}
    </div>
  );
}
