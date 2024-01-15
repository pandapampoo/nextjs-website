import Cart from "@/components/cart/Cart";
import FeaturedProducts from "@/components/product/FeaturedProducts";
import { Container } from '@mui/material'
export interface ICartPageProps {
}

export default function CartPage(props: ICartPageProps) {
  return (
    <main>
      <Container maxWidth="xl">
        <div>
          <Cart/>
          <FeaturedProducts />
        </div>
      </Container>
    </main>
  );
}
