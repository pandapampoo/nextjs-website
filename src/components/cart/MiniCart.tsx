'use client'

import LocalMallIcon from '@mui/icons-material/LocalMall';
import Link from 'next/link';
import { useCartStore } from '@/store/cartStore';
import { useEffect } from 'react';
interface IMiniCartProps {
}

const MiniCart: React.FunctionComponent<IMiniCartProps> = (props) => {  
  const { totalProducts, loadFromLocalStorage } = useCartStore()
  
  useEffect(()=> {    
    loadFromLocalStorage()
  },[])
  return (
    <Link href="/cart" className='inline-flex item-center content-center mx-2'>
      <LocalMallIcon />
      <span>{totalProducts}</span>
    </Link>
  );
};

export default MiniCart;
