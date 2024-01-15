import * as React from 'react';
import { Container } from '@mui/system';
import Link from 'next/link';
import LocalMallIcon from '@mui/icons-material/LocalMall';

interface IFooterProps {
}

const Footer: React.FunctionComponent<IFooterProps> = (props) => {
  return (
    <footer className='bg-gray-800 text-white py-10'>
      <Container maxWidth='xl'>
        <div className="grid grid-cols-4 gap-4 py-5">
          <div className="about col-span-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta deleniti, nostrum quidem omnis pariatur tenetur ea eveniet nemo est, eos placeat consequatur maxime, culpa impedit saepe praesentium ullam perspiciatis laboriosam!</div>
          <div className="footer links">
            <Link href="/sign-up" className='mb-4 block'>Home</Link>
            <Link href="/log-in" className='mb-4 block'>Products</Link>
            <Link href="/log-in" className='mb-4 block'>Contact</Link>
          </div>
          <div className="Footer-right">
            <Link href="/log-in" className='mb-4 block'>Log in</Link>
            <Link href="/sign-up" className='mb-4 block'>Sign up</Link>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
