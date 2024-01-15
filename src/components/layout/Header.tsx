
import * as React from 'react';
import { Container } from '@mui/system';
import Link from 'next/link';
import { MainMenu } from './MainMenu';
import { SideMenu } from './SideMenu';

interface IHeaderProps {
}

const Header: React.FunctionComponent<IHeaderProps> = (props) => {
  return (
    <header className='bg-sky-600 text-white'>
      <Container maxWidth='xl'>
        <div className="flex justify-between items-center py-5">
          <div className="logo text-4xl font-extrabold"><Link href="/">SHOP</Link></div>
          <MainMenu/>
          <SideMenu/>
        </div>
      </Container>
    </header>
  );
};

export default Header;
