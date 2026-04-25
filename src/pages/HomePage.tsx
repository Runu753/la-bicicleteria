import Hero from '../components/Hero';
import { Helmet } from 'react-helmet-async'
import TrustBar from '../components/TrustBar';
import Services from '../components/Services';
import Testimonials from '../components/Testimonials';
import Footer from '../components/Footer';

const HomePage = () => {
  return (
    <>
        <Helmet>
          <title>La Bicicletería - Inicio</title>
          <meta name="description" content="Tienda de bicicletas y accesorios de alta calidad." />
        </Helmet>
      <Hero />
      <TrustBar />
      <Services />
      <Testimonials />
      <Footer />
    </>
  );
};

export default HomePage;
