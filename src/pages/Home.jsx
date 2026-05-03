import HeroSection from '../components/home/HeroSection'
import FeaturedProducts from '../components/home/FeaturedProducts'
import Categories from '../components/home/Categories'
import PromoBanner from '../components/home/PromoBanner'
import Testimonials from '../components/home/Testimonials'

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturedProducts />
      <Categories />
      <PromoBanner />
      <Testimonials />
    </>
  )
}