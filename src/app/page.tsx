import Image from 'next/image'
import { Container } from '@mui/material'
import HeroBanner from '@/components/HeroBanner'
import FeaturedProducts from '@/components/product/FeaturedProducts'

export default function Home() {

  return (
    <main>
      <Container maxWidth="xl">
        <div>
          <HeroBanner/>
          <FeaturedProducts/>
        </div>
      </Container>
    </main>
  )
}
